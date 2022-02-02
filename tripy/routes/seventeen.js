var express = require('express');
var router = express.Router();

var mysql = require('mysql');


var passport = require('passport');


var con =require("../db/index.js")


router.get('/', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.render('test/photo', { title: '사진등록',
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
    loginMessage : "로그인후 작성해 접속해주시길 바랍니다."
    });
  }else{
  res.render('login/login', {
    title: "로그인후 이용이 가능합니다.",
    kakaoBtn : "카카오 로그인",
    loginStatus  : false
    
    });
}
});


//게시글 등록 라우터
router.post('/writepost', function(req, res) {
    var moment = require('moment');
    var nowTime = moment().format('YYYY-MM-DD HH:mm:ss'); 
    console.log(req);
    var query = 'INSERT INTO SEVENTEEN_POST (NAME,ID,TITLE,BODY,IMG,REG_DATE)'+
     'VALUES (?,?,?,?,?,?)'
  
    var params =[req.body.name,req.body.id,req.body.title,
        req.body.body,req.body.img,nowTime];
  
    con.connection.query(query, params, function(err, rows, fields) {
        if(err){
          console.log(err);
        }else{
          console.log(rows.inster);
        }
      });
      
      res.send({result:true});
  
  });

  
  router.post('/getAllpost', function(req, res) {

    var query = 
    'SELECT SEQ,NAME,TITLE,REG_DATE FROM SEVENTEEN_POST ORDER BY REG_DATE DESC';
    
    con.connection.query(query, function(err, rows, fields) {
        if(err){
          console.log(err);
          console.log(rows);
          res.send({rows,result:false});
       }else{
          console.log(rows.inster);
          console.log(rows);

          res.send({rows,result:true});
          };
      });
  
  });

  router.post('/getpost', function(req, res) {

    var query = 
    'SELECT NAME,TITLE,REG_DATE,BODY FROM SEVENTEEN_POST WHERE SEQ=?';

    var params =[req.body.seq];
    
    con.connection.query(query, params, function(err, rows, fields) {
        if(err){
          console.log(err);
          console.log(rows);
          res.send({rows,result:false});
       }else{
          console.log(rows.inster);
          console.log(rows);

          res.send({rows,result:true});
          };
      });
  
  });

  //스크랩 비디오
router.post('/scrap_video', function(req, res) {
  var moment = require('moment');
  var nowTime = moment().format('YYYY-MM-DD HH:mm:ss'); 
  console.log(req);
  var query = 'INSERT INTO SEVENTEEN_SCRAP_VIDEO (ID,TITLE,NUM,NAME,URL,REG_DATE)'+
   'VALUES (?,?,?,?,?,?)'

  var params =[req.body.id,req.body.title,req.body.num,
      req.body.name,req.body.url,nowTime];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        console.log(err);
      }else{
        console.log(rows.inster);
        res.send({result:true});
      }
    });
    

});

router.post('/getscrap_video', function(req, res) {

  var query = 
  'SELECT EXISTS (SELECT SEQ FROM SEVENTEEN_SCRAP_VIDEO WHERE ID=? AND NUM=?) AS SUCCESS';
  var params =[req.body.id,req.body.num];
  
  console.log(params);
  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        console.log(err);
        console.log(rows);
        res.send({rows,result:false});
     }else{
        console.log(rows.inster);
        console.log(rows);

        res.send({rows,result:true});
        };
    });

});

router.post('/getscrap_allvideo', function(req, res) {

  var query = 
  'SELECT * FROM SEVENTEEN_SCRAP_VIDEO WHERE ID = ?';
  var params =[req.body.id];
  
  console.log(params);
  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        console.log(err);
        console.log(rows);
        res.send({rows,result:false});
     }else{
        console.log(rows.inster);
        console.log(rows);

        res.send({rows,result:true});
        };
    });

});

router.post('/delete_scrap_video', function(req, res) {

  var query = 
  'DELETE FROM SEVENTEEN_SCRAP_VIDEO WHERE ID=? AND NUM=?';
  var params =[req.body.id,req.body.num];
  
  console.log(params);
  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        console.log(err);
        console.log(rows);
        res.send({rows,result:false});
     }else{
        console.log(rows.inster);
        console.log(rows);

        res.send({rows,result:true});
        };
    });

});




  //스크랩 문장
  router.post('/scrap_sentence', function(req, res) {
    var moment = require('moment');
    var nowTime = moment().format('YYYY-MM-DD HH:mm:ss'); 
    console.log(req);
    var query = 'INSERT INTO SEVENTEEN_SCRAP_SENTENCE (ID,VNUM,NUM,KOREAN,ENGLISH,REG_DATE,TITLE)'+
     'VALUES (?,?,?,?,?,?,?)'
  
    var params =[req.body.id,req.body.vnum,req.body.num,
        req.body.korean,req.body.english,nowTime,req.body.title];
  
    con.connection.query(query, params, function(err, rows, fields) {
        if(err){
          console.log(err);
        }else{
          console.log(rows.inster);
          res.send({result:true});
        }
      });
      
  });

  router.post('/delete_scrap_sentence', function(req, res) {

    var query = 
    'DELETE FROM SEVENTEEN_SCRAP_SENTENCE WHERE ID=? AND NUM=? AND VNUM=?';
    var params =[req.body.id,req.body.num,req.body.vnum];
    
    console.log(params);
    con.connection.query(query, params, function(err, rows, fields) {
        if(err){
          console.log(err);
          console.log(rows);
          res.send({rows,result:false});
       }else{
          console.log(rows.inster);
          console.log(rows);
  
          res.send({rows,result:true});
          };
      });
  
  });

  router.post('/all_scrap_sentence', function(req, res) {

    var query = 
    'SELECT * FROM SEVENTEEN_SCRAP_SENTENCE WHERE ID=?';
    var params =[req.body.id];
    
    console.log(params);
    con.connection.query(query, params, function(err, rows, fields) {
        if(err){
          console.log(err);
          console.log(rows);
          res.send({rows,result:false});
       }else{
          console.log(rows.inster);
          console.log(rows);
  
          res.send({rows,result:true});
          };
      });
  
  });

  router.post('/getscrap_sentence', function(req, res) {

    var query = 
    'SELECT EXISTS (SELECT SEQ FROM SEVENTEEN_SCRAP_SENTENCE WHERE ID=? AND NUM=? AND VNUM=?) AS SUCCESS';
    var params =[req.body.id,req.body.num,req.body.vnum];
    
    console.log(params);
    con.connection.query(query, params, function(err, rows, fields) {
        if(err){
          console.log(err);
          console.log(rows);
          res.send({rows,result:false});
       }else{
          console.log(rows.inster);
          console.log(rows);
  
          res.send({rows,result:true});
          };
      });
  
  });


  module.exports = router;
