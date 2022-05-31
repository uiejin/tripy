var express = require('express');
var router = express.Router();

var mysql = require('mysql');


var passport = require('passport');


var con =require("../db/index.js")

router.get('/', function(req, res, next) {
    if (req.isAuthenticated()) {
      res.render('board/managiment', { title: '모임인원 관리',
        dateText : "모집일",
        timeText : "모임 시간",
        headCountText : "모임 인원",
        placeText : "모임 장소",
        areaText : "모임 지역",
        profileText : "모임요청",
        profileText2: "참가원",
        profileText3: "탈퇴원",
        modifyBtnText: "모임글 수정",
        viewPlaceText: "모임 장소 보기",
        appyText : "수락",
        errorMessage : "잘못된 접근입니다.",
        appyConfirmText : "님이 모임에 참가 하는것을 수락하겠습니까?",
        successConfirmText : "님 의 참가를 수락하였습니다.",
        refuseConfirmText : "님의 참가 신청을 거절하겠습니까?",
        maxHeadCountText : "모집인원이 다 찼습니다. 추가적인 인원을 모집하고싶으시면 인원제한을 늘려주세요.",
        changeHeadCountText : "모임인원 변경",
        changePlaceText : "모임장소 변경",
        refuseText : "거절",
        userId : req.user.ID,
        userImg : req.user.IMG,
        username : req.user.NAME,
        isAdmin : req.user.ISADMIN,
      userLevel : req.user.LEVEL,
      userExp : req.user.EXP,
      userGold : req.user.GOLD,
        loginStatus  : true
      });
    }else{
      res.redirect('/login/login');
    }
  });

  
  router.get('/changeheadcount', function(req, res, next) {
    if (req.isAuthenticated()) {
      res.render('board/meeting/changeheadcount', { title: '모임인원수를 입력해주세요.',
      heaCountAlerText : "명이상, 128명 이하의 인원만 모집이 가능합니다.",
      successInfo : "인원을 변경했습니다.",
      errorInfo : "오류가 발생했습니다. 다시시도해 주세요.",
      errorMessage : "잘못된 접근입니다.",
      userId : req.user.ID,
      userName : req.user.NAME,
      loginStatus  : true,
      saveText : "인원 변경 하기",
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

  
  router.get('/changeplace', function(req, res, next) {
    if (req.isAuthenticated()) {
      res.render('board/meeting/changeplace', { title: '모임장소 변경.',
      mapSearchText : "모임장소 검색",
      mapAlertText : "이 장소로 선택하시겟습니까?",
      errorInfo : "오류가 발생했습니다. 다시시도해 주세요.",
      errorMessage : "잘못된 접근입니다.",
      successInfo : "모임장소를 변경했습니다.",
      userId : req.user.ID,
      userName : req.user.NAME,
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


  router.get('/getheadcount', function(req, res) {

    var query = 'SELECT HEADCOUNT_NOW, HEADCOUNT FROM PT_ACCOMPANYBOARD_POST WHERE WRITER = ? AND NO = ?';
  
    var params =[req.query.writer, req.query.no];
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

  router.get('/updateheadcount', function(req, res) {
    
  var moment = require('moment');
  var nowTime = moment().format('YYYY-MM-DD HH:mm:ss'); 

    var query = 'UPDATE PT_ACCOMPANYBOARD_POST SET HEADCOUNT = ?, MODIFY_DATE=? WHERE WRITER = ? AND NO = ?';
  
    var params =[req.query.headCount,nowTime, req.query.writer, req.query.no];
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
  
  router.get('/getplace', function(req, res) {
    
    var moment = require('moment');
    var nowTime = moment().format('YYYY-MM-DD HH:mm:ss'); 
  
    var query = 'SELECT PLACE,LATITUDE, LONGITUDE FROM PT_ACCOMPANYBOARD_POST WHERE WRITER = ? AND NO = ?';
    
      var params =[req.query.writer, req.query.no];
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
  
  router.get('/updatplace', function(req, res) {
    
    var moment = require('moment');
    var nowTime = moment().format('YYYY-MM-DD HH:mm:ss'); 

    var place = req.query.place;
  
    var query = 'UPDATE PT_ACCOMPANYBOARD_POST SET PLACE=?,LATITUDE=?, LONGITUDE=?, MODIFY_DATE=? WHERE WRITER = ? AND NO = ?';
    
      var params =[place, req.query.lat, req.query.long, nowTime, req.query.writer, req.query.no];
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