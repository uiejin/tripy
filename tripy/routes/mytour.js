var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var passport = require('passport');


var con =require("../db/index.js")

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.isAuthenticated()) {
  res.render('mytour/mytour', { title: '내 일정',
      findButton: '동행 만들기',
      searchButton: '혹은 동행 찾기',
      attendBoard: '참석한 모임글',
      writeBoard: '내가 작성한 모임글',
      prevBoard: '참가한 모임글',
      newBoard: '관련 최신글',
      moreBoard: '더보기',
      updateText: '일정 수정',
      deleteText: '일정삭제',
      fillHeadCountText : "모집마감",
      maleText : "남자만",
      femaleText : "여자만",
      ageText : "나이제한",
      headCountBtnState2 : "모임 대기",
      headCountBtnState3 : "모임 참가",
      headCountBtnState4 : "참가 거절",
      errorMessage : "잘못된 접근입니다.",
      userId : req.user.ID,
      username : req.user.NAME,
      userImg : req.user.IMG,
      loginStatus   : true,
      userGender : req.user.GENDER,
      userAge : getAge(req.user.BIRTHDAY),
      loginMessage : "로그인후 작성해 주시길 바랍니다."
  });
  }else{
    res.render('login/login', {
      title: "로그인후 이용이 가능합니다.",
      kakaoBtn : "카카오 로그인",
      loginStatus   : false
      
      });
  }

});

router.get('/registermytour', function(req, res, next) {
  if (req.isAuthenticated()) {
  res.render('mytour/registermytour', { title: '여행 일정 등록',
      dateText: '',
      locationText : "여행지를 선택하세요",
      selectdateText : "여행 시작 일자를 선택해주세요",
      selectdateText2 : "여행 종료 일자를 선택해주세요",
      backBtnText : "뒤로 이동",
      applyBtnText : "등록하기",
      writeText1 : "여행지선택",
      writeText2 : "여행 시작일",
      writeText3 : "여행 종료일",
      userId : req.user.ID,
      loginStatus  : true,
      userImg : req.user.IMG,
      username : req.user.NAME,
      loginMessage : "로그인후 작성해 주시길 바랍니다."
  });
  }else{
    res.render('login/login', {
      title: "로그인후 이용이 가능합니다.",
      kakaoBtn : "카카오 로그인",
      loginStatus  : false
      
      });

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


router.get('/registertour', function(req, res) {

  var moment = require('moment');
  var nowTime = moment().format('YYYY-MM-DD HH:mm:ss'); 


  var query = 'INSERT INTO PT_USER_TOUR (WRITER, AREA_CODE, START_DATE,' +
  'END_DATE, REG_DATE) VALUES (?,?,?,?,?)';

  var params =[req.query.id,req.query.areacode,req.query.startdate,req.query.enddate,nowTime];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        console.log(err);
      }else{
        console.log(rows.inster);
        
        res.send({result:true});
      }
    });
    

});

router.get('/getmytour', function(req, res) {

  var query = 'SELECT * FROM PT_USER_TOUR WHERE SEQ = ?';

  var params =[req.query.no];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        console.log(err);
        res.send({result:false});
      }else{
        console.log(rows.inster);
        
        res.send({rows,result:true});
      }
    });
});

router.get('/getareainfo', function(req, res) {

  var query = 'SELECT * FROM PT_AREA WHERE AREA_CODE = ?';

  var params =[req.query.areacode];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        console.log(err);
        res.send({result:false});
      }else{
        console.log(rows.inster);
        
        res.send({rows,result:true});
      }
    });
});

router.get('/getnewpost', function(req, res) {

  var query = 'SELECT T1.WRITER,T1.NO,T1.MEET_DATE,T1.MEET_TIME,T1.HEADCOUNT,T1.HEADCOUNT_NOW,T1.LIMIT_GENDER,T1.TITLE,T3.CATEGORY,T3.SEQ,' +
   'T2.NAME FROM PT_ACCOMPANYBOARD_POST T1, PT_USER T2, PT_CATEGORY T3 WHERE T1.AREA_CODE = ? AND T1.WRITER = T2.ID ' +  
  'AND T1.MEET_DATE >= ? AND T1.MEET_DATE <= ? AND T1.IS_DELETE = 0 AND T1.CATEGORY = T3.SEQ ORDER BY T1.REG_DATE DESC LIMIT 3';

  var params =[req.query.areacode,req.query.startdate,req.query.enddate];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        console.log(err);
      }else{
        console.log(rows.inster);
        
        res.send({rows,result:true});
      }
    });
    

});


router.get('/getnewpostnotarea', function(req, res) {

  var query = 'SELECT T1.WRITER,T1.NO,T1.MEET_DATE,T1.MEET_TIME,T1.HEADCOUNT,T1.HEADCOUNT_NOW,T1.LIMIT_GENDER,T1.TITLE,T3.CATEGORY,T3.SEQ,' +
   'T2.NAME, T4.AREA, T4.COUNTRY FROM PT_ACCOMPANYBOARD_POST T1, PT_USER T2, PT_CATEGORY T3, PT_AREA T4 WHERE T1.WRITER = T2.ID ' +  
  'AND T1.MEET_DATE >= ? AND T1.CATEGORY = T3.SEQ AND T1.IS_DELETE = 0 AND T1.AREA_CODE = T4.AREA_CODE ORDER BY T1.NO DESC LIMIT 3';

  var params =[req.query.nowdate];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        console.log(err);
      }else{
        console.log(rows.inster);
        
        res.send({rows,result:true});
      }
    });
    

});

