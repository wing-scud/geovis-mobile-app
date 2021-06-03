const dbName = 'EmssGisMobile';
const localforage = window['localforage']
// Create table 1 in databaseName
const userTable = localforage.createInstance({
    name: dbName,
    storeName: 'userInfor',
    description: '存储用户相关信息'
});

// Create table 2 in databaseName
const mapData = localforage.createInstance({
    name: dbName,
    storeName: 'mapData',
    description: '储存地图相关影像等数据'
});

// Create table 3 in databaseName
const gisInfos = localforage.createInstance({
    name: dbName,
    storeName: 'gisInfo',
    description: '储存信息采集的相关内容'
});


const fileTable = localforage.createInstance({
    name: dbName,
    storeName: 'fileTable',
    description: '文件保存的映射表'
});
const database = {
    mapData, userTable, gisInfos,fileTable
}
export default database;