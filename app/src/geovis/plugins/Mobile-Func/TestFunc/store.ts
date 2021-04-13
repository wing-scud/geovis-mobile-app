let Camera: any;
class Store {
    private camera;
    constructor() {
        document.addEventListener('deviceReady', () => {
            this.camera = navigator['camera'];
            Camera = window['Camera'];
            console.log("🚀 ~ file: store.ts ~ line 6 ~ Store ~ document.addEventListener ~  this.camera ", this.camera)
        })
    }
    setOptions(srcType) {
        const options = {
            // Some common settings are 20, 50, and 100
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            // In this app, dynamically set the picture source, Camera or photo gallery
            sourceType: srcType,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            allowEdit: true,
            correctOrientation: true
        }
        return options;
    }
    openCamera(selection) {
        const srcType = Camera.PictureSourceType.CAMERA;
        const options = this.setOptions(srcType);
        const func = this.createNewFileEntry;
        const instance = this;
        this.camera.getPicture(function cameraSuccess(imageUri) {
            instance.displayImage(imageUri);
            // You may choose to copy the picture, save it somewhere, or upload.
            func(imageUri);
        }, function cameraError(error) {
            console.debug("Unable to obtain picture: " + error, "app");
        }, options);
    }
    displayImage(imgUri,container?) {
        const elem = container?container:document.getElementById('photo');
        //@ts-ignore
        elem.src = imgUri;
    }
    openCameraByThmb(selection) {
        const srcType = Camera.PictureSourceType.CAMERA;
        const options = this.setOptions(srcType);
        const func = this.createNewFileEntry;
        if (selection == "camera-thmb") {
            options['targetHeight'] = 100;
            options['targetWidth'] = 100;
        }
        this.camera.getPicture(function cameraSuccess(imageUri) {
            // Do something
        }, function cameraError(error) {
            console.debug("Unable to obtain picture: " + error, "app");
        }, options);
    }
    openFilePickerByThmb(selection) {
        const srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
        const options = this.setOptions(srcType);
        const func = this.createNewFileEntry;
        if (selection == "picker-thmb") {
            // To downscale a selected image,
            // Camera.EncodingType (e.g., JPEG) must match the selected image type.
            options['targetHeight'] = 100;
            options['targetWidth'] = 100;
        }
        return  new Promise((resolve,reject)=>{
            this.camera.getPicture(function cameraSuccess(imageUri) {
                // Do something
                resolve(imageUri)
            }, function cameraError(error) {
                console.debug("Unable to obtain picture: " + error, "app");
                reject(error)
            }, options);
        })
    }
    openFilePicker(selection) {
        //@ts-ignore
        const srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
        const options = this.setOptions(srcType);
        const func = this.createNewFileEntry;
        return  new Promise((resolve,reject)=>{
            this.camera.getPicture(function cameraSuccess(imageUri) {
                // Do something
                resolve(imageUri)
            }, function cameraError(error) {
                console.debug("Unable to obtain picture: " + error, "app");
                reject(error)
            }, options);
        })
    }
    getFileEntry(imgUri) {
        const instance = this;
        //@ts-ignore
        window.resolveLocalFileSystemURL(imgUri, function success(fileEntry) {
            // Do something with the FileEntry object, like write to it, upload it, etc.
            // writeFile(fileEntry, imgUri);
            console.log("got file: " + fileEntry.fullPath);
            // displayFileData(fileEntry.nativeURL, "Native URL");

        }, function () {
            // If don't get the FileEntry (which may happen when testing
            // on some emulators), copy to a new FileEntry.
            instance.createNewFileEntry(imgUri);
        });
    }
    createNewFileEntry(imgUri) {
        //@ts-ignore
        window.resolveLocalFileSystemURL(cordova.file.cacheDirectory, function success(dirEntry) {
            // JPEG file
            dirEntry.getFile("tempFile.jpeg", { create: true, exclusive: false }, function (fileEntry) {
                // Do something with it, like write to it, upload it, etc.
                // writeFile(fileEntry, imgUri);
                console.log("got file: " + fileEntry.fullPath);
                // displayFileData(fileEntry.fullPath, "File copied to");

            }, () => {
                console.log('onErrorCreateFile')
            });

        }, () => {
            console.log('onErrorResolveFile')
        });
    }
}
const cameraPlugin = new Store();
export default cameraPlugin;