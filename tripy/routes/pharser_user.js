var express = require('express');
const moment = require('moment');
var router = express.Router();
var async = require('async');

var mysql = require('mysql');

var passport = require('passport');

var con =require("../db/index.js");



router.post('/updatemygoods', function (req, res) {
    
    var isSuccess = false;
    var nowTime = moment();
    var nowTimes = moment().format('YYYY-MM-DD HH:mm:ss');
    
    var addGold = 0;
    var addStar = 0;
    var addExp = 0;
    async.waterfall([
        function(cd) {
            var query = 'SELECT T1.NO, T1.TOWER_NO, T1.TOWER_LEVEL, T1.GOODS_DATE, ' +
            'T2.TITLE, T2.CONTENT, T2.POPULARY, ' +
            '(SELECT AREA FROM PT_AREA WHERE SEQ = T2.AREA_TYPE) AS AREA_NAME, ' +
            'T3.GOLD, T3.STAR, T3.EXP, T3.RUNNIG_TIME ' +
            'FROM PT_PHASER_USER_INVENTORY T1, PT_PHASER_TOWER_ITEM T2, PT_PHASER_TOWER_PRODUCE T3 ' +
            'WHERE USER_SEQ = ? AND IS_ESTABLISH = 1 AND T1.TOWER_NO = T3.TOWER_NO AND T1.TOWER_NO = T2.NO';
    
            var params = [req.user.SEQ];
    
            con.connection.query(query, params, function(err, rows, fields){
            
                    if (err) {
                        console.log(err);
                        cd("error");
                    } else if (rows.length > 0) {
                        for(var i=0; i< rows.length; i++){
                            var goodsDate = moment(rows[i].GOODS_DATE);
                            //var goodsDate = goodsDateFormat.format('YYYY-MM-DD HH:mm:ss');
                            console.log("nowTime = " + nowTime);
                            console.log("goodsDate = " + goodsDate);
                            if(nowTime > goodsDate){
                                var secondDiff = moment.duration(nowTime - goodsDate).asSeconds();
                                //var duration = moment.duration(nowTime - goodsDate);
                                //var secondDiff = duration.asSeconds();
                                if(secondDiff >= rows[i].RUNNIG_TIME)
                                {
                                    addGold += rows[i].GOLD;
                                    addStar += rows[i].STAR;
                                    addExp += rows[i].EXP;
                                }
                                else
                                {
                                    addGold += Math.floor((rows[i].GOLD / rows[i].RUNNIG_TIME) * secondDiff);
                                    addStar += Math.floor((rows[i].STAR / rows[i].RUNNIG_TIME) * secondDiff);
                                    addExp += Math.floor((rows[i].EXP / rows[i].RUNNIG_TIME) * secondDiff);
                                }
                            }
                            else {
                                console.log("데이트 못가져옴");
                                console.log(err);
                            }
                        }
                        isSuccess = true;
                        req.user.EXP = req.user.EXP + addExp;
                        req.user.GOLD = req.user.GOLD + addGold;
                        req.user.STAR = req.user.STAR + addStar

                        console.log(req.user);
                        
                        cd(null,isSuccess, addGold, addExp, addStar);
                }else{
                    cd("error");
                }
                
            });
    },
    function(isSuccess, addGold, addExp, addStar, cd){
        var query = 'UPDATE PT_USER SET EXP = ?, GOLD= ?, STAR = ? WHERE SEQ = ?';
        var params = [req.user.EXP, req.user.GOLD, req.user.STAR, req.user.SEQ];
        
        var isLevelUp = false;
        con.connection.query(query, params, function (err, rows, fields) {
            if (err) {
                console.log(err);
                cd("error");
            } else {
                
                var query = 'SELECT T1.LEVEL, T1.EXP, T2.EXP AS LEVEL_UP_EXP FROM PT_USER T1, PT_LEVEL_TABLE T2 WHERE SEQ = ? AND T1.LEVEL = T2.LEVEL';

                var params = [req.user.SEQ];

                con.connection.query(query, params, function (err, rows, fields) {
                    if (err) {
                        console.log(err);
                        cd("error");
                    } else {

                        if(rows[0].EXP >= rows[0].LEVEL_UP_EXP){
                            var leftover = rows[0].EXP - rows[0].LEVEL_UP_EXP;

                            var query = 'UPDATE PT_USER SET LEVEL = LEVEL + 1, EXP= ? WHERE SEQ = ?';
                            var params = [leftover, req.user.SEQ];
                            con.connection.query(query, params, function (err, rows, fields) {
                                if (err) {
                                    console.log(err);
                                    cd("error");
                                } else {
                                    isLevelUp = true;
                                    req.user.LEVEL = req.user.LEVEL + 1;
                                }
                            });
                        }
                        cd(null, isSuccess, addGold, addExp, addStar, isLevelUp);
                    }
                });
            }
        });
    },
    function(isSuccess, addGold, addExp, addStar, isLevelUp, cd){
        var query = 'UPDATE PT_PHASER_USER_INVENTORY SET GOODS_DATE = ? WHERE USER_SEQ = ?';
        var params = [nowTimes, req.user.SEQ];
        
        con.connection.query(query, params, function (err, rows, fields) {
            if (err) {
                console.log(err);
                cd("error");
            } else {
                 cd(null, isSuccess, addGold, addExp, addStar, isLevelUp);
            }
        });
    },
    ], function(err, isSuccess, addGold, addExp, addStar, isLevelUp) {
        if(err){
            res.send({ result: false });
        }
        else{
            console.log(4);
            if(isSuccess){
                
            res.send({ isLevelUp : isLevelUp, level : req.user.LEVEL, addGold : addGold, addExp : addExp, addStar : addStar, result: true, isSuccess : isSuccess });
            }
            else {
                
                res.send({ result: false });
            }
            //res.send({ isLevelUp : isLevelUp, result: true, distance: distance });
            //res.send({ result: true });
        }

    });

});
module.exports = router;