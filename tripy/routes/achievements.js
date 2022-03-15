var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var passport = require('passport');

var moment = require('moment');

var con = require("../db/index.js")
/* GET home page. */
router.get('/view', function (req, res, next) {
    if (req.isAuthenticated()) {
        res.render('achievements/view', {
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
        res.render('achievements/view', {
            title: '여행일지',
            nameText: '',
            registerButton: '일정 등록하기',
            nowAchive: '진행중인 업적',
            secretAcive: '비밀 업적',
            tourAcive: '여행 업적',
            partyAcive: '모임 업적',
            getAcive: '획득한 업적',
            calendarText: '일정을 추가해보세요.',
            userId: null,
            loginStatus: false,
            userAge: null,
            userGender: null,
            username: null,
            userImg: null,
            isAdmin: 0,
            loginMessage: "로그인후 작성해 접속해주시길 바랍니다."
        });
    }
});


router.get('/getachievements', function (req, res) {

    var no = req.query.no;
    var query = 'SELECT T1.SEQ, T1.TYPE, T1.AREA_TYPE, T1.POINT, T1.EXP, T1.LATITUDE, T1.LONGITUDE, T1.TITLE, T1.CONTENTS,' +
        'T1.MAIN_IMG, T2.TYPE_NAME, T3.AREA, (SELECT COUNT(*) FROM PT_ACHIEVEMENT_USER_SUCCESS WHERE ACHIEVEMENT_SEQ = ?) AS USERTOTAL, ' +
        '(SELECT EXISTS (SELECT SEQ FROM PT_ACHIEVEMENT_USER_SUCCESS WHERE ACHIEVEMENT_SEQ = ? AND USER_SEQ = ?)) AS ISCOMPLETE ' +
        'FROM PT_ACHIEVEMENT T1, PT_ACHIEVEMENT_TYPE T2, PT_AREA T3 ' +
        'WHERE T1.SEQ = ? AND T1.TYPE = T2.SEQ AND T1.AREA_TYPE = T3.SEQ;';

    var params = [no, no, req.user.SEQ, no];

    con.connection.query(query, params, function (err, rows, fields) {
        if (err) {
            console.log(err);
            console.log(rows);
            res.send({ rows, result: false });
        } else {
            console.log(rows.inster);
            console.log(rows);
            res.send({ rows, result: true });

        }
    });

});

router.get('/isachievementsuccess', function (req, res) {
    var query = 'SELECT SEQ, (6371*acos(cos(radians(?))*cos(radians(LATITUDE))*cos(radians(LONGITUDE) ' +
        '-radians(?))+sin(radians(?))*sin(radians(LATITUDE)))) AS distance ' +
        'FROM PT_ACHIEVEMENT WHERE SEQ = ? HAVING DISTANCE <= 0.8 ORDER BY distance LIMIT 0,800';

    var params = [req.query.userLat, req.query.userLong, req.query.userLat, req.query.no];


    con.connection.query(query, params, function (err, rows, fields) {
        if (err) {
            console.log(err);
            console.log(rows);
            res.send({ rows, result: false });
        } else {
            var nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
            var query = 'INSERT INTO PT_ACHIEVEMENT_USER_SUCCESS (USER_SEQ, ACHIEVEMENT_SEQ, COMPLETE_DATE) VALUES ' +
                '(?,?,?)';
            var distance = rows[0].distance;
            var params = [req.user.SEQ, req.query.no, nowTime];

            con.connection.query(query, params, function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    console.log(rows);
                    res.send({ rows, result: false });
                } else {
                    res.send({ rows, result: true, distance: distance });
                }
            });
        }
    });

});

module.exports = router;
