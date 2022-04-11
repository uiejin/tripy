var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var passport = require('passport');

var con = require("../db/index.js")


/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.isAuthenticated()) {
    res.render('writepost', {
      title: '모임글 등록',
      attendText: "모집인원 자동 수락 여부",
      attendText1: "자동수락",
      attendText2: "선택수락",
      writeText1: "여행지선택",
      writeText2: "카테고리",
      writeText3: "모임 날짜",
      writeText4: "모임 시간",
      writeText5: "모집 인원",
      writeText6: "모집 장소",
      writeText7: "참고 링크",
      writeText8: "연락처",
      writeText9: "제목",
      writeText10: "내용을 입력하세요",
      writeText11: "# 태그를 입력하세요. 쉼표로 구분 가능합니다",
      writeText12: "모임업적",
      locationText: "여행지를 선택하세요",
      cateText: "모임 주제를 선택하세요",
      placeText: "모임 장소를 선택하세요",
      dateText: "모임 일정을 선택하세요",
      achievementText: "모임 업적을 선택하세요",
      hideformText: "숨기기",
      openformText: "열기",
      backBtnText: "뒤로 이동",
      applyBtnText: "등록하기",
      dropdown: "/image/icon/dropdown.png",
      dropup: "/image/icon/dropup.png",
      moreinfoText: "모임정보 입력",
      filterText: "추가설정",
      genderText: "성별제한",
      maleText: "남자만",
      femaleText: "여자만",
      ageText: "나이제한",
      selectage: "세",
      heaCountAlerText: "2명이상, 128명 이하의 인원만 모집이 가능합니다.",
      userId: req.user.ID,
      loginStatus: true,
      userImg: req.user.IMG,
      username: req.user.NAME,
      userGender: req.user.GENDER,
      userAge: getAge(req.user.BIRTHDAY),
      loginMessage: "로그인후 작성해 주시길 바랍니다.",
      writeErrorText: "누락된 항목이 있습니다. 작성후 입력해주세요.",
      modalTitle: "여행지를 선택해주세요",
      modalTitle2: "동행 목적을 선택해주세요",
      ageErrorMessage: "나이제한을 할때 자신의 나이를 포함한 범위로 선택해주세요",
      mapSearchText: "모임장소 검색",
      isAdmin: req.user.ISADMIN,
      mapAlertText: "이 장소로 선택하시겟습니까?"
    });
  } else {
    res.redirect('/login/login');
  }
});


router.get('/updatepost', function (req, res, next) {
  if (req.isAuthenticated()) {
    res.render('updatepost', {
      title: '모임글 등록',
      attendText: "모집인원 자동 수락 여부",
      attendText1: "자동수락",
      attendText2: "선택수락",
      writeText1: "여행지선택",
      writeText2: "카테고리",
      writeText3: "모임 날짜",
      writeText4: "모임 시간",
      writeText5: "모집 인원",
      writeText6: "모집 장소",
      writeText7: "참고 링크",
      writeText8: "연락처",
      writeText9: "제목",
      writeText10: "내용을 입력하세요",
      writeText11: "# 태그를 입력하세요. 쉼표로 구분 가능합니다",
      writeText12: "모임업적",
      locationText: "여행지를 선택하세요",
      cateText: "모임 주제를 선택하세요",
      placeText: "모임 장소를 선택하세요",
      dateText: "모임 일정을 선택하세요",
      achievementText: "모임 업적을 선택하세요",
      hideformText: "숨기기",
      openformText: "열기",
      backBtnText: "뒤로 이동",
      applyBtnText: "수정하기",
      dropdown: "/image/icon/dropdown.png",
      dropup: "/image/icon/dropup.png",
      moreinfoText: "모임정보 입력",
      filterText: "추가설정",
      genderText: "성별제한",
      maleText: "남자만",
      femaleText: "여자만",
      ageText: "나이제한",
      selectage: "세",
      heaCountAlerText: "명이상, 128명 이하의 인원만 모집이 가능합니다.",
      userId: req.user.ID,
      loginStatus: true,
      userImg: req.user.IMG,
      username: req.user.NAME,
      userGender: req.user.GENDER,
      userAge: getAge(req.user.BIRTHDAY),
      loginMessage: "로그인후 작성해 주시길 바랍니다.",
      errorMessage: "잘못된 접근입니다.",
      writeErrorText: "누락된 항목이 있습니다. 작성후 입력해주세요.",
      modalTitle: "여행지는 수정이 불가능합니다.",
      modalTitle2: "동행 목적을 선택해주세요",
      ageErrorMessage: "나이제한을 할때 자신의 나이를 포함한 범위로 선택해주세요",
      mapSearchText: "모임장소 검색",
      mapAlertText: "이 장소로 선택하시겟습니까?",
      isAdmin: req.user.ISADMIN,
    });
  } else {
    res.redirect('/login/login');
  }
});
router.get('/googlemap', function (req, res, next) {

  res.render('googlemap', {
  });

});

