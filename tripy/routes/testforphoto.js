var express = require('express');
var router = express.Router();

var mysql = require('mysql');

let multer = require("multer");

var passport = require('passport');


var con =require("../db/index.js")

let upload = multer({
    dest: "upload/"

})

router.get('/', function (req, res, next) {
    if (req.isAuthenticated()) {
        res.render('test/photo', {
            title: '사진등록',
            nameText: '',
            registerButton: '일정 등록하기',
            nowBoard: '현재 여행지',
            nextBoard: '다음 여행지',
            prevBoard: '이전 여행지',
            calendarText: '일정을 추가해보세요.',
            notGetAgeTEXT: "정보없음",
            loginStatus: true,
            userId: req.user.ID,
            userImg: req.user.IMG,
            username: req.user.NAME,
            loginMessage: "로그인후 작성해 접속해주시길 바랍니다."
        });
    } else {
        res.render('login/login', {
            title: "로그인후 이용이 가능합니다.",
            kakaoBtn : "카카오 로그인",
            loginStatus  : false
        
          });
    }
});

router.get('/photolist', function (req, res, next) {
    if (req.isAuthenticated()) {
        res.render('test/photolist', {
            title: '사진리스트',
            nameText: '',
            registerButton: '일정 등록하기',
            nowBoard: '현재 여행지',
            nextBoard: '다음 여행지',
            prevBoard: '이전 여행지',
            calendarText: '일정을 추가해보세요.',
            notGetAgeTEXT: "정보없음",
            loginStatus: true,
            userId: req.user.ID,
            userImg: req.user.IMG,
            username: req.user.NAME,
            loginMessage: "로그인후 작성해 접속해주시길 바랍니다."
        });
    } else {
        res.render('login/login', {
            title: "로그인후 이용이 가능합니다.",
            kakaoBtn : "카카오 로그인",
            loginStatus  : false
        
          });
    }
});

router.post('/writetestphoto', function (req, res) {

    var moment = require('moment');
    var nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
    var query = "INSERT INTO TEST_PHOTO (ID, LATX, LONGY, REG_DATE) VALUES (?,?,?,?)";

    var params = [req.body.id, req.body.latX, req.body.longY,nowTime];

    var no = 'null';
    con.connection.query(query, params, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.send({ result: no });
        } else {
            no = rows.insertId;
            console.log(rows.insertId);
            res.send({ result: no });
        }
    });
});

router.post('/uploadphoto', function (req, res) {

    var query = 'UPDATE TEST_PHOTO SET IMG = ? WHERE SEQ = ?';

    var params = [req.body.img1, req.body.no];


    con.connection.query(query, params, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.send({ result: false });
        } else {
            res.send({ result: true });
        }
    });
});


router.post('/getphotolist', function (req, res) {

    var query = 'SELECT * FROM TEST_PHOTO WHERE ID = ?';

    var params = [req.body.id];


    con.connection.query(query, params, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.send({ result: false });
        } else {
            res.send({rows});
        }
    });
});

module.exports = router;
