// const randomNum = require("../lib/randomNum");
require("../lib/numberToLowerCase");
require("../lib/safeSort");
const mysql = require("mysql2");

const aviablesSortParams = [
  "id_asc",
  "id_desc",
  "name_asc",
  "name_desc",
  "count_asc",
  "count_desc",
  "distance_asc",
  "distance_desc",
];

function connectToBD() {
  return mysql.createConnection({
    host: "sql6.freemysqlhosting.net",
    user: "sql6402399",
    database: "sql6402399",
    password: "sGrrRJ96a3",
  });
}

class User {
  async getUser(req, res) {
    let filteredUsers;
    const connection = connectToBD();

    connection.connect(function (err) {
      if (err) {
        return console.error("Ошибка: " + err.message);
      } else {
        console.log("Подключение к серверу MySQL успешно установлено");
      }
    });

    const [rows] = await connection.promise().query(`SELECT * FROM users`);
    // let filteredUsers = users;
    console.log("length", rows.length);
    filteredUsers = rows;
    const { sort, usersPerPage, currentPage } = req.query;

    let countPerPage = isNaN(usersPerPage) ? 20 : usersPerPage;

    let page = isNaN(currentPage) ? 1 : currentPage;

    if (sort && aviablesSortParams.includes(sort)) {
      const [param, type] = sort.split("_");
      if (param === "name") {
        filteredUsers = filteredUsers.safeSortByObjParam(param, type, {
          ignoreCaseSensitive: true,
        });
      } else {
        filteredUsers = filteredUsers.safeSortByObjParam(param, type);
      }
    }

    filteredUsers = filteredUsers?.slice(
      countPerPage * (page - 1),
      countPerPage * page
    );
    // if (usersPerPage && !isNaN(usersPerPage)) {
    // }
    // if (currentPage && !isNaN(currentPage)) {
    // }
    console.log("filtered", filteredUsers.length);
    // console.log(req.query);
    res.json({ users: filteredUsers, count: rows.length });
    connection.end();
  }
  async test(req, res) {
    console.log("test");
    const connection = connectToBD();

    connection.connect(function (err) {
      if (err) {
        return console.error("Ошибка: " + err.message);
      } else {
        console.log("Подключение к серверу MySQL успешно установлено");
      }
    });

    const [rows] = await connection.promise().query(`SELECT * FROM users`);
    // let filteredUsers = users;
    console.log("length", rows.length);
    connection.end();
    return res.json("test");
  }
}

module.exports = new User();
