
/**
 * condition    1       2       3           4       5           6       7       8
 *  file/dir  true      true    true      true     false     false   false    false   
    create    true      true    false     false    true      true    false     false  
    exclusive false     true    false-无效-true    false     true     false-无效-true  
    result    cre&get   error   get       get      cre&get   cre&get    error       error
**/


// Bug: condition1 不覆盖源文件

import mime from "mime"
import { resolveFullPath, getDataType } from "@/util/utils.js"
class FilePlugin {
    private _size;
    private _dataEntry;
    private _rootEntry;
    public get rootEntry() {
        return this._rootEntry;
    }
    public set rootEntry(value) {
        this._rootEntry = value;
    }
    public get size() {
        return this._size;
    }
    // 默认单位M
    public set size(value) {
        this._size = value;
        this.init()
    }
    public get dataEntry() {
        return this._dataEntry;
    }
    public set dataEntry(value) {
        this._dataEntry = value;
    }
    constructor(size?) {
        // 100MB
        this._size = size ?? 1024 * 1024 * 100;
        this.init();
    }
    init() {
        //@ts-ignore
        navigator.webkitPersistentStorage.requestQuota(
            this._size, async (grantedBytes) => {
                console.log("储存权限获取", grantedBytes);
                this._rootEntry = await this._getRootDirEntry(this._size);
                this._dataEntry = this._rootEntry;
            }
        )
    }

    async initUserEntry(account) {
        this._dataEntry = await this._getDirectory(this._rootEntry, `/${account}/`, true);
    }
    /**
     * 创建一个文件，
     * true 文件存在则覆盖，false 文件存在则忽略创建
     * 文件不存在，都均可创建
     * @param fullPath 
     * @returns 
     */
    async createFile(fullPath, create?) {
        let exclusive = true;
        if (create) {
            exclusive = false
        }
        return Promise.resolve(this._getFileByFileEntry(await this.getFileEntry(fullPath, { create: create ?? true, exclusive: exclusive })))
    }

    async creatDir() {
    }

