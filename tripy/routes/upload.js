//upload.js

const express = require('express');
const router = express.Router();
const path = require("path");


let AWS = require("aws-sdk");
let s3 = new AWS.S3({
    accessKeyId: 'AKIAVQCH2QENAFQEHBHY', 
    secretAccessKey: '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',
    region : 'ap-northeast-2'
});

let multer = require("multer");
let multerS3 = require('multer-s3');
let upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "tripy-develop/test-img",
        key: function (req, file, cb) {
             let extension = path.extname(file.originalname);
             cb(null, Date.now().toString() + extension)
        },
        acl: 'public-read-write',
    })

})

let uploadNotice = multer({
    storage: multerS3({
        s3: s3,
        bucket: "tripy-develop/notice-img",
        key: function (req, file, cb) {
             let extension = path.extname(file.originalname);
             cb(null, Date.now().toString() + extension)
        },
        acl: 'public-read-write',
    })

})

let uploadVideo = multer({
    storage: multerS3({
        s3: s3,
        bucket: "masterzdobeen/video/input",
        key: function (req, file, cb) {
             let extension = path.extname(file.originalname);
             cb(null, Date.now().toString() + extension)
        },
        acl: 'public-read-write',
    })

})
// 강의 등록. 추후 강의 등록시 사용
router.post('/upload', upload.fields([{name : "img_main", maxCount: 1},
{name : "img_val1", maxCount: 1}, {name : "img_val2", maxCount: 1},
{name : "img_val3", maxCount: 1}]), function(req, res, next){
    //console.log('res: ', res);
    var contentType = req.headers['content-type'];
    console.log('contentType: ', req.files);
    //console.log(req);

    res.send({result:req.files});
})

router.post('/uploadvideo', uploadVideo.single("img_main"), function(req, res, next){
    var contentType = req.headers['content-type'];
    console.log('contentType: ', contentType);
    console.log(req.file);
    
    console.log(req.file.location);

    console.log(req.file.key);

    var fileKey = req.file.key;
    var fileKeySplit = fileKey.split('.');
    
    console.log(fileKeySplit);
    var videoPath = 'https://masterzdobeen.s3.ap-northeast-2.amazonaws.com/video/output/';
    var videoThumbnail = videoPath;
    console.log(videoPath);
    videoThumbnail = videoPath + fileKeySplit[0] + "/Default/Thumbnails/" + fileKeySplit[0] +".0000000.jpg";
    videoPath = videoPath + fileKeySplit[0] + "/Default/HLS/" + fileKeySplit[0];
    var videoPath720 = videoPath + "_720.m3u8";
    var videoPath540 = videoPath + "_540.m3u8";
    var videoPath360 = videoPath + "_360.m3u8";
    videoPath = videoPath+ ".m3u8";

    var request = {
        "videoPath" : videoPath,
        "videoPath720" : videoPath720,
        "videoPath540" : videoPath540,
        "videoPath360" : videoPath360,
        "videoThumbnail" : videoThumbnail
    };
    console.log(request);

    res.send({request});
})

router.post('/uploadcategory', upload.fields([{name : "img_main", maxCount: 1}]), 
function(req, res, next){
    var contentType = req.headers['content-type'];
    console.log('contentType: ', req.files);

    res.send({result:req.files});
})


router.post('/uploadsummernote', uploadNotice.single("file"), 
function(req, res, next){
    var contentType = req.headers['content-type'];
    console.log('contentType: ', contentType);
    console.log(req.file);
    
    console.log(req.file.location);

    res.send({result:req.file.location});
})

router.post('/upload1', uploadNotice.single("img_val1"), function(req, res, next){
    var contentType = req.headers['content-type'];
    console.log('contentType: ', contentType);
    console.log(req.file);
    
    console.log(req.file.location);

    res.send({result:req.file.location});
})


router.post('/upload2', uploadNotice.single("img_val2"), function(req, res, next){
    var contentType = req.headers['content-type'];
    console.log('contentType: ', contentType);
    console.log(req.file);
    
    console.log(req.file.location);

    res.send({result:req.file.location});
})

router.post('/upload3', uploadNotice.single("img_val3"), function(req, res, next){
    var contentType = req.headers['content-type'];
    console.log('contentType: ', contentType);
    console.log(req.file);
    
    console.log(req.file.location);

    res.send({result:req.file.location});
})




module.exports = router