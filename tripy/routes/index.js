var express = require('express');
var router = express.Router();

var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("session : " +JSON.stringify(req.user));
  if (req.isAuthenticated()) {
   
      res.render('index', { title:"TRIPY", //req.user.ID
      bodyFirst: req.user.NAME +'님 환영합니다!',
      bodySecond: 'TRIPY는 혼자 여행하는 사람들의 동행을 찾아주는 소셜어플리케이션입니다.',
      bodyThird: '관광지를 같이 다닐 친구가 필요할때,  혼자서 밥 먹기 싫을때, 언제 어디서든 동행을 구하고싶으시다면,',
      footerText: 'TRIPY를 열어주세요',
      registerButton: "로그인하기",
      loginButton: '혹은 모임검색',
      introduceButton: 'TRIPY에 대해 알아보기',
      board1Text: '모임 최신글',
      calendarText: '여행 일정을 추가해보세요.',
      board2Text: '인기 여행지',
      board3Text: '다른 태국지역',
      moreBoardText: '더보기',
      fillHeadCountText : "모집마감",
      maleText : "남자만",
      femaleText : "여자만",
      userId : req.user.ID,
      loginStatus  : true,
      username : req.user.NAME,
      userAge : getAge(req.user.BIRTHDAY) + "세",
      userGender : req.user.GENDER,
      userImg : req.user.IMG,
      isAdmin : req.user.ISADMIN
     });
    
  } else {
    res.render('index', { title: "TRIPY",
      bodyFirst: '처음이세요?',
      bodySecond: 'TRIPY는 여행과 SNG를 결합한 소셜어플리케이션입니다.',
      bodyThird: '관광지를 같이 다닐 친구가 필요할때, 여행중 색다른 경험을 누리고 싶을때, 여행지의 추억을 되살리고 싶을때,',
      footerText: 'TRIPY를 열어주세요',
      registerButton: "로그인하기",
      loginButton: '혹은 모임검색',
      introduceButton: 'TRIPY에 대해 알아보기',
      board1Text: '다른 사용자의 여행 기록 보기',
      calendarText: '로그인 하셔서 여행 모임을 만나거나, 여행 기록을 추가해보세요.',
      board2Text: '인기 여행지',
      board3Text: '서비스 지원 지역',
      moreBoardText: '더보기',
      fillHeadCountText : "모집마감",
      maleText : "남자만",
      femaleText : "여자만",
      userId : null,
      loginStatus  : false,
      isAdmin : false,
      username : "user",
      userAge : "",
      userGender : "",
      userImg : "https://ssl.pstatic.net/static/pwe/address/img_profile.png"
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



module.exports = router;
