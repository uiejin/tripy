var express = require('express');
var router = express.Router();

var mysql = require('mysql');


var passport = require('passport');


var con =require("../db/index.js")

router.get('/', function(req, res, next) {
    if (req.isAuthenticated()) {
      res.render('myprofile/profile', { title: '님 프로필',
      nameText: '',
      registerButton: '일정 등록하기',
      nowBoard: '현재 여행지',
      nextBoard: '다음 여행지',
      prevBoard: '이전 여행지',
      calendarText: '일정을 추가해보세요.',
      notGetAgeTEXT : "정보없음",
      userGender : req.user.GENDER,
      userAge : getAge(req.user.BIRTHDAY) + "세",
      userId : req.user.ID,
      userImg : req.user.IMG,
      username : req.user.NAME,
      loginStatus  : true,
      isAdmin : req.user.ISADMIN,
      loginMessage : "로그인후 작성해 접속해주시길 바랍니다."
      });
    }else{
      res.redirect('/login/login');
  }
  });

  function getAge(userAge){
    var nowDay = new Date();
    var birthday = new Date(userAge);
  
  
    var age = nowDay.getFullYear() - birthday.getFullYear();
    var month = nowDay.getMonth() - birthday.getMonth();
  
    return month < 0 || (month === 0 && nowDay.getDate() < birthday.getDate()) ?
      age : age +1
  }

  
router.get('/otherinformation', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.render('myprofile/otherinformation', { title: '부가정보 입력',
    selectgenderText: '성별을 선택해주세요',
    maleText: '남성',
    femaleText: '여성',
    birthdayText : "생년월일을 입력해주세요",
    saveText: "저장",
    cancleText: "취소",
    yearTextErr : "2006년생 이후, 1930년생 이하만 등록이 가능합니다.",
    successInfo : "정보저장에 성공했습니다.",
    errorInfo : "생년월일을 다시 한번 확인 해주세요",
    userId : req.user.ID,
    loginStatus  : true,
    isAdmin : req.user.ISADMIN,
    loginMessage : "로그인후 작성해 접속해주시길 바랍니다."
    });
  }else{
    res.redirect('/login/login');
  }
});

  router.get('/updatename', function(req, res, next) {
    if (req.isAuthenticated()) {
      res.render('myprofile/updatename', { title: '부가정보 입력',
      nameText : "",
      saveText: "저장",
      cancleText: "취소",
      successInfo : "이름을 저장했습니다.",
      errorInfo : "오류가 발생했습니다. 다시시도해 주세요.",
      userId : req.user.ID,
      userName : req.user.NAME,
      loginStatus  : true,
      isAdmin : req.user.ISADMIN,
      loginMessage : "로그인후 작성해 접속해주시길 바랍니다."
      });
    }else{
      res.redirect('/login/login');
    }
  });

  router.get('/getuserinfoseq', function(req, res) {

    var query = 'SELECT NAME, IMG,GENDER, BIRTHDAY FROM PT_USER WHERE SEQ = ?';
  
    var params =[req.query.id];
    console.log(req.query.userId);
    con.connection.query(query, params, function(err, rows, fields) {
        if(err){
          console.log(err);
          console.log(rows);
          res.send({rows,result:false});
  
  
        }else{
          console.log(rows.inster);
          console.log(rows);
          res.send({rows,result:true});
  
        }
      });
  
  });



  
  router.get('/updateotherinformation', function(req, res) {
    var moment = require('moment');
    var checkdate = moment(req.query.birthdayDate, 'YYYY-MM-DD');
    var ischeckdate = checkdate.isValid();

    console.log(ischeckdate);

    if(ischeckdate == false){
      res.send({result:false});

      return false;
    }else{
    var query = 'UPDATE PT_USER SET BIRTHDAY = ?, GENDER = ? WHERE ID = ?';
  
    var params =[req.query.birthdayDate, req.query.gender, req.query.userId];
    con.connection.query(query, params, function(err, rows, fields) {
        if(err){
          console.log(err);
          console.log(rows);
          res.send({rows,result:false});

  
        }else{
          console.log(rows.inster);
          console.log(rows);
          res.send({rows,result:true});
  
        }
      });
    }
  
  });

  router.get('/updatemyname', function(req, res) {

    var query = 'UPDATE PT_USER SET NAME = ? WHERE ID = ?';
  
    var params =[req.query.name, req.query.userId];
    con.connection.query(query, params, function(err, rows, fields) {
        if(err){
          console.log(err);
          console.log(rows);
          res.send({rows,result:false});

  
        }else{
          console.log(rows.inster);
          console.log(rows);
          res.send({rows,result:true});
  
        }
      });
  
  });


module.exports = router;