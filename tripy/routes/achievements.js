var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var passport = require('passport');

var moment = require('moment');

var con = require("../db/index.js")
/* GET home page. */
router.get('/view', function (req, res, next) {
    var query = 'SELECT TYPE ' +
        'FROM PT_ACHIEVEMENT ' +
        'WHERE SEQ = ?;';

    var params = [req.query.no];

    con.connection.query(query, params, function (err, rows, fields) {
        if (err) {
            res.redirect('/login/login');
        } else {
            if(rows[0].TYPE == 4){
                if (req.isAuthenticated()) {
                    res.render('achievements/viewsecret', {
                        title: '여행일지',
                        nameText: '',
                        applyBtnText: '업적도전',
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
                    res.render('achievements/viewsecret', {
                        title: '여행일지',
                        nameText: '',
                        applyBtnText: '로그인후',
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
            }
            else if(rows[0].TYPE == 5){
                if (req.isAuthenticated()) {
                    res.render('achievements/viewpic', {
                        title: '여행일지',
                        nameText: '',
                        applyBtnText: '사진 업로드',
                        applyBtnSuccessText: '업적획득',
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
                    res.render('achievements/viewpic', {
                        title: '여행일지',
                        nameText: '',
                        applyBtnText: '로그인후 가능합니다',
                        applyBtnSuccessText: '로그인후 가능합니다',
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
            }
            else if(rows[0].TYPE == 6){
                if (req.isAuthenticated()) {
                    res.render('achievements/viewsecretlist', {
                        title: '여행일지',
                        nameText: '',
                        applyBtnText: '사진 업로드',
                        applyBtnSuccessText: '업적획득',
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
                    res.render('achievements/viewsecretlist', {
                        title: '여행일지',
                        nameText: '',
                        applyBtnText: '로그인후 가능합니다',
                        applyBtnSuccessText: '로그인후 가능합니다',
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
            }
            else {
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
            }
        }
    });


});


router.get('/list', function (req, res, next) {
    if (req.isAuthenticated()) {
        res.render('achievements/list', {
            title: '업적 리스트',
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
        res.render('achievements/list', {
            title: '업적 리스트',
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
    var query = 'SELECT T1.SEQ, T1.TYPE, T1.AREA_TYPE, T1.POINT, T1.EXP, T1.LATITUDE, T1.LONGITUDE, T1.TITLE, T1.CONTENTS, T1.ALTITUDE, ' +
        'T1.START_DATE, T1.END_DATE, T1.START_TIME, T1.END_TIME, ' +
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
            res.send({ rows, result: true });

        }
    });

});

router.get('/isachievementsuccess', function (req, res) {
    var query = 'SELECT SEQ, ALTITUDE, START_DATE, END_DATE, START_TIME, END_TIME, (6371*acos(cos(radians(?))*cos(radians(LATITUDE))*cos(radians(LONGITUDE) ' +
        '-radians(?))+sin(radians(?))*sin(radians(LATITUDE)))) AS distance ' +
        'FROM PT_ACHIEVEMENT WHERE SEQ = ? HAVING DISTANCE <= 0.8 ORDER BY distance LIMIT 0,800';

    var params = [req.query.userLat, req.query.userLong, req.query.userLat, req.query.no];


    con.connection.query(query, params, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.send({ rows, result: false });
        } else if(rows.length > 0){
            var nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
            var isSuccess = false;
            if(rows[0].START_DATE != "" && rows[0].END_DATE != "" && rows[0].START_TIME != "" && rows[0].END_TIME != "")
            {
                var nowOnlyTime = moment().format('HH:mm:ss');
                if(nowTime < rows[0].END_DATE && nowTime > rows[0].START_DATE && nowOnlyTime < rows[0].END_TIME && nowOnlyTime > rows[0].START_TIME)
                {
                    isSuccess = true;
                }

            }
            else if(rows[0].START_DATE != "" && rows[0].END_DATE != "")
            {
                if(nowTime < rows[0].END_DATE && nowTime > rows[0].START_DATE)
                {
                    isSuccess = true;
                }

            }
            else if(rows[0].START_DATE == "" && rows[0].END_DATE == "" && rows[0].START_TIME != "" && rows[0].END_TIME != "")
            {
                var nowOnlyTime = moment().format('HH:mm:ss');
                if(nowOnlyTime < rows[0].END_TIME && nowOnlyTime > rows[0].START_TIME)
                {
                    isSuccess = true;
                }
            }
            else
            {
                isSuccess = true;
            }
            if(isSuccess)
            {
                var query = 'INSERT INTO PT_ACHIEVEMENT_USER_SUCCESS (USER_SEQ, ACHIEVEMENT_SEQ, COMPLETE_DATE) VALUES ' +
                '(?,?,?)';

                var distance = rows[0].distance;
                var params = [req.user.SEQ, req.query.no, nowTime];

                con.connection.query(query, params, function (err, rows, fields) {
                    if (err) {
                        console.log(err);
                        res.send({ rows, result: false });
                    } else {
                        res.send({ rows, result: true, distance: distance });
                    }
                });
            }
            else{
            res.send({ rows, result: false });
            }
        }
        else {
            res.send({ rows, result: false });
        }
    });

});


router.post('/isachievementsuccesspic', function (req, res) {

    var nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
    var query = 'INSERT INTO PT_ACHIEVEMENT_USER_SUCCESS (USER_SEQ, ACHIEVEMENT_SEQ, COMPLETE_DATE) VALUES ' +
        '(?,?,?)';
        
    var params = [req.user.SEQ, req.body.no, nowTime];

    con.connection.query(query, params, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.send({ rows, result: false });
        } else {
            var query = 'INSERT INTO PT_ACHIEVEMENT_USER_SUCCESS_PHOTO (SUCCESS_SEQ, IMG) VALUES ' +
                '(?,?)';
            var params = [rows.insertId, req.body.img1];

            con.connection.query(query, params, function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.send({ rows, result: false });
                } else {
                    res.send({ rows, result: true });
                }
            });
        }
    });

});


router.get('/getachievementspic', function (req, res) {

    var no = req.query.no;
    var query = 'SELECT T1.IMG ' +
    'FROM PT_ACHIEVEMENT_USER_SUCCESS_PHOTO T1, PT_ACHIEVEMENT_USER_SUCCESS T2 ' +
    'WHERE T2.ACHIEVEMENT_SEQ = ? AND T2.USER_SEQ = ? AND T2.SEQ = T1.SUCCESS_SEQ;';

    var params = [no, req.user.SEQ];

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


router.get('/searchachievementlist', function (req, res) {

    var query;
    var params;
    if (req.isAuthenticated()) {
        query = 'SELECT T1.SEQ, T1.TITLE, T1.POINT, T1.EXP, T1.MAIN_IMG, T2.TYPE_NAME, ' +
            '(SELECT AREA FROM PT_AREA  WHERE T1.AREA_TYPE = SEQ) AS AREA_NAME, ' +
            '(SELECT EXISTS (SELECT SEQ FROM PT_ACHIEVEMENT_USER_SUCCESS WHERE ACHIEVEMENT_SEQ = T1.SEQ AND USER_SEQ = ?)) AS ISCOMPLETE, ' +
            '(SELECT (6371*acos(cos(radians(?))*cos(radians(T1.LATITUDE))*cos(radians(T1.LONGITUDE) ' +
            '-radians(?))+sin(radians(?))*sin(radians(T1.LATITUDE))))) AS DISTANCE ' +
            'FROM PT_ACHIEVEMENT T1, PT_ACHIEVEMENT_TYPE T2 ' +
            'WHERE T2.SEQ = T1.TYPE AND T1.AREA_TYPE = ? ' +
            'ORDER BY DISTANCE' ;


        params = [req.user.SEQ, req.query.userLat, req.query.userLong, req.query.userLat, req.query.no];
    }
    else{
        query = 'SELECT T1.SEQ, T1.TITLE, T1.POINT, T1.EXP, T1.MAIN_IMG, T2.TYPE_NAME, ' +
        '(SELECT AREA FROM PT_AREA  WHERE T1.AREA_TYPE = SEQ) AS AREA_NAME, ' +
        '(SELECT EXISTS (SELECT SEQ FROM PT_ACHIEVEMENT_USER_SUCCESS WHERE ACHIEVEMENT_SEQ = T1.SEQ AND USER_SEQ = 0)) AS ISCOMPLETE, ' +
        '(SELECT (6371*acos(cos(radians(?))*cos(radians(T1.LATITUDE))*cos(radians(T1.LONGITUDE) ' +
        '-radians(?))+sin(radians(?))*sin(radians(T1.LATITUDE))))) AS DISTANCE ' +
        'FROM PT_ACHIEVEMENT T1, PT_ACHIEVEMENT_TYPE T2 ' +
        'WHERE T2.SEQ = T1.TYPE AND T1.AREA_TYPE = ? ' +
        'ORDER BY DISTANCE' ;


        params = [req.query.userLat, req.query.userLong, req.query.userLat, req.query.no];
    }
    con.connection.query(query, params, function (err, rows, fields) {
        if (err) {
            console.log(err);
            console.log(rows);
            res.send({ rows, result: false });
        } else {
            for(var i=0; i< rows.length; i++){
                if(rows[i].TYPE_NAME =='비밀' || rows[i].TYPE_NAME == '비밀목록'){
                    rows[i].DISTANCE = '비밀업적입니다';
                }
            }
            res.send({ rows, result: true });

        }
    });

});


router.get('/searchachievementlistnotusedgps', function (req, res) {

    var query;
    var params;
    if (req.isAuthenticated()) {

        query = 'SELECT T1.SEQ, T1.TITLE, T1.POINT, T1.EXP, T1.MAIN_IMG, T2.TYPE_NAME, ' +
        '(SELECT AREA FROM PT_AREA  WHERE T1.AREA_TYPE = SEQ) AS AREA_NAME, ' +
        '(SELECT EXISTS (SELECT SEQ FROM PT_ACHIEVEMENT_USER_SUCCESS WHERE ACHIEVEMENT_SEQ = T1.SEQ AND USER_SEQ = ?)) AS ISCOMPLETE, ' +
        'FROM PT_ACHIEVEMENT T1, PT_ACHIEVEMENT_TYPE T2, ' +
        'WHERE T2.SEQ = T1.TYPE AND T1.AREA_TYPE = ? ' +
        'ORDER BY DISTANCE' ;

        params = [req.user.SEQ, req.query.no];
    }
    else{
        query = 'SELECT T1.SEQ, T1.TITLE, T1.POINT, T1.EXP, T1.MAIN_IMG, T2.TYPE_NAME, ' +
        '(SELECT EXISTS (SELECT SEQ FROM PT_ACHIEVEMENT_USER_SUCCESS WHERE ACHIEVEMENT_SEQ = T1.SEQ AND USER_SEQ = 0)) AS ISCOMPLETE, ' +
        '(SELECT AREA FROM PT_AREA  WHERE T1.AREA_TYPE = SEQ) AS AREA_NAME, ' +
        'FROM PT_ACHIEVEMENT T1, PT_ACHIEVEMENT_TYPE T2, ' +
        'WHERE T2.SEQ = T1.TYPE AND T1.AREA_TYPE = ? ' +
        'ORDER BY DISTANCE' ;

        params = [req.query.no];
    }

    
    con.connection.query(query, params, function (err, rows, fields) {
        if (err) {
            console.log(err);
            console.log(rows);
            res.send({ rows, result: false });
        } else {
            for(var i=0; i< rows.length; i++){
                if(rows[i].TYPE_NAME =='비밀' || rows[i].TYPE_NAME == '비밀목록'){
                    rows[i].DISTANCE = '비밀업적입니다';
                }
            }
            res.send({ rows, result: true });

        }
    });

});


router.get('/getachievementsissuccess', function (req, res) {

    var no = req.query.no;
    var query = 'SELECT EXISTS (SELECT SEQ FROM PT_ACHIEVEMENT_USER_SUCCESS WHERE ACHIEVEMENT_SEQ = ? AND USER_SEQ = ?) AS ISCOMPLETE ';

    var params = [req.query.no, req.user.SEQ];

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