    async readBlob(blob, mimeType) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = function () {
                resolve(this.result)
            };
            //@ts-ignore
            const type = mime.getExtension(mimeType);
            if (['txt', 'json'].includes(type)) {
                reader.readAsText(blob);
            } else if (['png', 'jpeg', 'jpg'].includes(type)) {
                reader.readAsDataURL(blob);
            } else if (['array'].includes(type)) {
                reader.readAsArrayBuffer(blob)
            }
            else {
                reader.readAsBinaryString(blob)
            }
        })
    }
    /**
     * 通过绝对路径拿到File对象-特殊的Blob
     * @param fullPath 
     * 若无文件则报错
     */
    async readFile(fullPath, root?) {
        return Promise.resolve(this._getFileByFileEntry(await this.getFileEntry(fullPath, { create: false, root: root })))
    }

    async removeFile(fullPath, root) {
        return new Promise((resolve) => {
            this.getFileEntry(fullPath, { create: false, root: root }).then((fileEntry) => {
                //@ts-ignore
                fileEntry.remove((success) => {
                    resolve(true)
                });
            })
        })
    }
    async copyFileTo(originPath, destDirPath, newName?, root?) {
        return new Promise((resolve) => {
            this.getFileEntry(originPath, { create: false, root: root }).then(async (fileEntry) => {
                const firstDirEntry = root ? this._rootEntry : this._dataEntry
                const dirEntry = await firstDirEntry.getDirectory(destDirPath, { create: false });
                //@ts-ignore
                fileEntry.copyTo(dirEntry, newName, (success) => {
                    resolve(true)
                });
            })
        })
    }

    async moveFileTo(originPath, destDirPath, newName?, root?) {
        return new Promise((resolve) => {
            this.getFileEntry(originPath, { create: false, root: root }).then(async (fileEntry) => {
                const dirEntry = await this._dataEntry.getDirectory(destDirPath, { create: false });
                //@ts-ignore
                fileEntry.moveTo(dirEntry, newName, (success) => {
                    resolve(true)
                });
            })
        })
    }
    async removeDir(dirPath, root?) {

        const firstDirEntry = root ? this._rootEntry : this._dataEntry
        return new Promise((resolve) => {
            firstDirEntry.getDirectory(dirPath, { create: false }, (dirEntry) => {
                dirEntry.removeRecursively((success) => {
                    resolve(true)
                });
            })
        })
    }
    /**
     * 
     * @param fullPath 
     * @param create
     * @returns 
     */
    getFileEntry(fullPath, options) {
        const dirCreate = options?.create ?? false;
        const fileCreate = options?.create ?? false;
        const exclusive = options?.exclusive ?? false;
        const root = options?.root ?? false
        return new Promise((resolve, reject) => {
            const firstDirEntry = root ? this._rootEntry : this._dataEntry;
            const { path, fileName } = resolveFullPath(fullPath);
            const dirArray = path.split('/');
            let parentDirEntry = firstDirEntry;
            const instance = this;
            try {
                const getLastDir = async function (i) {
                    if (i === dirArray.length) {
                        return parentDirEntry;
                    }
                    const dirName = dirArray[i];
                    parentDirEntry = await instance._getDirectory(parentDirEntry, dirName, dirCreate)
                    i++;
                    return getLastDir(i);
                }
                getLastDir(0).then((lastDirEntry) => {
                    lastDirEntry.getFile(fileName, { create: fileCreate, exclusive: exclusive }, (fileEntry) => {
                        resolve(fileEntry);
                    }, (e) => {
                        reject(e)
                    })
                });
            } catch (e) {
                reject(e)
            }
        })
    }

    async existDir(dirPaths,root?) {
        return new Promise((resolve) => {
            const dirArray = dirPaths.split('/');
            
            let parentDirEntry =root?this._rootEntry: this._dataEntry;
            const instance = this;
            try {
                const getLastDir = async function (i) {
                    if (i === dirArray.length) {
                        return parentDirEntry;
                    }
                    const dirName = dirArray[i];
                    parentDirEntry = await instance._getDirectory(parentDirEntry, dirName, false)
                    i++;
                    return getLastDir(i);
                }
                getLastDir(0).then((lastDirEntry) => {
                    lastDirEntry ? resolve(true) : resolve(false)
                })
            } catch (e) {
                resolve(false)
            }
        })

    }
    async existFile(fullPath,root?) {
        const { path: dirPaths, fileName } = resolveFullPath(fullPath)
        return new Promise((resolve) => {
            const dirArray = dirPaths.split('/');
            let parentDirEntry = root?this._rootEntry: this._dataEntry;
            const instance = this;
            try {
                const getLastDir = async function (i) {
                    if (i === dirArray.length) {
                        return parentDirEntry;
                    }
                    const dirName = dirArray[i];
                    parentDirEntry = await instance._getDirectory(parentDirEntry, dirName, false)
                    i++;
                    return getLastDir(i);
                }
                getLastDir(0).then((lastDirEntry) => {
                    const verificationFile = () => {
                        try {
                            lastDirEntry.getFile(fileName, { create: false }, () => {
                                resolve(true)
                            }, (error) => {
                                console.log(error)
                                resolve(false)
                            })
                        } catch (e) {
                            console.log(e)
                            resolve(false)
                        }
                    }
                    lastDirEntry ? (
                        verificationFile()
                    ) : resolve(false)
                })
            } catch (e) {
                resolve(false)
            }
        })

    }

    // 获取目录下文件
    getFileList() {

    }
    /**
     * 
     * @param fullPath 
     * @param data 
     * @param options 
     *          isAppend 是否追加
     *          create   * true 文件存在则覆盖，false 文件存在则忽略创建
     *                   文件不存在，都均可创建
     * 默认 ，文件不存在，则报错
     * @returns 
     */
    async writeFile(fullPath, data, options) {
        const { isAppend = false, create = false ,root=false} = options;
        const fileEntry = await this.getFileEntry(fullPath, { create, exclusive: false,root:root });
        return this._writeDataByFileEntry(fileEntry, data, isAppend);
    }

    /* 获取保存文件的根路径 */
    _getRootDirEntry(size) {
        return new Promise(resolve => {
            //@ts-ignore
            window.webkitRequestFileSystem(window.PERSISTENT, size, async (fs) => {
                resolve(fs.root);
            }, (error) => {
                console.log(error)
            });
        })
    }
    /**
     * 
     * @param fileEntry 
     * @param data 支持blob，string，number直接写入
     * @param isAppend 
     * @returns 
     */
    _writeDataByFileEntry(fileEntry, data, isAppend) {
        return new Promise((resolve, reject) => {
            try {
                fileEntry.createWriter(function (fileWriter) {
                    fileWriter.onwriteend = function () {
                        console.log("Successful file write...");
                        resolve(true)
                    };
                    fileWriter.onerror = function (e) {
                        console.log("Failed file write: " + e.toString());
                    };
                    if (isAppend) {
                        try {
                            fileWriter.seek(fileWriter.length);
                        }
                        catch (e) {
                            console.log("file doesn't exist!");
                        }
                    }
                    if (!data) {
                        data = new Blob();
                    }
                    const type = getDataType(data);
                    switch (type) {
                        case 'string':
                            data = new Blob([data]);
                            break;
                        default:
                            // 默认为Blob
                            break;
                    }
                    // 判断data类型是不是blob
                    fileWriter.write(data);

                });
            } catch (e) {
                reject(e)
            }
        })
    }
    /**
     * 获取文件对象---特殊的blob
     * @param fileEntry 
     * @returns 
     */
    _getFileByFileEntry(fileEntry) {
        return new Promise(resolve => {
            fileEntry.file(function (file) {
                resolve(file)
            }, function (e) {
                console.log('_getFileByFileEntry', e);
            });
        })
    }

    /**
    * 创建或获取子目录
    * @param dirEntry 父目录
    * @param dirName  目录名
    * @param create 是否创建 true下新建目录若存在则删除,重建，false若存在即不创建
    * @returns 
    */
    _getDirectory(dirEntry, dirName, create) {
        return new Promise((resolve, reject) => {
            dirEntry.getDirectory(dirName, { create: create }, function (childDirEntry) {
                resolve(childDirEntry)
            }, (e) => {
                console.log("_getDirectory", e)
                resolve(false)
            });
        })
    }
    destroyUserEntry() {
        this._dataEntry.removeRecursively((success) => {
            console.log('clear');
            this._dataEntry = this._rootEntry;
        });
    }
}
const file = new FilePlugin();
export default file;