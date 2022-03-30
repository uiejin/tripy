const mysql = require("mysql");
// export PASSWORD=your_password_here -> 전역에 패스워드 설정해주기
// export 변수명 = 값

const password = process.env.PASSWORD;

const host = "localhost";

module.exports = {
  connection: mysql.createConnection({
    host: "localhost",
    user: "root",
    password: password,
    database: "party",
  }),
};