function getAge(userAge) {
  var nowDay = new Date();
  var birthday = new Date(userAge);


  var age = nowDay.getFullYear() - birthday.getFullYear();
  var month = nowDay.getMonth() - birthday.getMonth();

  return month < 0 || (month === 0 && nowDay.getDate() < birthday.getDate()) ?
    age : (age) + 1
}


//게시글 등록 라우터
router.get('/writepost', function (req, res) {
  var location = req.query.locationText;

  var moment = require('moment');
  var nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
  var placeText = req.query.placeText;

  var insertSeq = null;
  var query = "";
  var params = ""
  if((req.query.achievementSEQ.length > 0 && req.query.isachievement) || (req.query.achievementSEQ != "" && req.query.isachievement)){
    query = 'INSERT INTO PT_ACCOMPANYBOARD_POST (WRITER, REG_DATE, WRITER_COUNTRY,' +
    'COUNTRY_CODE, AREA_CODE, CATEGORY, MEET_DATE, MEET_TIME, HEADCOUNT,' +
    'PLACE, SOURCE, CONTACT, TITLE, CONTENTS, LIMIT_AGE_MIN, LIMIT_AGE_MAX, LIMIT_GENDER,' +
    ' AUTOPARTION, LATITUDE, LONGITUDE, ACHIEVENENTSEQ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

    params = [req.query.id, nowTime, req.query.writerCountry, req.query.locationText, req.query.locationText2, req.query.cateText,
    req.query.meetDateText, req.query.meetTimeText, req.query.headCountText, placeText, req.query.sourceText,
    req.query.contactText, req.query.titleText, req.query.contentText,
    req.query.limitAgeMin, req.query.limitAgeMax, req.query.limitGender,
    req.query.autoparticipation, req.query.latitude, req.query.longitude, req.query.achievementSEQ];
  }
  else
  {
    query = 'INSERT INTO PT_ACCOMPANYBOARD_POST (WRITER, REG_DATE, WRITER_COUNTRY,' +
    'COUNTRY_CODE, AREA_CODE, CATEGORY, MEET_DATE, MEET_TIME, HEADCOUNT,' +
    'PLACE, SOURCE, CONTACT, TITLE, CONTENTS, LIMIT_AGE_MIN, LIMIT_AGE_MAX, LIMIT_GENDER,' +
    ' AUTOPARTION, LATITUDE, LONGITUDE) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

    params = [req.query.id, nowTime, req.query.writerCountry, req.query.locationText, req.query.locationText2, req.query.cateText,
    req.query.meetDateText, req.query.meetTimeText, req.query.headCountText, placeText, req.query.sourceText,
    req.query.contactText, req.query.titleText, req.query.contentText,
    req.query.limitAgeMin, req.query.limitAgeMax, req.query.limitGender,
    req.query.autoparticipation, req.query.latitude, req.query.longitude];
  }
  con.connection.query(query, params, function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.send({ result: false });
    } else {
      insertSeq = rows.insertId;
      console.log(rows.inster);
    }
  });

  res.send({ result: true });

});

