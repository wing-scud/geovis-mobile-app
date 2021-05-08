class FilePlugin {
    //cordova.file.dataDirectory
    private _file;
    public get file() {
        return this._file;
    }
    public set file(value) {
        this._file = value;
    }
    constructor() {
        // if (navigator?.userAgent.includes('Windows')) {
        const requestedBytes = 1024 * 1024 * 100;
        //@ts-ignore
        navigator.webkitPersistentStorage.requestQuota(
            requestedBytes, function (grantedBytes) {
                console.log("获取权限")
            }
        )

        // }
    }
    /**
     * 向文件写入内容
     * @param fileEntry 
     * @param dataObj 
     * @param isAppend  是否向文件中追加
     */
    writeFile(fileEntry, dataObj, isAppend) {
        return new Promise((resolve) => {
            // Create a FileWriter object for our FileEntry
            fileEntry.createWriter(function (fileWriter) {
                fileWriter.onwriteend = function () {
                    console.log("Successful file write...");
                    resolve(true)
                };
                fileWriter.onerror = function (e) {
                    console.log("Failed file write: " + e.toString());
                };
                // If data object is not passed in,
                // create a new Blob instead.
                if (isAppend) {
                    try {
                        fileWriter.seek(fileWriter.length);
                    }
                    catch (e) {
                        console.log("file doesn't exist!");
                    }
                }
                if (!dataObj) {
                    dataObj = new Blob(['nothing write'], { type: 'text/plain' });
                }
                fileWriter.write(dataObj);
            });
        })
    }
    /**
     * 读取文件内容
     * @param fileEntry 
     * @param type  文件类型
     * @returns 
     */
    readFile(fileEntry, type) {
        return new Promise(resolve => {
            fileEntry.file(function (file) {
                const reader = new FileReader();
                reader.onloadend = function () {
                    console.log("Successful file read:");
                    resolve(this.result);
                };
                if (type === "text") {
                    reader.readAsText(file);
                } else if (type === "image") {
                    reader.readAsDataURL(file);
                } else {
                    reader.readAsArrayBuffer(file);
                }
            }, function (e) {
                console.log("Failed file read: " + e.toString());
            });
        })
    }
    /* 获取保存文件的根路径 */
    getRootDirEntry() {
        const requestedBytes = 1024 * 1024 * 10;
        return new Promise(resolve => {

            //@ts-ignore
            window.webkitRequestFileSystem(window.PERSISTENT, requestedBytes, function (fs) {
                //cordova.file.dataDirectory
                console.log('file system open: ' + fs.name);
                resolve(fs.root)
            }, () => {
                console.log('error')
            });
        })
    }
    /**
     * 获取文件入口
     * @param dirEntry  目录入口
     * @param fileName  文件名
     * @returns  文件入口
     */
    getFileEntry(dirEntry, fileName) {
        const instance = this;
        return new Promise((resolve, reject) => {
            dirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {
                console.log("fileEntry is file?" + fileEntry.isFile.toString());
                resolve(fileEntry)
            }, (e) => {
                console.log(e)
            });
        })
    }
    /**
     * 快捷写入永久性文件（默认路径为根路径）
     * @param fileName 文件名
     * @returns 
     */
    createPersistentFile(fileName, fileObj) {
        const instance = this;
        const requestedBytes = 1024 * 1024 * 10;
        const promise = new Promise((resolve, reject) => {
            //@ts-ignore
            window.webkitRequestFileSystem(window.PERSISTENT, requestedBytes, function (fs) {
                //cordova.file.dataDirectory
                console.log('file system open: ' + fs.name);
                //fs.root-->DirectoryEntry
                fs.root.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {
                    instance.writeFile(fileEntry, fileObj, false)
                    resolve("success")
                }, () => {
                    console.log('error')
                });

            }, () => {
                console.log('error')
            });
        })
        return promise;
    }
    /**
     * 创建或获取目录
     * @param rootDirEntry 根路径入口
     * @param dirName  目录名
     * @param create 是否创建 true下新建目录若存在则删除，重建，false若存在即不创建
     * @returns 
     */
    getDirectory(rootDirEntry, dirName, create) {
        return new Promise((resolve) => {
            rootDirEntry.getDirectory(dirName, { create: create }, function (dirEntry) {
                resolve(dirEntry)
            }, (e) => {
                console.log(e)
            });
        })
    }
    /**
     * 默认为覆盖已有文件
     * @param dirEntry 目录入口
     * @param fileData 文件内容
     * @param fileName 文件名
     * 
     */
    saveFile(dirEntry, fileData, fileName) {
        const instance = this;
        dirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {
            instance.writeFile(fileEntry, fileData, false);
        }, () => {
            console.log('onErrorSaveDir')
        });
    }
    /**
     * 读取图片
     * @param fileEntry 文件入口
     * @param type  默认"image/png"
     * @returns 返回blob
     */
    readImage(fileEntry, type) {
        return new Promise(resolve => {
            fileEntry.file(function (file) {
                const reader = new FileReader();
                reader.onloadend = function () {
                    console.log("Successful file write: " + this.result);
                    //@ts-ignore
                    const blob = new Blob([new Uint8Array(this.result)], { type: type ?? "image/png" });
                    resolve(blob)
                };
                reader.readAsArrayBuffer(file);

            }, () => {
                console.log('error')
            });
        })
    }
}
const file = new FilePlugin()
export default file;