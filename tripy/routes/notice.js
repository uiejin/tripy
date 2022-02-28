var express = require('express');
var router = express.Router();
var con = require("../db/index.js")


/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.isAuthenticated()) {
    res.render('notice/notice', {
      title: '공지사항',
      findButton: '동행 만들기',
      searchButton: '혹은 동행 찾기',
      attendBoard: '',
      writeBoard: '내가 작성한 모임글',
      prevBoard: '참가한 모임글',
      newBoard: '관련 최신글',
      moreBoard: '더보기',
      updateText: '게시물 등록',
      deleteText: '일정삭제',
      fillHeadCountText: "모집마감",
      maleText: "남자만",
      femaleText: "여자만",
      ageText: "나이제한",
      headCountBtnState2: "모임 대기",
      headCountBtnState3: "모임 참가",
      headCountBtnState4: "참가 거절",
      errorMessage: "잘못된 접근입니다.",
      userId: req.user.ID,
      loginStatus: true,
      isAdmin: req.user.ISADMIN,
      username: req.user.NAME,
      userAge: getAge(req.user.BIRTHDAY) + "세",
      userGender: req.user.GENDER,
      userImg: req.user.IMG,
      loginMessage: "로그인후 작성해 주시길 바랍니다."
    });
  } else {
    res.render('notice/notice', {
      title: '공지사항',
      findButton: '동행 만들기',
      searchButton: '혹은 동행 찾기',
      attendBoard: '참석한 모임글',
      writeBoard: '내가 작성한 모임글',
      prevBoard: '참가한 모임글',
      newBoard: '관련 최신글',
      moreBoard: '더보기',
      updateText: '게시물 등록',
      deleteText: '일정삭제',
      fillHeadCountText: "모집마감",
      maleText: "남자만",
      femaleText: "여자만",
      ageText: "나이제한",
      headCountBtnState2: "모임 대기",
      headCountBtnState3: "모임 참가",
      headCountBtnState4: "참가 거절",
      errorMessage: "잘못된 접근입니다.",
      userId: null,
      username: null,
      isAdmin: false,
      loginStatus: false,
      isAdmin: false,
      userImg: null,
      userGender: null,
      userAge: null,
    });
  }

});


router.get('/write', function (req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.ISADMIN == 1) {
      res.render('notice/write', {
        title: '공지사항 작성',
        writeText9: "제목",
        writeText10: "내용을 입력하세요",
        backBtnText: "뒤로 이동",
        applyBtnText: "등록하기",
        dropdown: "/image/icon/dropdown.png",
        dropup: "/image/icon/dropup.png",
        userId: req.user.ID,
        loginStatus: true,
        username: req.user.NAME,
        isAdmin: req.user.ISADMIN,
        userAge: getAge(req.user.BIRTHDAY) + "세",
        userGender: req.user.GENDER,
        userImg: req.user.IMG,
        loginMessage: "로그인후 작성해 주시길 바랍니다.",
        writeErrorText: "누락된 항목이 있습니다. 작성후 입력해주세요.",
      });
    } 
    else {
      res.redirect('/');
    }
  }else {
    res.redirect('/login/login');
  }
});


router.get('/update', function (req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.ISADMIN == 1) {
      res.render('notice/updatenotice', {
        title: '공지사항 수정',
        writeText9: "제목",
        writeText10: "내용을 입력하세요",
        backBtnText: "뒤로 이동",
        applyBtnText: "수정하기",
        dropdown: "/image/icon/dropdown.png",
        dropup: "/image/icon/dropup.png",
        userId: req.user.ID,
        loginStatus: true,
        username: req.user.NAME,
        userAge: getAge(req.user.BIRTHDAY) + "세",
        userGender: req.user.GENDER,
        userImg: req.user.IMG,
        isAdmin: req.user.ISADMIN,
        noticeNo: req.session.noticeNo,
        loginMessage: "로그인후 작성해 주시길 바랍니다.",
        writeErrorText: "누락된 항목이 있습니다. 작성후 입력해주세요.",
      });
    } else {
      res.redirect('/');
    }
  }else {
    res.redirect('/login/login');
  }
});

router.get('/view', function (req, res, next) {
  if (req.isAuthenticated()) {
    res.render('notice/view', {
      title: "공지사항",
      dateText: "모집일",
      timeText: "모임 시간",
      headCountText: "모임 인원",
      placeText: "모임 장소",
      areaText: "모임 지역",
      cateText: "모임 목적",
      headCountBtnText: "모임 인원 관리",
      headCountBtnState: "모임 신청",
      headCountBtnState2: "모임 대기",
      headCountBtnState3: "모임 인원보기",
      headCountBtnState4: "참가 거절",
      headCountBtnStateMax: "참가 마감",
      headCountBtnConfirm: "모임에 참가 하겠습니까?",
      headCountBtnConfirm2: "참기 신청을 완료했습니다",
      deleteBtnConfirm: "게시물을 삭제하겠습니까?",
      contentText: "",
      tagText: "해쉬태그",
      profileText: "작성자 프로필",
      profileText2: "",
      replyText: "댓글",
      replyBtnText1: "댓글 작성",
      replyBtnText2: "작성 완료",
      modifyBtnText: "모임글 수정",
      deleteBtnText: "모임글 삭제",
      rereplyBtnText1: "답글 작성",
      errorMessage: "잘못된 요청입니다.",
      userId: req.user.ID,
      username: req.user.NAME,
      userAge: getAge(req.user.BIRTHDAY) + "세",
      userGender: req.user.GENDER,
      userImg: req.user.IMG,
      loginStatus: true,
      isAdmin: req.user.ISADMIN,
    });
  } else {
    res.render('notice/view', {
      title: "공지사항",
      dateText: "모집일",
      timeText: "모임 시간",
      headCountText: "모임 인원",
      placeText: "모임 장소",
      areaText: "모임 지역",
      cateText: "모임 목적",
      headCountBtnText: "모임 인원 관리",
      headCountBtnState: "모임 신청",
      headCountBtnState2: "모임 대기",
      headCountBtnState3: "모임 인원보기",
      headCountBtnState4: "참가 거절",
      headCountBtnStateMax: "참가 마감",
      headCountBtnConfirm: "모임에 참가 하겠습니까?",
      headCountBtnConfirm2: "참기 신청을 완료했습니다",
      deleteBtnConfirm: "게시물을 삭제하겠습니까?",
      contentText: "",
      tagText: "해쉬태그",
      profileText: "작성자 프로필",
      profileText2: "",
      replyText: "댓글",
      replyBtnText1: "댓글 작성",
      replyBtnText2: "작성 완료",
      modifyBtnText: "모임글 수정",
      deleteBtnText: "모임글 삭제",
      rereplyBtnText1: "답글 작성",
      errorMessage: "잘못된 요청입니다.",
      userId: null,
      loginStatus: false,
      isAdmin: false,
    });
  }
});


