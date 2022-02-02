var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var passport = require('passport');

var moment = require('moment');

var con =require("../db/index.js")

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.isAuthenticated()) {
    res.render('phaserExample', {
    });
  } else {
    res.render('phaserExample', {

    });
  }

});

router.get('/phaser3rdweek', function (req, res, next) {
  if (req.isAuthenticated()) {
    res.render('phaser3rdWeek', {
      userId: req.user.ID,
      loginStatus: true,
      username: req.user.NAME,
      //userAge : getAge(req.user.BIRTHDAY) + "세",
      //userGender : req.user.GENDER,
      userImg: req.user.IMG
    });
  } else {
    res.render('phaser3rdWeek', {
      userId: null,
      loginStatus: false,
      username: "user",
      //userAge : "",
      //userGender : "",
      userImg: "https://ssl.pstatic.net/static/pwe/address/img_profile.png"
    });
  }

});


router.get('/phaser4thWeek', function (req, res, next) {
  if (req.isAuthenticated()) {
    res.render('phaser4thWeek', {
      title: '꾸미기 테스트',
      userId: req.user.ID,
      loginStatus: true,
      username: req.user.NAME,
      //userAge : getAge(req.user.BIRTHDAY) + "세",
      //userGender : req.user.GENDER,
      userImg: req.user.IMG
    });
  } else {
    res.render('login/login', {
      title: "로그인후 이용이 가능합니다.",
      kakaoBtn : "카카오 로그인",
      loginStatus  : false
      });
  }

});


router.get('/uploadScore', function (req, res) {

  var query = 'INSERT INTO PHASER (SCORE) VALUES (?)';

  var params = [req.query.score];

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


router.get('/saveStageMode', function (req, res) {

  var moment = require('moment');
  var nowTime = moment().format('YYYY-MM-DD HH:mm:ss');


  var query = 'INSERT INTO PHASER (ID, HP, STAGE, COIN,' +
    'DAMAGE, SPEED, STAGEMODE, PETENABLE, WATERGAUGEMAX, UPDATETIME, SCORE) VALUES (?,?,?,?,?,?,?,?,?,?,?)';

  var params = [req.query.id, req.query.hp, req.query.stageLevel, req.query.playerMoney, req.query.playerDamage
    , req.query.playerSpeed,
  req.query.stageMode, req.query.petEnable, req.query.waterGaugeMax, nowTime, req.query.score];

  con.connection.query(query, params, function (err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      console.log(rows.inster);
    }
  });

  res.send({ result: true });

});

router.get('/getSaveStageMode', function (req, res) {



  var query = 'SELECT * FROM PHASER WHERE ID = ? AND STAGEMODE = ?';

  var params = [req.query.id, req.query.stageMode];

  con.connection.query(query, params, function (err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      console.log(rows.inster);
      res.send({ rows, result: true });
    }
  });


});

router.get('/saveInfiniteMode', function (req, res) {

  var moment = require('moment');
  var nowTime = moment().format('YYYY-MM-DD HH:mm:ss');


  var query = 'INSERT INTO PHASER (ID, HP, STAGE, COIN,' +
    'DAMAGE, SPEED, STAGEMODE, PETENABLE, WATERGAUGEMAX, UPDATETIME, SCORE) ' +
    'VALUES (?,?,?,?,?,?,?,?,?,?,?)';

  var params = [req.query.id, req.query.hp, req.query.stageLevel, req.query.playerMoney, req.query.playerDamage
    , req.query.playerSpeed,
  req.query.stageMode, req.query.petEnable, req.query.waterGaugeMax, nowTime, req.query.score];

  con.connection.query(query, params, function (err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      console.log(rows.inster);
    }
  });

  res.send({ result: true });

});

router.get('/getInfiniteScore', function (req, res) {

  var query = 'SELECT * FROM PHASER WHERE STAGEMODE = ? ORDER BY SCORE DESC';

  var params = [req.query.stageMode];


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

router.get('/getScore', function (req, res) {

  var query = 'SELECT * FROM PHASER ORDER BY SCORE DESC';


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

/****************************졸업설계 */


router.post('/savemap', function (req, res) {

  var nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
  var query = 'INSERT INTO PT_PHASER (ID, MAP_DATA, REG_DATE, MAP_ID) ' +
  'VALUES (?,?,?,?)';

  var params = [req.body.id, req.body.mappos,nowTime,req.body.map_id];

  con.connection.query(query,params, function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.send({ result: false });
    } else {
      console.log(rows.inster);

      res.send({ rows, result: true });
    }
  });
});


router.post('/savemap_tower', function (req, res) {

  var nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
  var query = 'INSERT INTO PT_PHASER_TOWER (ID, MAP_DATA, REG_DATE, MAP_ID) ' +
  'VALUES (?,?,?,?)';

  var params = [req.body.id, req.body.mappos,nowTime,req.body.map_id];

  con.connection.query(query,params, function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.send({ result: false });
    } else {
      console.log(rows.inster);

      res.send({ rows, result: true });
    }
  });
});


