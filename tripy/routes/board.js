var express = require('express');
var router = express.Router();

var mysql = require('mysql');


var passport = require('passport');


var con =require("../db/index.js")

router.get('/partyboard', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.render('board/partyboard', { title: '동행 찾기',
      searchText : "여행지를 선택해주세요",
      writeText1 : "여행지",
      writeText2 : "모임주제",
      writeText3 : "여행시작일",
      writeText4 : "여행종료일",
      locationText : "여행지를 선택하세요",
      cateText : "모임 주제를 선택하세요",
      selectdateText : "여행 시작 일자를 선택해주세요",
      selectdateText2 : "여행 종료 일자를 선택해주세요",
      modalTitle : "여행지를 선택해주세요",
      modalTitle2 : "동행 목적을 선택해주세요",
      searchText : "제목을 검색 하세요",
      moreinfoText : "상세검색",
      filterText : "추가설정",
      genderText : "성별제한",
      fillHeadCountText : "모집마감",
      maleText : "남자만",
      femaleText : "여자만",
      ageText : "나이제한",
      dropdown : "/image/icon/dropdown.png",
      dropup : "/image/icon/dropup.png",
      nullparty : "모집글이 없습니다",
      userId : req.user.ID,
      username : req.user.NAME,
      userImg : req.user.IMG,
      loginStatus  : true,
      userAge : getAge(req.user.BIRTHDAY),
      userGender : req.user.GENDER,
      isAdmin : req.user.ISADMIN,
      userLevel : req.user.LEVEL,
      userExp : req.user.EXP,
      userGold : req.user.GOLD,
      loginMessage : "로그인후 작성해 주시길 바랍니다.",
    });
  }else{
      res.render('board/partyboard', { title: '동행 찾기',
      searchText : "여행지를 선택해주세요",
      writeText1 : "여행지",
      writeText2 : "모임주제",
      writeText3 : "여행시작일",
      writeText4 : "여행종료일",
      locationText : "여행지를 선택하세요",
      cateText : "모임 주제를 선택하세요",
      selectdateText : "여행 시작 일자를 선택해주세요",
      selectdateText2 : "여행 종료 일자를 선택해주세요",
      modalTitle : "여행지를 선택해주세요",
      modalTitle2 : "동행 목적을 선택해주세요",
      searchText : "제목을 검색 하세요",
      moreinfoText : "상세검색",
      filterText : "추가설정",
      genderText : "성별제한",
      fillHeadCountText : "모집마감",
      maleText : "남자만",
      femaleText : "여자만",
      ageText : "나이제한",
      dropdown : "/image/icon/dropdown.png",
      dropup : "/image/icon/dropup.png",
      nullparty : "모집글이 없습니다",
      userId : null,
      loginStatus  : false,
      userLevel : null,
      userExp :  null,
      userGold : null,
      userAge : null,
      userGender : null,
      username : null,
      userImg : null,
      isAdmin : req.user.ISADMIN,
      userLevel : req.user.LEVEL,
      userExp : req.user.EXP,
      userGold : req.user.GOLD,
      loginMessage : "로그인후 작성해 주시길 바랍니다.",
    });
  }
});

