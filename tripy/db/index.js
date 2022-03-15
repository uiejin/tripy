const mysql = require("mysql");
// export PASSWORD=your_password_here -> 전역에 패스워드 설정해주기
// export 변수명 = 값

const password = process.env.PASSWORD;

const host = "3.38.116.153";

module.exports = {
  connection: mysql.createConnection({
    host: "3.38.116.153",
    user: "rabbit234",
    password: password,
    database: "party",
  }),
};