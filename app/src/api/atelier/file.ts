
/**
 * condition    1       2       3           4       5           6       7       8
 *  file/dir  true      true    true      true     false     false   false    false   
    create    true      true    false     false    true      true    false     false  
    exclusive false     true    false-无效-true    false     true     false-无效-true  
    result    cre&get   error   get       get      cre&get   cre&get    error       error
**/


// Bug: condition1 不覆盖源文件

import mime from "mime"
import { resolveFullPath, getFileSuffix, getFileSuffixByMime, getDataType } from "@/util/utils.js"
class FilePlugin {
    private _size;
    private _rootEntry;
    public get size() {
        return this._size;
    }
    // 默认单位M
    public set size(value) {
        this._size = value;
        this.init()
    }
    public get rootEntry() {
        return this._rootEntry;
    }
    public set rootEntry(value) {
        this._rootEntry = value;
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
                this._rootEntry = await this._getRootDirEntry(this._size)
            }
        )
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
    async readFile(fullPath) {
        return Promise.resolve(this._getFileByFileEntry(await this.getFileEntry(fullPath, { create: false })))
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
        return new Promise((resolve, reject) => {
            const rootEntry = this._rootEntry;
            const { path, fileName } = resolveFullPath(fullPath);
            const dirArray = path.split('/');
            let parentDirEntry = rootEntry;
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

    async existDir(dirPaths) {
        return new Promise((resolve) => {
            const dirArray = dirPaths.split('/');
            let parentDirEntry = this._rootEntry;
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
    async existFile(fullPath) {
        const { path: dirPaths, fileName } = resolveFullPath(fullPath)
        return new Promise((resolve) => {
            const dirArray = dirPaths.split('/');
            let parentDirEntry = this._rootEntry;
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
        const { isAppend = false, create = false } = options;
        const fileEntry = await this.getFileEntry(fullPath, { create, exclusive: false });
        return this._writeDataByFileEntry(fileEntry, data, isAppend);
    }

    /* 获取保存文件的根路径 */
    _getRootDirEntry(size) {
        return new Promise(resolve => {
            //@ts-ignore
            window.webkitRequestFileSystem(window.PERSISTENT, size, function (fs) {
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

    // /**
    //  * 快捷写入永久性文件（默认路径为根路径）
    //  * @param fileName 文件名
    //  * @returns 
    //  */
    // _createPersistentFile(fileName, fileObj) {
    //     const instance = this;
    //     const requestedBytes = 1024 * 1024 * 10;
    //     const promise = new Promise((resolve, reject) => {
    //         //@ts-ignore
    //         window.webkitRequestFileSystem(window.PERSISTENT, requestedBytes, function (fs) {
    //             //cordova.file.dataDirectory
    //             console.log('file system open: ' + fs.name);
    //             //fs.root-->DirectoryEntry
    //             fs.root.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {
    //                 instance._writeFile(fileEntry, fileObj, false)
    //                 resolve("success")
    //             }, () => {
    //                 console.log('error')
    //             });

    //         }, () => {
    //             console.log('error')
    //         });
    //     })
    //     return promise;
    // }


    // /**
    //  * 默认为覆盖已有文件
    //  * @param dirEntry 目录入口
    //  * @param fileData 文件内容
    //  * @param fileName 文件名
    //  * 
    //  */
    // _saveFile(dirEntry, fileData, fileName, options?) {
    //     return new Promise((resolve) => {
    //         const instance = this;
    //         dirEntry.getFile(fileName, { create: options?.create ?? true }, async function (fileEntry) {
    //             resolve(await instance._writeFile(fileEntry, fileData, false))
    //         }, () => {
    //             console.log('onErrorSaveDir')
    //         });
    //     })
    // }
    // /**
    //  * 读取图片
    //  * @param fileEntry 文件入口
    //  * @param type  默认"image/png"
    //  * @returns 返回blob
    //  */
    // _readImage(fileEntry, type) {
    //     return new Promise(resolve => {
    //         fileEntry.file(function (file) {
    //             const reader = new FileReader();
    //             reader.onloadend = function () {
    //                 console.log("Successful file write: " + this.result);
    //                 //@ts-ignore
    //                 const blob = new Blob([new Uint8Array(this.result)], { type: type ?? "image/png" });
    //                 resolve(blob)
    //             };
    //             reader.readAsArrayBuffer(file);
    //         }, () => {
    //             console.log('error')
    //         });
    //     })
    // }

    /**
     * 
     * @param path 默认市根目录下，即相对路径
     * @param data 
     * @param options: dirCreate,fileCreate
     */
    // async writeFileAsync(fullPath, data, options) {
    //     const rootEntry = await this.getRootDirEntry();
    //     const { path, fileName } = resolveFullPath(fullPath);
    //     const directoryEntry = await this.getDirectory(rootEntry, path, options.dirCreate ?? false);
    //     return this.saveFile(directoryEntry, data, fileName, options.fileCreate ?? true)
    // }


    // async readFileAsync(fullPath) {
    //     const rootEntry = await this.getRootDirEntry();
    //     const { path, fileName } = resolveFullPath(fullPath);
    //     const dirEntry =await this.getDirectory(rootEntry, path, false)
    //     const fileEntry = await this.getFileEntry(dirEntry, fileName, { create: false });
    //     const fileSuffix = getFileSuffix(fileName);
    //     let type= "";
    //     switch(fileSuffix){
    //         case 'image/png':
    //             break;
    //     }
    //     return this.readFile(fileEntry, 'image')
    // }
}
const file = new FilePlugin();
export default file;
// import { resolveFullPath } from "@/util/utils.js"
// class FilePlugin {
//     //cordova.file.dataDirectory
//     private _file;
//     public get file() {
//         return this._file;
//     }
//     public set file(value) {
//         this._file = value;
//     }
//     constructor() {
//         // if (navigator?.userAgent.includes('Windows')) {
//         const requestedBytes = 1024 * 1024 * 100;
//         //@ts-ignore
//         navigator.webkitPersistentStorage.requestQuota(
//             requestedBytes, function (grantedBytes) {
//                 console.log("获取权限")
//             }
//         )

//         // }
//     }
//     /**
//      * 向文件写入内容
//      * @param fileEntry 
//      * @param dataObj 
//      * @param isAppend  是否向文件中追加
//      */
//     writeFile(fileEntry, dataObj, isAppend) {
//         return new Promise((resolve) => {
//             // Create a FileWriter object for our FileEntry
//             fileEntry.createWriter(function (fileWriter) {
//                 fileWriter.onwriteend = function () {
//                     console.log("Successful file write...");
//                     resolve(true)
//                 };
//                 fileWriter.onerror = function (e) {
//                     console.log("Failed file write: " + e.toString());
//                 };
//                 // If data object is not passed in,
//                 // create a new Blob instead.
//                 if (isAppend) {
//                     try {
//                         fileWriter.seek(fileWriter.length);
//                     }
//                     catch (e) {
//                         console.log("file doesn't exist!");
//                     }
//                 }
//                 if (!dataObj) {
//                     dataObj = new Blob(['nothing write'], { type: 'text/plain' });
//                 }
//                 fileWriter.write(dataObj);
//             });
//         })
//     }
//     /**
//      * 读取文件内容
//      * @param fileEntry 
//      * @param type  文件类型
//      * @returns 
//      */
//     readFile(fileEntry, type) {
//         return new Promise(resolve => {
//             fileEntry.file(function (file) {
//                 const reader = new FileReader();
//                 reader.onloadend = function () {
//                     console.log("Successful file read:");
//                     resolve(this.result);
//                 };
//                 if (type === "text") {
//                     reader.readAsText(file);
//                 } else if (type === "image") {
//                     reader.readAsDataURL(file);
//                 } else {
//                     reader.readAsArrayBuffer(file);
//                 }
//             }, function (e) {
//                 console.log("Failed file read: " + e.toString());
//             });
//         })
//     }
//     /* 获取保存文件的根路径 */
//     getRootDirEntry() {
//         const requestedBytes = 1024 * 1024 * 10;
//         return new Promise(resolve => {

//             //@ts-ignore
//             window.webkitRequestFileSystem(window.PERSISTENT, requestedBytes, function (fs) {
//                 //cordova.file.dataDirectory
//                 console.log('file system open: ' + fs.name);
//                 resolve(fs.root)
//             }, () => {
//                 console.log('error')
//             });
//         })
//     }
//     /**
//      * 获取文件入口
//      * @param dirEntry  目录入口
//      * @param fileName  文件名
//      * @returns  文件入口
//      */
//     getFileEntry(dirEntry, fileName, options?) {
//         const instance = this;
//         return new Promise((resolve, reject) => {
//             dirEntry.getFile(fileName, { create: options?.create ?? true, exclusive: false }, function (fileEntry) {
//                 console.log("fileEntry is file?" + fileEntry.isFile.toString());
//                 resolve(fileEntry)
//             }, (e) => {
//                 console.log(e)
//             });
//         })
//     }
//     /**
//      * 快捷写入永久性文件（默认路径为根路径）
//      * @param fileName 文件名
//      * @returns 
//      */
//     createPersistentFile(fileName, fileObj) {
//         const instance = this;
//         const requestedBytes = 1024 * 1024 * 10;
//         const promise = new Promise((resolve, reject) => {
//             //@ts-ignore
//             window.webkitRequestFileSystem(window.PERSISTENT, requestedBytes, function (fs) {
//                 //cordova.file.dataDirectory
//                 console.log('file system open: ' + fs.name);
//                 //fs.root-->DirectoryEntry
//                 fs.root.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {
//                     instance.writeFile(fileEntry, fileObj, false)
//                     resolve("success")
//                 }, () => {
//                     console.log('error')
//                 });

//             }, () => {
//                 console.log('error')
//             });
//         })
//         return promise;
//     }
//     /**
//      * 创建或获取目录
//      * @param rootDirEntry 根路径入口
//      * @param dirName  目录名
//      * @param create 是否创建 true下新建目录若存在则删除，重建，false若存在即不创建
//      * @returns 
//      */
//     getDirectory(rootDirEntry, dirName, create) {
//         return new Promise((resolve) => {
//             rootDirEntry.getDirectory(dirName, { create: create }, function (dirEntry) {
//                 resolve(dirEntry)
//             }, (e) => {
//                 console.log(e)
//             });
//         })
//     }
//     /**
//      * 默认为覆盖已有文件
//      * @param dirEntry 目录入口
//      * @param fileData 文件内容
//      * @param fileName 文件名
//      * 
//      */
//     saveFile(dirEntry, fileData, fileName, options?) {
//         return new Promise((resolve) => {
//             const instance = this;
//             dirEntry.getFile(fileName, { create: options?.create ?? true }, async function (fileEntry) {
//                 resolve(await instance.writeFile(fileEntry, fileData, false))
//             }, () => {
//                 console.log('onErrorSaveDir')
//             });
//         })
//     }
//     /**
//      * 读取图片
//      * @param fileEntry 文件入口
//      * @param type  默认"image/png"
//      * @returns 返回blob
//      */
//     readImage(fileEntry, type) {
//         return new Promise(resolve => {
//             fileEntry.file(function (file) {
//                 const reader = new FileReader();
//                 reader.onloadend = function () {
//                     console.log("Successful file write: " + this.result);
//                     //@ts-ignore
//                     const blob = new Blob([new Uint8Array(this.result)], { type: type ?? "image/png" });
//                     resolve(blob)
//                 };
//                 reader.readAsArrayBuffer(file);
//             }, () => {
//                 console.log('error')
//             });
//         })
//     }

//     /**
//      * 
//      * @param path 默认市根目录下，即相对路径
//      * @param data 
//      * @param options: create
//      */
//     async writeFileAsync(fullPath, data, options) {
//         const rootEntry = await this.getRootDirEntry();
//         const { path, fileName } = resolveFullPath(fullPath);
//         const directoryEntry = await this.getDirectory(rootEntry, path, options.dirCreate ?? false);
//         return this.saveFile(directoryEntry, data, fileName, options.fileCreate ?? true)
//     }


//     async readFileAsync(fullPath) {
//         const rootEntry = await this.getRootDirEntry();
//         const { path, fileName } = resolveFullPath(fullPath);
//         const dirEntry =await this.getDirectory(rootEntry, path, false)
//         const fileEntry = await this.getFileEntry(dirEntry, fileName, { create: false });
//         return this.readFile(fileEntry, 'image')
//     }
// }
// const file = new FilePlugin();
// export default file;