router.get('/searchpost', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.render('board/searchpost', { title: '동행 찾기',
      fillHeadCountText : "모집마감",
      maleText : "남자만",
      femaleText : "여자만",
      nullparty : "모집글이 없습니다",
      userId : req.user.ID,
      loginStatus  : true,
      userAge : getAge(req.user.BIRTHDAY),
      userGender : req.user.GENDER,
      isAdmin : req.user.ISADMIN,
      userLevel : req.user.LEVEL,
      userExp : req.user.EXP,
      userGold : req.user.GOLD,
      loginMessage : "로그인후 작성해 주시길 바랍니다.",
    });
  }else{
      res.render('board/searchpost', { title: '동행 찾기',
      filterText : "추가설정",
      genderText : "성별제한",
      fillHeadCountText : "모집마감",
      maleText : "남자만",
      femaleText : "여자만",
      nullparty : "모집글이 없습니다",
      userId : null,
      loginStatus  : false,
      userLevel : null,
      userExp :  null,
      userGold : null,
      userAge : null,
      userGender : null,
      isAdmin : false,
      loginMessage : "로그인후 작성해 주시길 바랍니다.",
    });
  }
  });

  router.get('/read', function(req, res, next) {
    if (req.isAuthenticated()) {
      res.render('board/read', { title: 'qq',
        dateText : "모집일",
        timeText : "모임 시간",
        headCountText : "모임 인원",
        placeText : "모임 장소",
        areaText : "모임 지역",
        cateText : "모임 목적",
        headCountBtnText : "모임 인원 관리",
        headCountBtnState : "모임 신청",
        headCountBtnState2 : "모임 대기",
        headCountBtnState3 : "모임 인원보기",
        headCountBtnState4 : "참가 거절",
        headCountBtnStateMax : "참가 마감",
        headCountBtnConfirm : "모임에 참가 하겠습니까?",
        headCountBtnConfirm2 : "참기 신청을 완료했습니다",
        deleteBtnConfirm : "게시물을 삭제하겠습니까?",
        contentText : "",
        tagText : "해쉬태그",
        profileText : "작성자 프로필",
        profileText2: "",
        replyText: "댓글",
        replyBtnText1: "댓글 작성",
        replyBtnText2: "작성 완료",
        modifyBtnText: "모임글 수정",
        deleteBtnText: "모임글 삭제",
        rereplyBtnText1: "답글 작성",
        errorMessage: "잘못된 요청입니다.",
        userId : req.user.ID,
        username : req.user.NAME,
        userImg : req.user.IMG,
        loginStatus  : true,
        userGender : req.user.GENDER,
        isAdmin : req.user.ISADMIN,
      userLevel : req.user.LEVEL,
      userExp : req.user.EXP,
      userGold : req.user.GOLD,
        userAge : getAge(req.user.BIRTHDAY),
      });
    }else{
      res.render('board/read', { title: 'qq',
        dateText : "모집일",
        timeText : "모임 시간",
        headCountText : "모임 인원",
        placeText : "모임 장소",
        areaText : "모임 지역",
        cateText : "모임 목적",
        headCountBtnText : "모임 인원 관리",
        headCountBtnState : "모임 신청",
        headCountBtnState2 : "모임 대기",
        headCountBtnState3 : "모임 인원보기",
        headCountBtnState4 : "참가 거절",
        headCountBtnStateMax : "참가 마감",
        headCountBtnConfirm : "모임에 참가 하겠습니까?",
        headCountBtnConfirm2 : "참기 신청을 완료했습니다",
        deleteBtnConfirm : "게시물을 삭제하겠습니까?",
        contentText : "",
        tagText : "해쉬태그",
        profileText : "작성자 프로필",
        profileText2: "",
        replyText: "댓글",
        replyBtnText1: "댓글 작성",
        replyBtnText2: "작성 완료",
        modifyBtnText: "모임글 수정",
        deleteBtnText: "모임글 삭제",
        rereplyBtnText1: "답글 작성",
        errorMessage: "잘못된 요청입니다.",
        userId : null,
        username : null,
        userImg : null,
        loginStatus  : false,
      userLevel : null,
      userExp :  null,
      userGold : null,
        userGender : "nothing",
        userAge : null,
        isAdmin : false
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


  router.get('/getpost', function(req, res) {
  
    var no = req.query.no;
  
    var query = 'SELECT T1.*, (SELECT TITLE FROM PT_ACHIEVEMENT WHERE SEQ = T1.ACHIEVENENTSEQ) AS ACHIEVEMENT_TITLE,' +
    'T2.AREA FROM PT_ACCOMPANYBOARD_POST T1, PT_AREA T2 WHERE T1.NO = ? AND T1.IS_DELETE = 0 AND T1.AREA_CODE = T2.AREA_CODE';
  
    var params =[no];
  
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
  router.get('/getpostread', function(req, res) {
  
    var no = req.query.no;
  
    var query = 'SELECT T1.WRITER, T1.REG_DATE, T1.MODIFY_DATE, T1.WRITER_COUNTRY, T1.COUNTRY_CODE, T1.AREA_CODE, T1.MEET_DATE, T1.MEET_TIME, T1.HEADCOUNT,' +
    ' T1.HEADCOUNT_NOW, T1.SOURCE, T1.CONTACT, T1.TITLE, T1.CONTENTS, T1.LIMIT_AGE_MIN,'+
    '(SELECT TITLE FROM PT_ACHIEVEMENT WHERE SEQ = T1.ACHIEVENENTSEQ) AS ACHIEVEMENT_TITLE, ' +  
    ' T1.LIMIT_AGE_MAX, T1.LIMIT_GENDER, T1.AUTOPARTION, T1.ACHIEVENENTSEQ, T2.AREA, T3.CATEGORY FROM PT_ACCOMPANYBOARD_POST T1, PT_AREA T2, PT_CATEGORY T3 WHERE T1.NO = ? AND T1.IS_DELETE = 0 AND T1.AREA_CODE = T2.AREA_CODE AND T1.CATEGORY = T3.SEQ';
  
    var params =[no];
  
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

  router.post('/getpostreads', function(req, res) {
  
    var no = req.query.no;
  
    var query = 'SELECT T1.WRITER, T1.REG_DATE, T1.MODIFY_DATE, T1.WRITER_COUNTRY, T1.COUNTRY_CODE, T1.AREA_CODE, T1.MEET_DATE, T1.MEET_TIME, T1.HEADCOUNT,' +
    ' T1.HEADCOUNT_NOW, T1.SOURCE, T1.CONTACT, T1.TITLE, T1.CONTENTS, T1.LIMIT_AGE_MIN,'+
    '(SELECT TITLE FROM PT_ACHIEVEMENT WHERE SEQ = T1.ACHIEVENENTSEQ) AS ACHIEVEMENT_TITLE, ' +  
    ' T1.LIMIT_AGE_MAX, T1.LIMIT_GENDER, T1.AUTOPARTION, T1.ACHIEVENENTSEQ, T2.AREA, T3.CATEGORY FROM PT_ACCOMPANYBOARD_POST T1, PT_AREA T2, PT_CATEGORY T3 WHERE T1.NO = ? AND T1.IS_DELETE = 0 AND T1.AREA_CODE = T2.AREA_CODE AND T1.CATEGORY = T3.SEQ';
  
    var params =[no];
  
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




  router.get('/getreplyProfile', function(req, res) {
  
  
    var query = 'SELECT NAME, IMG FROM PT_USER WHERE ID = ?';
  
    var params =[req.query.userId];
  
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

  router.get('/getpostarea', function(req, res) {
  
  
    var query = 'SELECT COUNTRY, AREA FROM PT_AREA WHERE AREA_CODE = ?';
  
    var params =[req.query.areacode];
  
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

  router.get('/sendreply', function(req, res) {
    var moment = require('moment');
    var nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
    var no = req.query.no;

    var query = 'INSERT INTO PT_ACCOMPANYBOARD_REPLY (BOARD_ID, DEPTH, BUNDLE_ID,' +
    'BUNDLE_ORDER, USER_ID, REPLY, REG_DATE) VALUES (?,?,?,?,?,?,?)';
  
    var params =[no, 1, null, 1, req.query.userId, req.query.reply, nowTime];
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

  router.get('/sendrereply', function(req, res) {
    var moment = require('moment');
    var nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
    var no = req.query.no;

    var query = 
    'INSERT INTO PT_ACCOMPANYBOARD_REPLY (BOARD_ID, DEPTH, BUNDLE_ID,' +
    'BUNDLE_ORDER, USER_ID, REPLY, REG_DATE) VALUES (?,?,?,?,?,?,?)';
    var params =[no, 2, req.query.boardId, 1, req.query.userId, req.query.reply, nowTime];
    console.log(req.query.userId);
    con.connection.query(query, params, function(err, rows, fields) {
        if(err){
          console.log(err);
          console.log(rows);
          res.send({rows,result:false});

  
        }else{
          console.log(rows.inster);
          console.log(rows);

          var query = 'UPDATE PT_ACCOMPANYBOARD_REPLY SET BUNDLE_ORDER = BUNDLE_ORDER+1 WHERE BUNDLE_ID = ? AND BUNDLE_ORDER >= 1'
          var params =[req.query.boardId];
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
  
  });

  router.get('/getwriterinfo', function(req, res) {
    var writer = req.query.writer;

    var query = 'SELECT SEQ, NAME, IMG, BIRTHDAY, GENDER FROM PT_USER WHERE ID = ?';
  
    var params =[writer];
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

  
  router.get('/getwriterinfono', function(req, res) {
    var writer = req.query.no;

    var query = 'SELECT T1.SEQ, T1.NAME, T1.IMG, T1.BIRTHDAY, T1.GENDER FROM PT_USER T1, PT_ACCOMPANYBOARD_POST T2 WHERE T1.ID = T2.WRITER AND T2.NO = ?';
  
    var params =[writer];
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

  router.get('/getreply', function(req, res) {
    var no = req.query.no;

    var query = 'SELECT T1.IMG, T1.NAME, T2.* FROM PT_USER T1, PT_ACCOMPANYBOARD_REPLY T2 WHERE T2.BOARD_ID=? AND T2.USER_ID = T1.ID ORDER BY IF(ISNULL(T2.BUNDLE_ID),T2.REPLY_ID, T2.BUNDLE_ID), T2.REG_DATE';
  
    var params =[no];
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

  router.get('/searchparty', function(req, res) {

    var areacode = req.query.areacode;
    var category = req.query.category;
    var startdate = req.query.startdate;
    var enddate = req.query.enddate;
    var text = req.query.text;
    var age = req.query.age;
    var gender = req.query.gender;


    var query = "SELECT T1.WRITER,T1.NO,T1.MEET_DATE,T1.MEET_TIME,T1.HEADCOUNT,T1.HEADCOUNT_NOW, T1.TITLE, T1.LIMIT_GENDER, T1.ACHIEVENENTSEQ, T3.AREA,T4.CATEGORY,T4.SEQ, " +
    '(SELECT TITLE FROM PT_ACHIEVEMENT WHERE SEQ = T1.ACHIEVENENTSEQ) AS ACHIEVEMENT_TITLE, ' +  
     "T2.NAME FROM PT_ACCOMPANYBOARD_POST T1, PT_USER T2, PT_AREA T3, PT_CATEGORY T4 WHERE T1.WRITER = T2.ID AND T1.AREA_CODE = T3.AREA_CODE AND T1.CATEGORY = T4.SEQ AND T1.IS_DELETE = 0";
    
     var params = new Array;


    if(text != ""){
      var query2 = " AND T1.TITLE LIKE CONCAT('%', ?,  '%')";
      
      query = query + query2;

      params.push(text);
    }else{

    }
    if(areacode != ""){
        var query2 = " AND T1.AREA_CODE = ?";

      query = query + query2;

      params.push(areacode);
      
    }else{
    }
    if(category != ""){
        var query2 = " AND T1.CATEGORY = ?";

      query = query + query2;

      params.push(category);
    }else{

    }
    if(startdate != ""){
        var query2 = " AND T1.MEET_DATE >= ? AND T1.MEET_DATE <= ?";

      query = query + query2;

      params.push(startdate);
      params.push(enddate);
    }else{

    }

    if(age){
      var query2 = " AND T1.LIMIT_AGE_MIN <= ? AND T1.LIMIT_AGE_MAX >=?";
      
      query = query + query2;

      params.push(age,age);
    }
    if(gender !=""){
      var query2 = " AND T1.LIMIT_GENDER IN (?,?)";

      query = query + query2;

      params.push(gender);
      params.push("nothing");
    }else{
      var query2 = " AND T1.LIMIT_GENDER IN (?)";

      query = query + query2;

      params.push("nothing");
    }

    var query2 = " ORDER BY T1.MEET_DATE DESC";
    query = query + query2;

    console.log("query =" +query);
    
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

  router.get('/attendparty', function(req, res) {
    var moment = require('moment');
    var nowTime = moment().format('YYYY-MM-DD HH:mm:ss');

    var query = 
    'INSERT INTO PT_ACCOMPANYBOARD_ATTEND (BOARD_ID, ID, ATTEND_DATE,' +
    'ATTEND_STATE) VALUES (?,?,?,?)';
    var params =[req.query.boardId, req.query.userId, nowTime, req.query.attendState];
    con.connection.query(query, params, function(err, rows, fields) {
        if(err){
          console.log(err);
          console.log(rows);
          res.send({rows,result:false});
       }else{
          console.log(rows.inster);
          console.log(rows);

          if(req.query.attendState == 1){
            var query = 
            'UPDATE PT_ACCOMPANYBOARD_POST SET HEADCOUNT_NOW = HEADCOUNT_NOW +1 WHERE NO = ?';
            var params =[req.query.boardId];
            con.connection.query(query, params, function(err, rows, fields) {
              if(err){
                console.log(err);
                console.log(rows);
                res.send({rows,result:false});
            }

          });
        }

          res.send({rows,result:true});
          };
      });
  
  });

  router.get('/attenduserstate', function(req, res) {

    var query = 
    'SELECT ATTEND_STATE FROM PT_ACCOMPANYBOARD_ATTEND WHERE BOARD_ID =? AND  ID=?';
    var params =[req.query.boardId, req.query.userId];
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

  router.get('/getallattenduserstate', function(req, res) {

    var query = 
    'SELECT T1.IMG, T1.NAME, T1.SEQ, T1.BIRTHDAY, T1.GENDER, T2.* FROM PT_USER T1, PT_ACCOMPANYBOARD_ATTEND T2 WHERE T2.BOARD_ID =? AND T2.ID = T1.ID';
    
    var params =[req.query.boardId];
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


  router.get('/attenduserparty', function(req, res) {

    var query = 
    'UPDATE PT_ACCOMPANYBOARD_ATTEND SET ATTEND_STATE = ? WHERE ATTEND_SEQ = ?';
    
    var params =[1,req.query.attendSeq];
    con.connection.query(query, params, function(err, rows, fields) {
        if(err){
          console.log(err);
          console.log(rows);
          res.send({rows,result:false});
       }else{
          console.log(rows.inster);
          console.log(rows);
          
            var query = 
            'UPDATE PT_ACCOMPANYBOARD_POST SET HEADCOUNT_NOW = HEADCOUNT_NOW +1 WHERE NO = ?';
            var params =[req.query.boardId];
            con.connection.query(query, params, function(err, rows, fields) {

              if(err){
                console.log(err);
                console.log(rows);
                res.send({rows,result:false});
            }

          });

          res.send({rows,result:true});
          };
      });
  
  });

  router.get('/refuseuserparty', function(req, res) {

    var query = 
    'UPDATE PT_ACCOMPANYBOARD_ATTEND SET ATTEND_STATE = ? WHERE ATTEND_SEQ = ?';
    
    var params =[3,req.query.attendSeq];
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

  
router.get('/searchachievementitem', function (req, res) {

  var query;
  var params;
  var userSEQ;
  
  if (req.isAuthenticated()) {
    userSEQ = req.user.SEQ;
  }
  else{
    userSEQ = 0;
  }
      query = 'SELECT T1.SEQ, T1.TITLE, T1.POINT, T1.EXP, T1.MAIN_IMG, ' +
          '(SELECT EXISTS (SELECT SEQ FROM PT_ACHIEVEMENT_USER_SUCCESS WHERE ACHIEVEMENT_SEQ = T1.SEQ AND USER_SEQ = ?)) AS ISCOMPLETE ' + 
          'FROM PT_ACHIEVEMENT T1 ' +
          'WHERE T1.SEQ = ? '
      params = [userSEQ, req.query.no];
  
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
