var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var passport = require('passport');

var con =require("../db/index.js");

router.get('/', function(req, res, next) {
    if (req.isAuthenticated()) {
      if(req.user.ISADMIN == 1){
      res.render('admin/admin', { title: '관리자 페이지',
        userId : req.user.ID,
        username : req.user.NAME,
        loginStatus : true,
        isAdmin : req.user.ISADMIN,
        username : req.user.NAME,
        userAge : getAge(req.user.BIRTHDAY) + "세",
        userGender : req.user.GENDER,
        userImg : req.user.IMG,
        loginMessage : "로그인후 작성해 주시길 바랍니다.",
      });}
      else {
        res.redirect('/');
      }
    }else {
      res.redirect('/login/login');
    }
  });

  
router.get('/category', function(req, res, next) {
    if (req.isAuthenticated()) {
      if(req.user.ISADMIN == 1){
      res.render('admin/category', { title: '관리자 페이지',
        userId : req.user.ID,
        username : req.user.NAME,
        loginStatus : true,
        isAdmin : req.user.ISADMIN,
        username : req.user.NAME,
        userAge : getAge(req.user.BIRTHDAY) + "세",
        userGender : req.user.GENDER,
        userImg : req.user.IMG,
        loginMessage : "로그인후 작성해 주시길 바랍니다.",
      });}
      else {
        res.redirect('/');
      }
    }else {
      res.redirect('/login/login');
    }
  });

  router.get('/writecategory', function(req, res, next) {
    if (req.isAuthenticated()) {
      if(req.user.ISADMIN == 1){
      res.render('admin/writecategory', { title: '카테고리 생성',
        userId : req.user.ID,
        username : req.user.NAME,
        loginStatus : true,
        isAdmin : req.user.ISADMIN,
        userAge : getAge(req.user.BIRTHDAY) + "세",
        userGender : req.user.GENDER,
        userImg : req.user.IMG,
        loginMessage : "로그인후 작성해 주시길 바랍니다.",
        backBtnText : "뒤로 이동",
        applyBtnText : "등록하기",
        writeErrorText : "누락된 항목이 있습니다. 작성후 입력해주세요.",
      });}
      else {
        res.redirect('/');
      }
    }else {
      res.redirect('/login/login');
    }
  });

  router.get('/updatecategory', function(req, res, next) {
    if (req.isAuthenticated()) {
      if(req.user.ISADMIN == 1){
      res.render('admin/updatecategory', { title: '카테고리 수정',
        userId : req.user.ID,
        username : req.user.NAME,
        loginStatus : true,
        isAdmin : req.user.ISADMIN,
        userAge : getAge(req.user.BIRTHDAY) + "세",
        userGender : req.user.GENDER,
        userImg : req.user.IMG,
        categoryNo : req.session.categoryNo,
        loginMessage : "로그인후 작성해 주시길 바랍니다.",
        backBtnText : "뒤로 이동",
        applyBtnText : "등록하기",
        writeErrorText : "누락된 항목이 있습니다. 작성후 입력해주세요.",
      });}
      else {
        res.redirect('/');
      }
    }else {
      res.redirect('/login/login');
    }
  });
  
  router.get('/usercategory', function(req, res, next) {
    if (req.isAuthenticated()) {
      if(req.user.ISADMIN == 1){
      res.render('admin/usercategory', { title: '카테고리 관리',
        userId : req.user.ID,
        username : req.user.NAME,
        loginStatus : true,
        isAdmin : req.user.ISADMIN,
        userAge : getAge(req.user.BIRTHDAY) + "세",
        userGender : req.user.GENDER,
        userImg : req.user.IMG,
        changeId : req.session.changeId,
        loginMessage : "로그인후 작성해 주시길 바랍니다.",
        backBtnText : "뒤로 이동",
        applyBtnText : "등록하기",
        writeErrorText : "누락된 항목이 있습니다. 작성후 입력해주세요.",
      });}
      else {
        res.redirect('/');
      }
    }else {
      res.redirect('/login/login');
    }
  });

  
