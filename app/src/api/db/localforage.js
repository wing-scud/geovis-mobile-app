const dbName = 'EmssGisMobile';
const  localforage =window['localforage']
// Create table 1 in databaseName
const userTable = localforage.createInstance({
    name        : dbName,
    storeName   : 'userInfor',
    description : '存储用户相关信息'
});

// Create table 2 in databaseName
const mapData = localforage.createInstance({
    name        : dbName,
    storeName   : 'mapData',
    description : '储存地图相关影像等数据'
});
const database = {
    mapData,userTable
}
export default database;