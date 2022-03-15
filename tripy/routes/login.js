var express = require('express');
var passport = require('passport');
const kakaoStrategy = require('passport-kakao').Strategy;
const naverStrategy = require('passport-naver').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var crypto = require('crypto');
var router = express.Router();
var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();

var mysql = require('mysql');

var con =require("../db/index.js")

var app = express();

app.use(passport.initialize());
app.use(passport.session());

var con =require("../db/index.js")
  

const kakaokey = {
    clientID: "d41478667dcf9d519d2d81b52b13b684",
    clientSecret: "v6FiIDNZQ7t1RmUkibTNTMrQaOJyBc80",
    callbackURL: "http://localhost:3000/login/kakaologin"
};

const naverkey = {
  clientID: "lWsd02Zwz7dp3sVxi0mP",
  clientSecret: "5u5kFMe51f",
  callbackURL: "http://localhost:3000/login/naverlogin"
};


passport.use(
    "kakao-login",
    new kakaoStrategy(kakaokey, (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        const NewUserId = "kakao-" + profile.id;
        const NewUserName = profile.username;
        if(NewUserName == null)
          NewUserName = "";
        
        var img = profile._json.properties.thumbnail_image;
        if(img == undefined){
          img = "https://ssl.pstatic.net/static/pwe/address/img_profile.png";
        }
        const NewUserPassword = crypto.createHash('sha256').update(NewUserId).digest('base64');
        
        //해당 id를 가진 user가 존재하는지 찾아본다.
        const sql = "select SEQ,ID,IMG,BIRTHDAY,NAME,GENDER,ISADMIN from PT_USER where ID = ?";
        const post = [NewUserId];
        con.connection.query(sql, post, (err, results, fields) => {
          if (err) {
            console.log(err);
            done(err);
          }
          //만약 해당 유저가 존재하지 않는다면,
          //새로운 아이디를 하나 만들어주고 로그인을 시켜줌.
          if (results.length === 0) {
                    
          var moment = require('moment');
          var nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
            const sql = "INSERT PT_USER(ID, PASSWORD, NAME, IMG, REG_DATE, MODFY_DATE) values(?,?,?,?,?,?)";
            const post = [NewUserId, NewUserPassword, NewUserName, img, nowTime, nowTime];
            con.connection.query(sql, post, (err, results, fields) => {
              if (err) {
                console.log(err);
                done(err);
              }
              //가입이 되었다면 해당 유저로 바로 로그인시켜줌
              const sql = "SELECT SEQ, ID, NAME, IMG, GENDER, BIRTHDAY, ISADMIN FROM PT_USER where ID =?";
              const post = [NewUserId];
              con.connection.query(sql, post, (err, results, fields) => {
                if (err) {
                  console.log(err);
                  done(err);
                }
                const user = results[0];
                return done(null, user);
              });
            });
          } else {
            //이미 유저가 존재한다면 바로 로그인시켜줌.
            const user = results[0];
            return done(null, user);
          }
        });
      })
);

passport.use(
  "naver-login",
  new naverStrategy(naverkey, (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      const NewUserId = "naver-" + profile.id;
      const NewUserName = profile.id;
      
      var img = profile._json.profile_image;
      if(img == undefined){
        img = "https://ssl.pstatic.net/static/pwe/address/img_profile.png";
      }
      const NewUserPassword = crypto.createHash('sha256').update(NewUserId).digest('base64');
      
      //해당 id를 가진 user가 존재하는지 찾아본다.
      const sql = "select SEQ, ID,IMG,BIRTHDAY,NAME,GENDER,ISADMIN from PT_USER where ID = ?";
      const post = [NewUserId];
      con.connection.query(sql, post, (err, results, fields) => {
        if (err) {
          console.log(err);
          done(err);
        }
        //만약 해당 유저가 존재하지 않는다면,
        //새로운 아이디를 하나 만들어주고 로그인을 시켜줌.
        if (results.length === 0) {
          const sql = "INSERT PT_USER(ID, PASSWORD, NAME, IMG, REG_DATE, MODFY_DATE) values(?,?,?,?,?,?)";
          const post = [NewUserId, NewUserPassword, NewUserName, img, nowTime, nowTime];
          con.connection.query(sql, post, (err, results, fields) => {
            if (err) {
              console.log(err);
              done(err);
            }
            //가입이 되었다면 해당 유저로 바로 로그인시켜줌
            const sql = "SELECT SEQ, ID,IMG,BIRTHDAY,NAME,GENDER,ISADMIN FROM PT_USER where ID =?";
            const post = [NewUserId];
            con.connection.query(sql, post, (err, results, fields) => {
              if (err) {
                console.log(err);
                done(err);
              }
              const user = results[0];
              return done(null, user);
            });
          });
        } else {
          //이미 유저가 존재한다면 바로 로그인시켜줌.
          const user = results[0];
          return done(null, user);
        }
      });
    })
);

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