router.get('/password', function(req, res, next) {
  if (req.isAuthenticated()) {
    if(req.user.ISADMIN == 1){
    res.render('admin/password', { title: '관리자 페이지',
      userId : req.user.ID,
      username : req.user.NAME,
      userAge : getAge(req.user.BIRTHDAY) + "세",
      userGender : req.user.GENDER,
      userImg : req.user.IMG,
      loginStatus : true,
      isAdmin : req.user.ISADMIN,
      changeId : req.session.changeId,
      loginMessage : "로그인후 작성해 주시길 바랍니다.",
    });}
    else {
      res.redirect('/');
    }
  }else {
    res.redirect('/login/login');
  }
});

  router.get('/register', function(req, res, next) {
    if (req.isAuthenticated()) {
      if(req.user.ISADMIN == 1){
        res.render('admin/register', { title: '사용자 등록',
        userId : req.user.ID,
        username : req.user.NAME,
        userAge : getAge(req.user.BIRTHDAY) + "세",
        userGender : req.user.GENDER,
        userImg : req.user.IMG,
        loginStatus : true,
        isAdmin : req.user.ISADMIN,
        loginMessage : "로그인후 작성해 주시길 바랍니다.",
        });}
        else {
          res.redirect('/');
        }
      }else {
        res.redirect('/login/login');
      }
  });

  
  router.get('/notice', function(req, res, next) {
    if (req.isAuthenticated()) {
      if(req.user.ISADMIN == 1){
      res.render('admin/notice', { title: '공지사항 관리',
        userId : req.user.ID,
        username : req.user.NAME,
        userAge : getAge(req.user.BIRTHDAY) + "세",
        userGender : req.user.GENDER,
        userImg : req.user.IMG,
        loginStatus : true,
        isAdmin : req.user.ISADMIN,
        categoryNo : req.session.categoryNo,
        loginMessage : "로그인후 작성해 주시길 바랍니다.",
        backBtnText : "뒤로 이동",
        applyBtnText : "등록하기",
        writeErrorText : "누락된 항목이 있습니다. 작성후 입력해주세요.",
      });}
      else {
        res.redirect('/');
      }
    }else {
      res.redirect('/login/login');
    }
  });

  
  router.post('/getuserall', function(req, res) {
  
    var query = "SELECT COUNT(*) FROM PT_USER WHERE IS_DELETE = 0";
    con.connection.query(query, function(err, rows, fields) {
      if(err){
        console.log(err);
        console.log(rows);
        res.send({rows,result:false});


      }else{
        console.log(rows.inster);
        console.log(rows);
        res.send({rows});

      }
    });
  });

  
  router.post('/getdeleteuserall', function(req, res) {
  
    var query = "SELECT COUNT(*) FROM PT_USER WHERE IS_DELETE = 1";
    con.connection.query(query, function(err, rows, fields) {
      if(err){
        console.log(err);
        console.log(rows);
        res.send({rows,result:false});


      }else{
        console.log(rows.inster);
        console.log(rows);
        res.send({rows});

      }
    });
  });

  router.post('/getusers', function(req, res) {
  
    var query = "SELECT SEQ,ID,NAME,ISADMIN, NAME, ISBLOCK, REG_DATE, ISADMIN FROM PT_USER WHERE IS_DELETE = 0 ORDER BY SEQ ASC LIMIT ?, ?";
    var params = [parseInt(req.body.startNo), parseInt(req.body.endNo)];
  
    con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        console.log(err);
        console.log(rows);
        res.send({rows,result:false});

      }else{
        res.send({rows,result:true});
      }
    });
  });

  
  router.post('/getdeleteusers', function(req, res) {
  
    var query = "SELECT SEQ,ID,NAME,ISADMIN, NAME, ISBLOCK, REG_DATE, ISADMIN FROM PT_USER WHERE IS_DELETE = 1 ORDER BY SEQ ASC LIMIT ?, ?";
    var params = [parseInt(req.body.startNo), parseInt(req.body.endNo)];
  
    con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        console.log(err);
        console.log(rows);
        res.send({rows,result:false});

      }else{
        res.send({rows,result:true});
      }
    });
  });

  router.post('/getusersession', function(req, res) {
  
    req.session.changeId = req.body.id;
    req.session.save(function(){	
      res.send({result:true});
    
  });
});


router.post('/changePassword', function(req, res) {
  
  req.session.changeId = req.body.id;
  req.session.save(function(){	
    res.send({result:true});
  
});
});


router.post('/getcategoryno', function(req, res) {
  
  req.session.categoryNo = req.body.no;
  req.session.save(function(){	
    res.send({result:true});
  
});
});


