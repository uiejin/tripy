var express = require('express');
const request = require('request');
const converter = require('xml-js');
var mysql = require('mysql');
var router = express.Router();

var con =require("../db/index.js")

var apiKey = "ZWD797%2BBsLxBRgoEHI2ff%2BJQFtQIeblQbvXRYh77hBNgSDkDTCb7TWM%2Ft9tkvlyCFhRp1tvOOczzJDTqvCYTNA%3D%3D";

/* GET home page. */

router.get('/', function (req, res, next) {
  if (req.isAuthenticated()) {
    res.render('tourlist/tourlist', {
      title: '관광지 찾기',
      searchText: "여행지를 선택해주세요",
      writeText1: "여행지",
      writeText2: "관광 분류",
      writeText3: "여행시작일",
      writeText4: "여행종료일",
      locationText: "여행지를 선택하세요",
      cateText: "관광 분류를 선택하세요",
      selectdateText: "여행 시작 일자를 선택해주세요",
      selectdateText2: "여행 종료 일자를 선택해주세요",
      modalTitle: "여행지를 선택해주세요",
      modalTitle2: "동행 목적을 선택해주세요",
      searchText: "제목을 검색 하세요",
      moreinfoText: "상세검색",
      filterText: "추가설정",
      genderText: "성별제한",
      fillHeadCountText: "모집마감",
      maleText: "남자만",
      femaleText: "여자만",
      ageText: "나이제한",
      dropdown: "/image/icon/dropdown.png",
      dropup: "/image/icon/dropup.png",
      nullparty: "모집글이 없습니다",
      userId: req.user.ID,
      loginStatus: true,
      userImg: req.user.IMG,
      username: req.user.NAME,
      loginMessage: "로그인후 작성해 주시길 바랍니다."
    });
  } else {
    res.render('login/login', {
      title: "로그인후 이용이 가능합니다.",
      kakaoBtn: "카카오 로그인",
      loginStatus: false
    });

  }
});


router.get('/detail', function (req, res, next) {
  if (req.isAuthenticated()) {
    res.render('tourlist/detail', {
      title: '관광지 찾기',
      searchText: "여행지를 선택해주세요",
      writeText1: "여행지",
      writeText2: "관광 분류",
      writeText3: "여행시작일",
      writeText4: "여행종료일",
      locationText: "여행지를 선택하세요",
      cateText: "관광 분류를 선택하세요",
      selectdateText: "여행 시작 일자를 선택해주세요",
      selectdateText2: "여행 종료 일자를 선택해주세요",
      modalTitle: "여행지를 선택해주세요",
      modalTitle2: "동행 목적을 선택해주세요",
      searchText: "제목을 검색 하세요",
      moreinfoText: "상세검색",
      filterText: "추가설정",
      genderText: "성별제한",
      fillHeadCountText: "모집마감",
      maleText: "남자만",
      femaleText: "여자만",
      ageText: "나이제한",
      dropdown: "/image/icon/dropdown.png",
      dropup: "/image/icon/dropup.png",
      nullparty: "모집글이 없습니다",
      userId: req.user.ID,
      loginStatus: true,
      userImg: req.user.IMG,
      username: req.user.NAME,
      loginMessage: "로그인후 작성해 주시길 바랍니다."
    });
  } else {
    res.render('login/login', {
      title: "로그인후 이용이 가능합니다.",
      kakaoBtn: "카카오 로그인",
      loginStatus: false
    });

  }
});


router.get('/gettourlist', function (req, res) {

  var queryParams = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/";

  if (req.query.text != "") {
    queryParams += "searchKeyword?ServiceKey=" + apiKey + "&contentTypeId=" + req.query.category + "&keyword=" + req.query.text + "&areaCode=" + req.query.areacode + "&sigunguCode="
      + req.query.sigungucode + "&cat1=&cat2=&cat3=&listYN=Y&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&arrange=A&numOfRows=12&pageNo=" + req.query.count + "&_type=json";

    console.log(queryParams);
  }

  else {
    queryParams += "areaBasedList?ServiceKey=" + apiKey + "&contentTypeId=" + req.query.category + "&areaCode=" + req.query.areacode + "&sigunguCode="
      + req.query.sigungucode + "&cat1=&cat2=&cat3=&listYN=Y&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&arrange=A&numOfRows=12&pageNo=" + req.query.count + "&_type=json";
  }

  request(
    {
      url: queryParams, // url과 queryParams합쳐놓은거 
      method: 'GET'
    }, function (error, response, body) {
      res.send(body);
    });
});


router.get('/getcategory', function (req, res) {

  var query = 'SELECT * FROM PT_TOURLIST_CATEGORY';


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

router.get('/getdetail', function (req, res) {
  var queryParams = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon?";

  queryParams += "ServiceKey=" + apiKey + "&contentId=" + req.query.no +
    "&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&transGuideYN=Y" +
    "&_type=json";
  console.log(queryParams);

  request(
    {
      url: queryParams, 
      method: 'GET'
    }, function (error, response, body) {
      res.send(body);
    });
});

router.get('/getdetailintro', function (req, res) {

  var queryParams = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon?";

  queryParams += "ServiceKey=" + apiKey + "&contentId=" + req.query.no +
  "&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&listYN=Y"+
  "&_type=json";

  request(
    {
      url: queryParams, 
      method: 'GET'
    }, function (error, response, body) {
      res.send(body);
    });
});

router.get('/getdetailimg', function (req, res) {

  var queryParams = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailImage?";

  queryParams += "ServiceKey=" + apiKey + "&contentId=" + req.query.no +
  "&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&imageYN=Y"+
  "&_type=json";

  request(
    {
      url: queryParams, 
      method: 'GET'
    }, function (error, response, body) {
      res.send(body);
    });
});
module.exports = router;