router.get('/getnoticefavor', function (req, res) {

  var query = "SELECT WRITER,NO,TITLE, NAME, REG_DATE FROM PT_NOTICE WHERE IS_DELETE = 0 AND IS_FAVOR = 1 ORDER BY NO DESC";

  con.connection.query(query, function (err, rows, fields) {
    if (err) {
      console.log(err);
      console.log(rows);
      res.send({ rows, result: false });


    } else {
      res.send({ rows, result: true });

    }
  });
});

router.get('/getnotice', function (req, res) {

  var query = "SELECT WRITER,NO,TITLE, NAME, REG_DATE FROM PT_NOTICE WHERE IS_DELETE = 0 AND IS_FAVOR = 0 ORDER BY NO DESC LIMIT ?, ?";
  var params = [parseInt(req.query.startNo), parseInt(req.query.endNo)];

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

router.get('/getnoticeall', function (req, res) {

  var query = "SELECT COUNT(*) FROM PT_NOTICE WHERE IS_DELETE = 0 AND IS_FAVOR = 0";
  con.connection.query(query, function (err, rows, fields) {
    if (err) {
      console.log(err);
      console.log(rows);
      res.send({ rows, result: false });


    } else {
      console.log(rows.inster);
      console.log(rows);
      res.send({ rows });

    }
  });
});

//게시글 등록 라우터
router.post('/writenotice', function (req, res) {

  var moment = require('moment');
  var nowTime = moment().format('YYYY-MM-DD HH:mm:ss');

  var query = 'INSERT INTO PT_NOTICE (WRITER, REG_DATE, TITLE, CONTENTS, NAME, IS_FAVOR) VALUES (?,?,?,?,?,?)';

  var params = [req.body.id, nowTime, req.body.titleText, req.body.contentText,
  req.body.name, req.body.isAdmin];

  var no = 'null';
  con.connection.query(query, params, function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.send({ result: no });
    } else {
      no = rows.insertId;
      console.log(rows.insertId);
      res.send({ result: no });
    }
  });
});


router.post('/updatenotice', function (req, res) {

  var moment = require('moment');
  var nowTime = moment().format('YYYY-MM-DD HH:mm:ss');

  var query = 'UPDATE PT_NOTICE SET WRITER = ?, MODIFY_DATE = ?, TITLE = ?, CONTENTS = ?, NAME = ?, IS_FAVOR = ? WHERE NO = ?';

  var params = [req.body.id, nowTime, req.body.titleText, req.body.contentText,
  req.body.name, req.body.isAdmin, req.body.no];


  con.connection.query(query, params, function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.send({ result: false });
    } else {
      res.send({ result: true });
    }
  });
});

router.post('/uploadimage', function (req, res) {

  var query = 'UPDATE NOTICE SET IMG1 = ?, IMG2 = ?, IMG3 = ?, IMG4 = ? WHERE NO = ?';

  var params = [req.body.img1, req.body.img2, req.body.img3, req.body.img4, req.body.no];


  con.connection.query(query, params, function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.send({ result: false });
    } else {
      res.send({ result: true });
    }
  });
});

router.get('/getnoticeview', function (req, res) {

  var query = 'SELECT * FROM PT_NOTICE WHERE NO = ? AND IS_DELETE = 0';

  var params = [req.query.no];

  con.connection.query(query, params, function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.send({ result: false });
    } else {
      res.send({ rows, result: true });
    }
  });
});


router.post('/deletenotice', function (req, res) {

  var query = 'UPDATE PT_NOTICE SET IS_DELETE = 1 WHERE NO = ?';

  var params = [req.body.no];


  con.connection.query(query, params, function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.send({ result: false });
    } else {
      res.send({ result: true });
    }
  });
});


router.post('/getnoticeno', function (req, res) {

  req.session.noticeNo = req.body.no;
  req.session.save(function () {
    res.send({ result: true });

  });
});

function getAge(userAge) {
  var nowDay = new Date();
  var birthday = new Date(userAge);


  var age = nowDay.getFullYear() - birthday.getFullYear();
  var month = nowDay.getMonth() - birthday.getMonth();

  return month < 0 || (month === 0 && nowDay.getDate() < birthday.getDate()) ?
    age : age + 1
}

module.exports = router;
