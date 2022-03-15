var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var passport = require('passport');

var con = require("../db/index.js")
/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.isAuthenticated()) {
        res.render('myhistory/myhistory', {
            title: '여행일지',
            nameText: '',
            registerButton: '일정 등록하기',
            nowAchive: '진행중인 업적',
            secretAcive: '비밀 업적',
            tourAcive: '여행 업적',
            partyAcive: '모임 업적',
            getAcive: '획득한 업적',
            calendarText: '일정을 추가해보세요.',
            userId: req.user.ID,
            userImg: req.user.IMG,
            username: req.user.NAME,
            loginStatus: true,
            isAdmin: req.user.ISADMIN,
            loginMessage: "로그인후 작성해 접속해주시길 바랍니다."
        });
    } else {
        res.redirect('/login/login');
    }
});


router.get('/getmyacivetop', function (req, res) {

    var query = 'SELECT T1.SEQ, T1.TITLE, T1.POINT, T1.EXP, T1.MAIN_IMG, T2.TYPE_NAME, T3.COMPLETE_DATE, ' +
        '(SELECT AREA FROM PT_AREA  WHERE T1.AREA_TYPE = SEQ) AS AREA_NAME, ' +
        '(SELECT (6371*acos(cos(radians(?))*cos(radians(T1.LATITUDE))*cos(radians(T1.LONGITUDE) ' +
        '-radians(?))+sin(radians(?))*sin(radians(T1.LATITUDE))))) AS DISTANCE ' +
        'FROM PT_ACHIEVEMENT T1, PT_ACHIEVEMENT_TYPE T2, PT_ACHIEVEMENT_USER_SUCCESS T3 ' +
        'WHERE T3.USER_SEQ = ? AND T2.SEQ = T1.TYPE ' +
        'ORDER BY T3.SEQ DESC LIMIT 0, 5;';

    var params = [req.query.userLat, req.query.userLong, req.query.userLat, req.user.SEQ];

    con.connection.query(query, params, function (err, rows, fields) {
        if (err) {
            console.log(err);
            console.log(rows);
            res.send({ rows, result: false });
        } else {
            res.send({ rows, result: true });

        }
    });

});


router.get('/getmyacivetopnotusedgps', function (req, res) {

    var query = 'SELECT T1.SEQ, T1.TITLE, T1.POINT, T1.EXP, T1.MAIN_IMG, T2.TYPE_NAME, T3.COMPLETE_DATE, ' +
        '(SELECT AREA FROM PT_AREA  WHERE T1.AREA_TYPE = SEQ) AS AREA_NAME, ' +
        'FROM PT_ACHIEVEMENT T1, PT_ACHIEVEMENT_TYPE T2, PT_ACHIEVEMENT_USER_SUCCESS T3 ' +
        'WHERE T3.USER_SEQ = ? AND T2.SEQ = T1.TYPE ' +
        'ORDER BY T3.SEQ DESC LIMIT 0, 5;';


    console.log(req.query.userLat);
    con.connection.query(query, params, function (err, rows, fields) {
        if (err) {
            console.log(err);
            console.log(rows);
            res.send({ rows, result: false });
        } else {
            res.send({ rows, result: true });

        }
    });

});

module.exports = router;
