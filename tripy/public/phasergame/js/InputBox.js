const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
var guestcount = 0; // 총 갯수
var maxguestpagecount = 0; // 페이지 갯수 = 총 갯수 / 4;
var guestonepage = 0; // ( 마지막 페이지 ) => 한 페이지의 갯수 = 총갯수 - ( 페이지 * 4 )

//var d = new Date(year, month, day, hours, minutes, seconds, milliseconds);
var nowday = new Date();
var g_year, g_month, g_days, g_hour, g_minute;
var g_content;
var g_name, g_picture;

var content = `Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.`;

class Inputbox extends Phaser.Scene {
    Inputbox() {
        Phaser.Scene.call(this, {
            key: 'Inputbox'
        });
    }
    constructor() {
        super({
            key: 'Inputbox'
        });

    }

    preload() {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });

        this.load.image('nextPage', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assetsphasergame/images/arrow-down-left.png');
    }
    create() {
        // 글씨 적는 너비 
        var g_ypos = 690
       
        maxguestpagecount = parseInt((guestcount - 1) / 4);
        var starting = 0 + ( maxguestpagecount * 4 );
        guestonepage = guestcount - (maxguestpagecount * 4)
        console.log(guestcount, maxguestpagecount, starting, guestonepage);
        for (var i = starting; i < starting + guestonepage; i++) {
            //console.log(i, guestcount);
            
            createTextBox(this, 100, g_ypos + (350 * i), {
                    wrapWidth: 600,
                    fixedWidth: 720,
                    fixedHeight: 150,
                })
                .start(gusetchart[i].content, 0); // 쓰기 속도
            //getguestlist(nowday.getFullYear(), nowday.getMonth(), nowday.getDate(), nowday.getHours(), nowday.getMinutes());
            var Name = this.add.text(400, g_ypos + 50 + (350 * i), '홍길동', {
                font: '60px Courier',
                fill: '#ffffff'
            });
            var yeartext = gusetchart[i].day.year + '.' + (gusetchart[i].day.month + 1) + '.' + gusetchart[i].day.days + '.  '
                + gusetchart[i].day.hour + ' : ' + gusetchart[i].day.minute;
            var Yeartext = this.add.text(400, g_ypos + 210 + (350 * i), yeartext, {
                font: '35px Courier',
                fill: '#ffffff'
            });
        }
        

    }
    update() {
        //console.log(nowday);
        // ch_fish.setText(ch_count1);
        // ch_book.setText(ch_count2);
        //console.log(ch_count1)
    }
}

const GetValue = Phaser.Utils.Objects.GetValue;

var createTextBox = function (scene, x, y, config) {
    console.log('createbox')
    var wrapWidth = GetValue(config, 'wrapWidth', 0);
    var fixedWidth = GetValue(config, 'fixedWidth', 0);
    var fixedHeight = GetValue(config, 'fixedHeight', 0);
    var textBox = scene.rexUI.add.textBox({
            x: x,
            y: y,

            background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY)
                .setStrokeStyle(2, COLOR_LIGHT), // 배경박스 색상

            icon: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_DARK), // 점점점 색상

            // text: getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight),
            text: getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight), // 글씨 관련

            action: scene.add.image(0, 0, 'nextPage').setTint(COLOR_LIGHT).setVisible(false), // 이미지 색상

            space: {
                left: 20,
                right: 20,
                top: 130,
                bottom: 20,
                icon: 250,
                text: 10, // 거리 조절
            }
        })
        .setOrigin(0)
        .layout();
    
    textBox
        .setInteractive()
        .on('pointerdown', function () {
            var icon = this.getElement('action').setVisible(false);
            this.resetChildVisibleState(icon);
            if (this.isTyping) {
                this.stop(true);
            } else {
                this.typeNextPage();
            }
        }, textBox)
        .on('pageend', function () {
            if (this.isLastPage) {
                return;
            }

            var icon = this.getElement('action').setVisible(true);
            this.resetChildVisibleState(icon);
            icon.y -= 30;
            var tween = scene.tweens.add({
                targets: icon,
                y: '+=30', // '+=100'
                ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 500,
                repeat: 0, // -1: infinity
                yoyo: false
            });
        }, textBox)
    //.on('type', function () {
    //})

    

    return textBox;
}

var getBuiltInText = function (scene, wrapWidth, fixedWidth, fixedHeight) {
    console.log("me")
    return scene.add.text(0, 0, '', {
            fontSize: '20px',
            wordWrap: {
                width: wrapWidth
            },
            maxLines: 3
        })
        .setFixedSize(fixedWidth, fixedHeight);
}

var getBBcodeText = function (scene, wrapWidth, fixedWidth, fixedHeight) {
    return scene.rexUI.add.BBCodeText(0, 0, '', {
        fixedWidth: fixedWidth,
        fixedHeight: fixedHeight,

        fontSize: '35px',
        wrap: {
            mode: 'word',
            width: wrapWidth
        },
        maxLines: 3
    })
}

var gusetchart = new Array();

var getguestlist = function(_content, _year, _month, _days, _hour, _minute)
{
    // 배열에 있는 object를 초기화 하지 않으면 같은 값이 들어간다.
    var guestlist = {
        picture: g_picture,
        name: g_name,
        content: g_content,
        day: {
            'year': g_year,
            'month': g_month,
            'days': g_days,
            'hour': g_hour,
            'minute': g_minute
        }
    }

    guestlist.content = _content;
    var gday = guestlist.day
    gday.year = _year;
    gday.month = _month;
    gday.days = _days;
    gday.hour = _hour;
    gday.minute = _minute;
   
    gusetchart.unshift(guestlist); // 한개씩 푸쉬
    this.picture = guestlist.picture;
}