var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var passport = require('passport');

var con =require("../db/index.js")

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.isAuthenticated()) {
  res.render('phaserExample', { 
  });
  }else{
    res.render('phaserExample', {
      
      });
  }

});

router.get('/phaser3rdweek', function(req, res, next) {
  if (req.isAuthenticated()) {
  res.render('phaser3rdWeek', { 
    userId : req.user.ID,
      loginStatus  : true,
      username : req.user.NAME,
      //userAge : getAge(req.user.BIRTHDAY) + "세",
      //userGender : req.user.GENDER,
      userImg : req.user.IMG
  });
  }else{
    res.render('phaser3rdWeek', {
        userId : null,
        loginStatus  : false,
        username : "user",
        //userAge : "",
        //userGender : "",
        userImg : "https://ssl.pstatic.net/static/pwe/address/img_profile.png"
      });
  }

});


router.get('/phaser4thWeek', function(req, res, next) {
  if (req.isAuthenticated()) {
  res.render('phaser4thWeek', { 
  });
  }else{
    res.render('phaser4thWeek', {
      
      });
  }

});


router.get('/uploadScore', function(req, res) {

    var query = 'INSERT INTO PHASER (SCORE) VALUES (?)';
  
    var params =[req.query.score];
  
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

  
router.get('/saveStageMode', function(req, res) {

  var moment = require('moment');
  var nowTime = moment().format('YYYY-MM-DD HH:mm:ss'); 


  var query = 'INSERT INTO PHASER (ID, HP, STAGE, COIN,' +
  'DAMAGE, SPEED, STAGEMODE, PETENABLE, WATERGAUGEMAX, UPDATETIME, SCORE) VALUES (?,?,?,?,?,?,?,?,?,?,?)';

  var params =[req.query.id,req.query.hp, req.query.stageLevel,req.query.playerMoney, req.query.playerDamage
    ,req.query.playerSpeed,
    req.query.stageMode, req.query.petEnable, req.query.waterGaugeMax, nowTime, req.query.score ];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        console.log(err);
      }else{
        console.log(rows.inster);
      }
    });
    
    res.send({result:true});

});

router.get('/getSaveStageMode', function(req, res) {



  var query = 'SELECT * FROM PHASER WHERE ID = ? AND STAGEMODE = ?';

  var params =[req.query.id,req.query.stageMode];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        console.log(err);
      }else{
        console.log(rows.inster);
        res.send({rows, result:true});
      }
    });
    

});

router.get('/saveInfiniteMode', function(req, res) {

  var moment = require('moment');
  var nowTime = moment().format('YYYY-MM-DD HH:mm:ss'); 


  var query = 'INSERT INTO PHASER (ID, HP, STAGE, COIN,' +
  'DAMAGE, SPEED, STAGEMODE, PETENABLE, WATERGAUGEMAX, UPDATETIME, SCORE) '+
  'VALUES (?,?,?,?,?,?,?,?,?,?,?)';

  var params =[req.query.id,req.query.hp, req.query.stageLevel,req.query.playerMoney, req.query.playerDamage
    ,req.query.playerSpeed,
    req.query.stageMode, req.query.petEnable, req.query.waterGaugeMax, nowTime, req.query.score ];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        console.log(err);
      }else{
        console.log(rows.inster);
      }
    });
    
    res.send({result:true});

});

router.get('/getInfiniteScore', function(req, res) {

  var query = 'SELECT * FROM PHASER WHERE STAGEMODE = ? ORDER BY SCORE DESC';

  var params =[req.query.stageMode];


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
  
router.get('/getScore', function(req, res) {

    var query = 'SELECT * FROM PHASER ORDER BY SCORE DESC';
  
  
    con.connection.query(query, function(err, rows, fields) {
        if(err){
          console.log(err);
          res.send({result:false});
        }else{
          console.log(rows.inster);
          
          res.send({rows,result:true});
        }
      });
  });




module.exports = router;