router.post('/getcategory', function(req, res) {
  
  var query = "SELECT * FROM CATEGORY";
  con.connection.query(query, function(err, rows, fields) {
    if(err){
      console.log(err);
      console.log(rows);
      res.send({rows,result:false});


    }else{
      console.log(rows.inster);
      console.log(rows);
      res.send({rows});

    }
  });
});


router.post('/getcategoryview', function(req, res) {
  
  var query = "SELECT * FROM CATEGORY WHERE NO = ?";
  var params =[req.body.no];
  con.connection.query(query, params, function(err, rows, fields) {
    if(err){
      console.log(err);
      console.log(rows);
      res.send({rows,result:false});


    }else{
      console.log(rows.inster);
      console.log(rows);
      res.send({rows});

    }
  });
});


router.post('/writecategory', function(req, res) {
  
  var query = "INSERT INTO CATEGORY (TITLE, CODE) VALUES (?,?)";
  
  var params =[req.body.titleText,req.body.cateText];
  
  var no = 'null';
  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        console.log(err);
        res.send({result:no});
      }else{
        no = rows.insertId;
        console.log(rows.insertId);
        res.send({result:no});
      }
    });
});


router.post('/updatecategory', function(req, res) {
  
  var query = "UPDATE CATEGORY SET TITLE = ? WHERE NO = ?";
  
  var params =[req.body.titleText,req.body.no];
  
  var no = 'null';
  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        console.log(err);
        res.send({result:no});
      }else{
        no = rows.insertId;
        console.log(rows.insertId);
        res.send({result:no});
      }
    });
});


router.post('/uploadimagecategory', function(req, res) {

  var query = 'UPDATE CATEGORY SET IMG = ? WHERE NO = ?';
  
  var params = [req.body.img1, req.body.no];
  

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        console.log(err);
        res.send({result:false});
      }else{
        res.send({result:true});
      }
    });
});


router.post('/deletecategory', function(req, res) {
  
  var query = 'DELETE FROM CATEGORY WHERE NO = ?';
  var params = [req.body.no];
  con.connection.query(query, params, function(err, rows, fields) {
    if(err){
      res.send({result:false});
    }else{
      res.send({result:true});
    }
  });
});


router.post('/insertusercategory', function(req, res) {
  
  var moment = require('moment');
  var nowTime = moment().format('YYYY-MM-DD HH:mm:ss'); 
  
  var query = 'INSERT INTO USERCATEGORY (ID, CODE, REG_DATE) VALUES (?,?,?)';

  var params =[req.body.id,req.body.code,nowTime];
  con.connection.query(query, params, function(err, rows, fields) {
    if(err){
      res.send({result:false});
      console.log(err);
    }else{
      res.send({result:true});
    }
  });
});


router.post('/deleteusercategory', function(req, res) {
  
  var query = 'DELETE FROM USERCATEGORY WHERE ID = ?, CODE = ?';
  var params =[req.body.id,req.body.code];
  con.connection.query(query, params, function(err, rows, fields) {
    if(err){
      res.send({result:false});
    }else{
      res.send({result:true});
    }
  });
});

router.post('/getusercategory', function(req, res) {
  
  var query = 'SELECT T1.*, T2.CODE FROM CATEGORY T1, USERCATEGORY T2 WHERE T2.ID = ? AND T1.CODE = T2.CODE';
  var params =[req.body.id];
  con.connection.query(query, params, function(err, rows, fields) {
    if(err){
      res.send({result:false});
    }else{
      res.send({rows});
    }
  });
});


router.post('/getusernotcategory', function(req, res) {
  
  var query = 'SELECT T1.* FROM CATEGORY T1, USERCATEGORY T2 WHERE T2.ID = ? NOT T1.CODE IN (T2.CODE)';
  var params =[req.body.id];
  con.connection.query(query, params, function(err, rows, fields) {
    if(err){
      res.send({result:false});
      console.log(err);
    }else{
      res.send({rows});
    }
  });
});


router.post('/getdeleteusers', function(req, res) {
  
  var query = "SELECT * FROM DELETEUSER";
  var params = [parseInt(req.body.startNo), parseInt(req.body.endNo)];

  con.connection.query(query, params, function(err, rows, fields) {
    if(err){
      console.log(err);
      console.log(rows);
      res.send({rows,result:false});

    }else{
      res.send({rows,result:true});
    }
  });
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
  