router.get('/', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/');
  }else{
    res.render('login/login', {
    title: "로그인",
    kakaoBtn : "카카오 로그인",
    loginStatus  : false,
    isAdmin : false,
    });
  }
});

router.get('/login', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/');
  }else{
    res.render('login/login', {
    title: "로그인후 이용이 가능합니다.",
    kakaoBtn : "카카오 로그인",
    loginStatus  : false,
    isAdmin : false,
    
    });
  }
});


router.get('/register', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/');
  }else{
    res.render('login/register', {
    title: "회원가입",
    loginStatus  : false,
    isAdmin : false,
    
    });
  }
});


router.get('/password', function(req, res, next) {
  if (req.isAuthenticated()) {
    
      res.render('login/password', {
        title:"비밀번호 변경", //req.user.ID
        userId : req.user.ID,
        loginStatus : true,
        isAdmin : req.user.ISADMIN,
    });
  }else{
    res.redirect('/login/login');
  }
});

router.get("/kakao", passport.authenticate("kakao-login"));

router.get("/kakaologin",
  passport.authenticate("kakao-login", {
    
    successRedirect: "/",
    failureRedirect: "/fail"
  })
);

router.get("/naver", passport.authenticate("naver-login"));

router.get("/naverlogin",
  passport.authenticate("naver-login",{

    successRedirect: "/",
    failureRedirect: "/fail"
  })
);

router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/api/auth/fail",
      failureFlash: false
    })
);

router.post('/local-login', function(req, res, next) {
  passport.authenticate(
    'local-login', function(err, user, info){
      
      if(err) res.status(500).json(err);
      if(!user) return res.send({result:-1, info:info});
      console.log("세선" + req.session);
      req.logIn(user, function(err){
          if(err) {return next(err);}
          req.session.save(function() {
          return res.send({result:user.IS_CREATE});
          })
      });
  })(req, res, next);
});


passport.use('local-login',
  new LocalStrategy({usernameField: 'id',  //default 속성값
  passwordField: 'password', //default 속성값
  passReqToCallback: true}, function (req, id, password, done) {
      //해당 id를 가진 user가 존재하는지 찾아본다.
      const sql = "select SEQ, ID, PASSWORD, NAME,ISADMIN,SALT, IS_CREATE, IS_BLOCKED, GENDER, IMG, BIRTHDAY  from PT_USER where ID = ?";
      const post = [id];
      con.connection.query(sql, post, (err, results, fields) => {
        if (err) {
          return done(null, false, { message: '아이디나 비밀번호가 틀렸습니다.' });
        }
        if (!results[0]) return done(null, false, { message: '아이디나 비밀번호가 틀렸습니다.' });
        
        const user = results[0];

        return hasher(
          { password: password, salt: user.SALT },
          function (err, pass, salt, hash) {
            
            if (hash === user.PASSWORD && user.IS_BLOCKED == 0 ) { // 사용자의 비밀번호가 올바른지 확인
              const sql = "update PT_USER set PASSWORD_NOT_CORRECT = 0 WHERE ID = ?";
              const post = [id];
              con.connection.query(sql, post, (err, results, fields) => {
                req.session.displayName = user.ID;
                const sql = "select session_id from sessions where data like ?";
                const post = ['%"ID":"' + id + '",%'];
                con.connection.query(sql, post, (err, results, fields) => {
                  if (!results.length) {                                                   
                     console.log('Error2');
                  }else{
                    var session_id = results[0].session_id;
                    const sql = "delete from sessions WHERE session_id = ?";
                    const post = [session_id];
                    con.connection.query(sql, post, (err, results, fields) => {
                    });
                  }
                done(null, {
                  'SEQ' : user.SEQ,
                  'ID': user.ID,
                  'NAME' : user.NAME,
                  'ISADMIN' : user.ISADMIN,
                  'IS_CREATE' : user.IS_CREATE,
                  'GENDER' : user.GENDER,
                  'IMG' : user.IMG,
                  'BIRTHDAY' : user.BIRTHDAY
                });
               }); });
            }
            else if( user.IS_BLOCKED == 1){
              done(null, false, { message: '계정이 잠긴 상태입니다. 관리자에게 문의 하세요.' });
            }
            else { 
              const sql = "update PT_USER set PASSWORD_NOT_CORRECT = PASSWORD_NOT_CORRECT + 1 WHERE ID = ?";
              const post = [id];
              con.connection.query(sql, post, (err, results, fields) => {
                 
                const sql = "select  PASSWORD_NOT_CORRECT from PT_USER WHERE ID = ?";
                const post = [id];
              con.connection.query(sql, post, (err, results, fields) => {
                console.log('result', results[0]);
                if(results[0].PASSWORD_NOT_CORRECT >= 10){
                  const sql = "update PT_USER set IS_BLOCKED = 1 WHERE ID = ?";
                  const post = [id];
                  con.connection.query(sql, post, (err, results, fields) => {
                    
                    done(null, false, { message: '비밀번호를 10번 이상 틀려, 해당 계정이 잠겼습니다.' });
                  });

                }
                else 
                  done(null, false, { message: '아이디나 비밀번호가 틀렸습니다.' });})
              })
              ;};
        });


      });
    })
);


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