router.post('/savemap_tower_count', function (req, res) {

  var nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
  var query = 'INSERT INTO PT_PHASER_TOWER_COUNT (ID, COUNT, REG_DATE, MAP_ID) ' +
  'VALUES (?,?,?,?)';

  var params = [req.body.id, req.body.count,nowTime,req.body.map_id];

  con.connection.query(query,params, function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.send({ result: false });
    } else {
      console.log(rows.inster);

      res.send({ rows, result: true });
    }
  });
});


router.post('/getusermapcreate', function(req, res) {
  var query = 
  'SELECT EXISTS (SELECT * FROM PT_PHASER WHERE ID=? AND MAP_ID=?) AS SUCCESS';
  var params =[req.body.id,req.body.map_id];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        console.log(err);
        res.send({result:false});
      }else{
        console.log(rows);
        res.send({rows, result:true});
      }
    });
});


router.post('/getusermapcreate_tower', function(req, res) {
  var query = 
  'SELECT EXISTS (SELECT * FROM PT_PHASER_TOWER WHERE ID=? AND MAP_ID=?) AS SUCCESS';
  var params =[req.body.id,req.body.map_id];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        console.log(err);
        res.send({result:false});
      }else{
        console.log(rows);
        res.send({rows, result:true});
      }
    });
});

router.post('/getusermapcreate_tower_count', function(req, res) {
  var query = 
  'SELECT EXISTS (SELECT * FROM PT_PHASER_TOWER_COUNT WHERE ID=? AND MAP_ID=?) AS SUCCESS';
  var params =[req.body.id,req.body.map_id];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        console.log(err);
        res.send({result:false});
      }else{
        console.log(rows);
        res.send({rows, result:true});
      }
    });
});

router.post('/updatesavemap', function(req, res) {

  var nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
  var query = 'UPDATE PT_PHASER SET MAP_DATA = ?, MODIFY_DATE = ? WHERE ID = ? AND MAP_ID= ?';
  
  var params = [req.body.mappos,nowTime,req.body.id,req.body.map_id];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        console.log(err);
        res.send({result:false});
      }else{
        res.send({result:true});
      }
    });
});


router.post('/updatesavemap_tower', function(req, res) {

  var nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
  var query = 'UPDATE PT_PHASER_TOWER SET MAP_DATA = ?, MODIFY_DATE = ? WHERE ID = ? AND MAP_ID= ?';
  
  var params = [req.body.mappos,nowTime,req.body.id,req.body.map_id];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        console.log(err);
        res.send({result:false});
      }else{
        res.send({result:true});
      }
    });
});


router.post('/updatesavemap_tower_count', function(req, res) {

  var nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
  var query = 'UPDATE PT_PHASER_TOWER_COUNT SET COUNT = ?, MODIFY_DATE = ? WHERE ID = ? AND MAP_ID= ?';
  
  var params = [req.body.count,nowTime,req.body.id,req.body.map_id];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        console.log(err);
        res.send({result:false});
      }else{
        res.send({result:true});
      }
    });
});

router.post('/getusermap', function(req, res) {
  var query = 
  'SELECT MAP_DATA FROM PT_PHASER WHERE ID=? AND MAP_ID=?';
  var params =[req.body.id,req.body.map_id];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        res.send({result:false});
      }else{
        res.send({rows, result:true});
      }
    });
});


router.post('/getusermap_tower', function(req, res) {
  var query = 
  'SELECT MAP_DATA FROM PT_PHASER_TOWER WHERE ID=? AND MAP_ID=?';
  var params =[req.body.id,req.body.map_id];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        res.send({result:false});
      }else{
        res.send({rows, result:true});
      }
    });
});


router.post('/getusermap_tower_count', function(req, res) {
  var query = 
  'SELECT COUNT FROM PT_PHASER_TOWER_COUNT WHERE ID=? AND MAP_ID=?';
  var params =[req.body.id,req.body.map_id];

  con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        res.send({result:false});
      }else{
        res.send({rows, result:true});
      }
    });
});

module.exports = router;
