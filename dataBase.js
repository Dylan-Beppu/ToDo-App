import * as SQLite from "expo-sqlite";
// import * as FileSystem from "expo-file-system";
// import { Asset } from "expo-asset";

let DB = SQLite.openDatabase("./todoStor.db");

const STORAGE_STR = `
CREATE TABLE IF NOT EXISTS Storage (
    Key      INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    Task     TEXT    NOT NULL,
    IsDone   INTEGER DEFAULT (0) NOT NULL,
    DateDone NUMERIC DEFAULT (0) NOT NULL
)`;

async function dbMakeTable(str) {
  return new Promise((resolve, reject) => {
    DB.transaction((tx) => {
      tx.executeSql(
        str,
        [],
        () => resolve(),
        (_, error) => reject(error),
      );
    });
  });
}

export async function dbLoader() {
  try {
    dbMakeTable(STORAGE_STR);
  } catch (error) {
    console.error(error);
  }
}

/**
 * close the database
 */
export function dbEnd() {
  if (DB != null) {
    DB.closeAsync();
  } else {
    console.warn("DATABASE NOT STARTED");
  }
}

// return testData2;

//TestDb functions (So things will change, but for now will olny use the table to make stuffs)
export async function GetTodo() {
  let rtnArr = [];
  let sqlCmd = "SELECT * FROM Storage";
  console.log("Sending back data");
  await new Promise((resolve, reject) => {
    DB.transaction((tx) => {
      tx.executeSql(
        sqlCmd,
        [],
        (_, { rows }) => {
          rtnArr = rows._array;
          resolve();
        },
        (error) => {
          console.log("Error executing SQL: ", error);
          reject();
        },
      );
    });
  });
  return rtnArr;
}

export function logDat() {
  let sqlCmd = "SELECT * FROM Storage";
  DB.transaction((tx) => {
    tx.executeSql(
      sqlCmd,
      [],
      (_, { rows }) => {
        // Access the retrieved rows here
        const data = rows._array;
        console.log(data);
      },
      (error) => {
        console.log("Error\tLogsPrintAll:\t: ", error);
      },
    );
  });
}

export async function addTodo(task) {
  await new Promise((resolve, reject) => {
    let sqlCmd = "INSERT INTO Storage (Task) VALUES (?)";
    DB.transaction((tx) => {
      tx.executeSql(
        sqlCmd,
        [task],
        (_tx, result) => {
          if (result.rowsAffected > 0) {
            console.log("Data inserted successfully.");
            resolve();
          } else {
            console.log("Failed to insert data.");
            reject("Failed to insert data");
          }
        },
        (error) => {
          console.log("Error executing SQL: ", error);
          reject(error);
        },
      );
    });
  });
}

export async function RemoveKey(key) {
  console.log(key);
  await new Promise((resolve, reject) => {
    DB.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM Storage WHERE Key = ?",
        [key],
        (_, result) => {
          if (result.rowsAffected > 0) {
            resolve(true);
          } else {
            reject("Deletion failed");
          }
        },
        (_, error) => reject(error),
      );
    });
  });
}

export async function SetDone(key, val) {
  console.log(`${key} is updating to val ${val}`)
  let sqlCmd = 'UPDATE Storage SET IsDone = ? WHERE Key = ?';
  await new Promise((resolve, reject) => {
    DB.transaction((tx) => {
      tx.executeSql(
        sqlCmd,
        [val, key],
        (_, result) => {
          if (result.rowsAffected > 0) {
            resolve(true);
          } else {
            reject("Update failed");
          }
        },
        (_, error) => reject(error),
      );
    });
  });
  // testData2[key].Done = true;
}

/**
 * 	today's date in YYYYMMDD format
 * @returns dateCode
 */
export function GetDay() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const rtnDate = `${year}${month}${day}`;
  return rtnDate;
}

function calculateDaysBetweenDates(date1, date2) {
  const year1 = Math.floor(date1 / 10000);
  const month1 = Math.floor((date1 % 10000) / 100) - 1;
  const day1 = date1 % 100;

  const year2 = Math.floor(date2 / 10000);
  const month2 = Math.floor((date2 % 10000) / 100) - 1;
  const day2 = date2 % 100;

  const dateObject1 = new Date(year1, month1, day1);
  const dateObject2 = new Date(year2, month2, day2);

  const diffInMs = Math.abs(dateObject2 - dateObject1);
  const daysBetween = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  return daysBetween;
}

/**
 * get the  dateCode for x days back
 * @param {int} howBack number of days back
 * @returns dateCode for x days back
 */
export function GetDaysBack(howBack) {
  const currentDate = new Date();
  const lastWeekDate = new Date(
    currentDate.getTime() - howBack * 24 * 60 * 60 * 1000,
  );
  const year = lastWeekDate.getFullYear();
  const month = String(lastWeekDate.getMonth() + 1).padStart(2, "0");
  const day = String(lastWeekDate.getDate()).padStart(2, "0");
  const rtnDate = `${year}${month}${day}`;
  return rtnDate;
}