router.get('/getmypost', function(req, res) {

  var query = 'SELECT T1.WRITER,T1.NO,T1.MEET_DATE,T1.MEET_TIME,T1.HEADCOUNT,T1.HEADCOUNT_NOW,T1.LIMIT_GENDER,T1.TITLE,T3.CATEGORY,T3.SEQ,' +
  'T2.NAME FROM PT_ACCOMPANYBOARD_POST T1, PT_USER T2, PT_CATEGORY T3 WHERE T1.WRITER = ? AND T1.AREA_CODE = ? AND T1.WRITER = T2.ID ' +  
 'AND T1.MEET_DATE >= ? AND T1.MEET_DATE <= ? AND T1.IS_DELETE = 0 AND T1.CATEGORY = T3.SEQ ORDER BY T1.REG_DATE DESC';

  var params =[req.query.writer,req.query.areacode,req.query.startdate,req.query.enddate];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        console.log(err);
      }else{
        console.log(rows.inster);
        
        res.send({rows,result:true});
      }
    });
    
 
});

router.get('/getmyparty', function(req, res) {

  
  var moment = require('moment');
  var nowTime = moment().format('YYYY-MM-DD HH:mm:ss');

  var query = 'SELECT T1.WRITER,T1.NO,T1.MEET_DATE,T1.MEET_TIME,T1.HEADCOUNT,T1.HEADCOUNT_NOW,T1.LIMIT_GENDER,T1.TITLE,T3.CATEGORY,T3.SEQ,T4.ATTEND_STATE, ' +
  'T2.NAME FROM PT_ACCOMPANYBOARD_POST T1, PT_USER T2, PT_CATEGORY T3, PT_ACCOMPANYBOARD_ATTEND T4 WHERE T1.AREA_CODE = ? AND T1.NO = T4.BOARD_ID AND T4.ID = ? ' +  
 'AND T1.WRITER = T2.ID AND T1.MEET_DATE >= ? AND T1.MEET_DATE <= ? AND T1.CATEGORY = T3.SEQ AND T1.IS_DELETE = 0 ORDER BY T1.REG_DATE DESC';

  var params =[req.query.areacode, req.query.userId, nowTime ,req.query.enddate];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        console.log(err);
      }else{
        console.log(rows.inster);
        
        res.send({rows,result:true});
      }
    });
    

});

router.get('/getallmypost', function(req, res) {

  var query = 'SELECT T1.WRITER,T1.NO,T1.MEET_DATE,T1.MEET_TIME,T1.HEADCOUNT,T1.HEADCOUNT_NOW,T1.LIMIT_GENDER,T1.TITLE,T3.CATEGORY,T3.SEQ,T4.AREA,T4.COUNTRY, ' +
  'T2.NAME FROM PT_ACCOMPANYBOARD_POST T1, PT_USER T2, PT_CATEGORY T3, PT_AREA T4  WHERE T1.WRITER = ? AND T1.WRITER = T2.ID AND ' +  
  'T1.CATEGORY = T3.SEQ AND T1.AREA_CODE = T4.AREA_CODE AND T1.IS_DELETE = 0 ORDER BY T1.MEET_DATE DESC';

  var params =[req.query.writer];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        console.log(err);
      }else{
        console.log(rows.inster);
        
        res.send({rows,result:true});
      }
    });
    
 
});

router.get('/getmypartyprev', function(req, res) {

  
  var moment = require('moment');
  var nowTime = moment().format('YYYY-MM-DD HH:mm:ss');

  var query = 'SELECT T1.WRITER,T1.NO,T1.MEET_DATE,T1.MEET_TIME,T1.HEADCOUNT,T1.HEADCOUNT_NOW,T1.LIMIT_GENDER,T1.TITLE,T3.CATEGORY,T3.SEQ,T4.ATTEND_STATE, ' +
  'T2.NAME FROM PT_ACCOMPANYBOARD_POST T1, PT_USER T2, PT_CATEGORY T3, PT_ACCOMPANYBOARD_ATTEND T4 WHERE T1.AREA_CODE = ? AND T1.NO = T4.BOARD_ID AND T4.ID = ? ' +  
 'AND T1.WRITER = T2.ID AND T1.MEET_DATE >= ? AND T1.MEET_DATE <= ? AND T1.CATEGORY = T3.SEQ AND T1.IS_DELETE = 0 ORDER BY T1.REG_DATE DESC';

  var params =[req.query.areacode, req.query.userId,req.query.startdate, nowTime];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        console.log(err);
      }else{
        console.log(rows.inster);
        
        res.send({rows,result:true});
      }
    });
    

});



module.exports = router;
