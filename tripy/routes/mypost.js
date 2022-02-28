var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.isAuthenticated()){
    res.render('mypost', { title: '내 게시글',
    nameText: '김의진',
    registerButton: '모집글 작성',
    nowBoard: '모집중인 여행글',
    nextBoard: '마감된 여행글',
    prevBoard: '이전 여행글',
    fillHeadCountText : "모집마감",
    maleText : "남자만",
    femaleText : "여자만",
    ageText : "나이제한",
    headCountBtnState2 : "모임 대기",
    headCountBtnState3 : "모임 참가",
    headCountBtnState4 : "참가 거절",
    userGender : req.user.GENDER,
    userAge : getAge(req.user.BIRTHDAY),
    userId : req.user.ID,
    userImg : req.user.IMG,
    username : req.user.NAME,
    loginStatus  : true,
    isAdmin : req.user.ISADMIN,
    });
  }else{
    res.redirect('/');
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
