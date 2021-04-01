/**
 * 封装常用数据库语句，并返回为Promise
 * 提供自定义sql语句
 */
let db = null;
function connectDB() {
  db = window['sqlitePlugin'].openDatabase(
    {
      //SQLite 是不区分大小写的
      name: "geovisMobile.db",
      location: "default"
    },
    function (db) {
      console.log("connect ok");
    },
    function (error) {
      console.log("Open database ERROR: " + JSON.stringify(error));
    }
  );
}
const onDeviceReady = function () {
  connectDB();
};
document.addEventListener("deviceready", onDeviceReady, false);

function createTabel(tableName, attributes: Array<string>) {
  const sql = `CREATE TABLE  IF NOT EXISTS ${tableName} (${attributes.toString()})`;
  return new Promise((resolve, reject) => {
    db.transaction(
      function (tx) {
        tx.executeSql(sql, function (tx, res) {
          console.log("create table: " + res);
          resolve(res)
        });
      },
      function (error) {
        console.log("transaction error: " + error.message);
        reject(error.message)
      },
      function () {
        console.log("transaction ok");
      }
    );

  })
}
function addRow(tableName, attributes: Array<string>, values: Array<any>) {
  const valuesMarks = new Array(attributes.length).fill('?')
  const sql = `INSERT INTO ${tableName} (${attributes.toString()}) VALUES (${valuesMarks})`;
  return new Promise((resolve, reject) => {
    db.transaction(function (tx) {
      tx.executeSql(sql, values, function (tx, res) {
        console.log("insertId: " + res.insertId);
        console.log("rowsAffected: " + res.rowsAffected);
        resolve(res.insertId)
      },
        function (tx, error) {
          console.log('INSERT error: ' + error.message);
          reject(error.message)
        });
    }, function (error) {
      console.log('transaction error: ' + error.message);
    }, function () {
      console.log('transaction ok');
    });
  })
}
function customSql(sql: string) {
  return new Promise((resolve, reject) => {
    db.transaction(
      function (tx) {
        tx.executeSql(sql, function (tx, res) {
          console.log("custom sql 语句 " + res);
          resolve(res)
        });
      },
      function (error) {
        console.log("transaction error: " + error.message);
        reject(error.message)
      },
      function () {
        console.log("transaction ok");
      }
    );

  })
}
function readRow(tableName, conditionAttribute: string, conditionValue: any) {
  return new Promise((resolve, reject) => {
    db.transaction(function (tx) {
      var query = `SELECT * FROM ${tableName} WHERE ${conditionAttribute} = ?`;
      tx.executeSql(query, [conditionValue], function (tx, resultSet) {
        resolve(resultSet)
        console.log("查询 结果数量" + resultSet.rows.length);
      },
        function (tx, error) {
          console.log('SELECT error: ' + error.message);
          reject(error.message)
        });
    }, function (error) {
      console.log('transaction error: ' + error.message);
    }, function () {
      console.log('transaction ok');
    });
  })
}
function removeRow(tableName, conditionAttribute, conditionValue) {
  const sql = `DELETE FROM ${tableName} WHERE ${conditionAttribute} = ?`;
  return new Promise((resolve, reject) => {
    db.transaction(function (tx) {
      tx.executeSql(sql, [conditionValue], function (tx, res) {
        console.log("removeId: " + res.insertId);
        console.log("rowsAffected: " + res.rowsAffected);
        resolve(res.insertId)
      },
        function (tx, error) {
          console.log('DELETE error: ' + error.message);
          reject(error.message)
        });
    }, function (error) {
      console.log('transaction error: ' + error.message);
    }, function () {
      console.log('transaction ok');
    });
  })
}
function updateRow(tableName, attributtes, values, conditionAttribute, conditionValue) {
  let update = ""
  for (let i = 0; i < attributtes.length; i++) {
    update += `${attributtes[i]} = ?  `
  }
  const sql = `UPDATE  ${tableName} SET ${update} WHERE ${conditionAttribute} = ?`;
  return new Promise((resolve, reject) => {
    db.transaction(function (tx) {
      tx.executeSql(sql, [conditionValue], function (tx, res) {
        console.log("removeId: " + res.insertId);
        console.log("rowsAffected: " + res.rowsAffected);
        resolve(res.insertId)
      },
        function (tx, error) {
          console.log('DELETE error: ' + error.message);
          reject(error.message)
        });
    }, function (error) {
      console.log('transaction error: ' + error.message);
    }, function () {
      console.log('transaction ok');
    });
  })
}
function closeDB() {
  db.close(function () {
    console.log("DB closed!");
  }, function (error) {
    console.log("Error closing DB:" + error.message);
  });
}

export { connectDB, createTabel, addRow, customSql, readRow, removeRow, updateRow, closeDB };