//게시글 업데이트 라우터
router.get('/updatemypost', function (req, res) {
  var location = req.query.locationText;

  var moment = require('moment');
  var nowTime = moment().format('YYYY-MM-DD HH:mm:ss');

  var placeText = req.query.placeText;


  var query = 'UPDATE PT_ACCOMPANYBOARD_POST SET WRITER=?, MODIFY_DATE=?, WRITER_COUNTRY=?,' +
    'COUNTRY_CODE=?, AREA_CODE=?, CATEGORY=?, MEET_DATE=?, MEET_TIME=?, HEADCOUNT=?,' +
    'PLACE=?, SOURCE=?, CONTACT=?, TITLE=?, CONTENTS=?, LIMIT_AGE_MIN=?, LIMIT_AGE_MAX=?, LIMIT_GENDER=?,' +
    ' AUTOPARTION=?, LATITUDE=?, LONGITUDE=? WHERE NO=? AND WRITER=?'

  var params = [req.query.id, nowTime, req.query.writerCountry, req.query.locationText, req.query.locationText2, req.query.cateText,
  req.query.meetDateText, req.query.meetTimeText, req.query.headCountText, placeText, req.query.sourceText,
  req.query.contactText, req.query.titleText, req.query.contentText,
  req.query.limitAgeMin, req.query.limitAgeMax, req.query.limitGender,
  req.query.autoparticipation, req.query.latitude, req.query.longitude, req.query.no, req.query.id];

  con.connection.query(query, params, function (err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      console.log(rows.inster);
    }
  });

  res.send({ result: true });

});

router.get('/deletepost', function (req, res) {

  var query = 'UPDATE PT_ACCOMPANYBOARD_POST SET IS_DELETE=1 WHERE NO=? AND WRITER=?';

  var params = [req.query.no, req.query.id];

  con.connection.query(query, params, function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.send({ result: false });
    } else {
      console.log(rows.inster);
      res.send({ rows, result: true });
    }
  });
});

router.get('/getarea', function (req, res) {

  var query = 'SELECT * FROM PT_AREA WHERE COUNTRY = ? ORDER BY AREA_CODE ASC ';

  var params = [req.query.country];

  con.connection.query(query, params, function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.send({ result: false });
    } else {
      console.log(rows.inster);
      res.send({ rows, result: true });
    }
  });

});

router.get('/getcategory', function (req, res) {

  var query = 'SELECT * FROM PT_CATEGORY';
  con.connection.query(query, function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.send({ result: false });
    } else {
      console.log(rows.inster);
      res.send({ rows, result: true });
    }
  });
});


router.get('/getareaachievements', function (req, res) {

  var query = 'SELECT T1.SEQ, T1.TITLE, T1.POINT, T1.EXP, T1.MAIN_IMG, T2.TYPE_NAME, ' +
  '(SELECT AREA FROM PT_AREA  WHERE T1.AREA_TYPE = SEQ) AS AREA_NAME, ' +
  '(SELECT EXISTS (SELECT SEQ FROM PT_ACHIEVEMENT_USER_SUCCESS WHERE ACHIEVEMENT_SEQ = T1.SEQ AND USER_SEQ = ?)) AS ISCOMPLETE, ' +
  '(SELECT (6371*acos(cos(radians(?))*cos(radians(T1.LATITUDE))*cos(radians(T1.LONGITUDE) ' +
  '-radians(?))+sin(radians(?))*sin(radians(T1.LATITUDE))))) AS DISTANCE ' +
  'FROM PT_ACHIEVEMENT T1, PT_ACHIEVEMENT_TYPE T2, PT_AREA T3 ' +
  'WHERE T2.SEQ = T1.TYPE AND T1.TYPE = 3 AND T1.AREA_TYPE = T3.SEQ AND T3.AREA_CODE = ? ' +
  'ORDER BY DISTANCE' ;

  params = [req.user.SEQ, req.query.latX, req.query.longY, req.query.latX, req.query.areacode];
    

  con.connection.query(query, params, function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.send({ result: false });
    } else {
      console.log(rows.inster);
      res.send({ rows, result: true });
    }
  });
});

module.exports = router;