router.get("/fail", (req, res) => {
  res.send("wrong access, please check username and password again");
});


router.post('/register', function (req, res, next) {

  var moment = require('moment');
  var nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
  hasher(
    { password: req.body.password },
    function (err, pass, salt, hash) {
      
      var query = 'INSERT INTO PT_USER(ID, PASSWORD, NAME,  SALT, REG_DATE, ISADMIN ) VALUES(?,?,?,?,?,?)';
      var params = [req.body.id, hash, req.body.name,  salt, nowTime, req.body.isadmin];
      con.connection.query(query, params, function(err, rows, fields) {
        if(err){
          console.log(err);
          res.send({result:false});
        }else{
          no = rows.insertId;
          res.send({result:true});
        }
      });
    }
  );
});


router.post('/passwordchange', function(req, res, next) {
  var moment = require('moment');
var nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
hasher(
  { password: req.body.password },
  function (err, pass, salt, hash) {
    
    var query = 'UPDATE PT_USER SET PASSWORD = ?, SALT = ?, MODFY_DATE = ?, IS_CREATE = ? WHERE ID = ?';
    var params = [hash, salt, nowTime, 0, req.body.id ];
    con.connection.query(query, params, function(err, rows, fields) {
      if(err){
        res.send({result:false});
      }else{
        res.send({result:true});
      }
    });
  }
);
});

router.post('/deleteuser', function(req, res, next) {

  var query = 'UPDATE PT_USER SET IS_DELETE = 1 WHERE ID = ?';
  var params = [req.body.id ];
  con.connection.query(query, params, function(err, rows, fields) {
    if(err){
      console.log('err', err);
      res.send({result:false});
    }else{
      const sql = "select session_id from sessions where data like ?";
              const post = ['%"ID":"' + req.body.id + '",%'];
              con.connection.query(sql, post, (err, results, fields) => {
                if (!results.length) {                                                   
                   console.log('Error2');
                }else{
                  var session_id = results[0].session_id;
                  const sql = "delete from sessions WHERE session_id = ?";
                  const post = [session_id];
                  con.connection.query(sql, post, (err, results, fields) => {
                  });
                }
              });

          res.send({result:true});
        }
      });
});

router.post('/emptyuser', function(req, res, next) {

var query = 'DELETE FROM PT_USER WHERE ID = ?';
var params = [req.body.id ];
con.connection.query(query, params, function(err, rows, fields) {
  if(err){
    console.log('err', err);
    res.send({result:false});
  }else{
        res.send({result:true});
      }
    });
});


router.post('/blockuser', function(req, res, next) {

var query = 'UPDATE PT_USER SET PASSWORD_NOT_CORRECT = 0, ISBLOCKED = 0 WHERE ID = ?';
var params = [req.body.id ];
con.connection.query(query, params, function(err, rows, fields) {
  if(err){
    res.send({result:false});
  }else{
    res.send({result:true});
  }
});
});

router.get('/logout', function(req, res){
  
  delete req.session.displayName;
  req.logout();
  req.session.save(function (err) {
    if (err) throw new Error(err);
    else res.redirect('/');
  });
});

  
router.get("/fail", (req, res) => {
    res.send("wrong access, please check username and password again");
});



module.exports = router;
