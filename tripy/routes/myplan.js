var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var passport = require('passport');

var con =require("../db/index.js")
/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.isAuthenticated()) {
  res.render('myplan', { title: '내 일정',
      nameText: '',
      registerButton: '일정 등록하기',
      nowBoard: '현재 여행지',
      nextBoard: '다음 여행지',
      prevBoard: '이전 여행지',
      calendarText: '일정을 추가해보세요.',
      userId : req.user.ID,
      userImg : req.user.IMG,
      username : req.user.NAME,
      loginStatus  : true,
      isAdmin : req.user.ISADMIN,
      userLevel : req.user.LEVEL,
      userExp : req.user.EXP,
      userGold : req.user.GOLD,
      loginMessage : "로그인후 작성해 접속해주시길 바랍니다."
  });
}else{
  res.redirect('/login/login');
}

});

router.get('/getmyallplan', function(req, res) {

  var query = 'SELECT SEQ, WRITER, AREA_CODE, START_DATE, END_DATE  FROM PT_USER_TOUR WHERE WRITER = ? ';

  var params =[req.query.id];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        console.log(err);
      }else{
        console.log(rows.inster);
        
        res.send({rows,result:true});
      }
    });
    

});

router.get('/getmyplannow', function(req, res) {

  var query = 'SELECT T1.SEQ, T1.WRITER, T1.AREA_CODE, T1.START_DATE, T1.END_DATE, T2.AREA, T2.IMG  FROM PT_USER_TOUR T1, PT_AREA T2 WHERE T1.WRITER = ? AND T1.START_DATE <= ? AND T1.END_DATE >= ? AND T1.AREA_CODE = T2.AREA_CODE';

  var params =[req.query.id, req.query.nowDate, req.query.nowDate];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        console.log(err);
      }else{
        console.log(rows.inster);
        
        res.send({rows,result:true});
      }
    });
    

});

router.get('/getuserinfo', function(req, res) {

  var query = 'SELECT NAME, IMG FROM PT_USER WHERE ID = ?';

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

router.get('/getuserplan', function(req, res) {

  var query = 'SELECT T1.SEQ, T1.WRITER, T1.AREA_CODE, T1.START_DATE, T1.END_DATE FROM PT_USER_TOUR T1, PT_USER T2 WHERE T2.SEQ = ? ';

  var params =[req.query.id];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        console.log(err);
      }else{
        console.log(rows.inster);
        
        res.send({rows,result:true});
      }
    });
    

});

router.get('/getuserinfoseq', function(req, res) {

  var query = 'SELECT NAME, IMG FROM PT_USER WHERE SEQ = ?';

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




module.exports = router;
