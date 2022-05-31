
var ttt = false;
var ks = 'http://k.kakaocdn.net/dn/PZbgG/btq17H0kEjd/eV9nkpnBdBW84LdHup83K1/img_110x110.jpg';
class MainUIScene extends Phaser.Scene {
  MainUIScene() {
    Phaser.Scene.call(this, {
      key: 'MainUIScene'
    });
  }
  constructor() {
    super({
      key: 'MainUIScene'
      // plugins: {
      //   global: [{
      //     key: 'WebFontLoader',
      //     plugin: WebFontLoaderPlugin,
      //     start: true
      //   }]
      // }
    });
  }


  preload() {
    //this.load.image('background2', '/phasergame/images/background.png');
    //this.load.image('man', '/phasergame/images/man.png');
    //this.load.image('block', '/phasergame/images/maps2.png');
    //this.load.crossOrigin = true
    //this.load.crossOrigin = 'http://k.kakaocdn.net/dn/PZbgG/btq17H0kEjd/eV9nkpnBdBW84LdHup83K1/img_110x110.jpg'
    //console.log(userImg);
    //자기 정보창
    //this.load.image('playerimg', ks);
    this.load.image('player_picture', '/phasergame/images/UI/status/statuspic.png');
    this.load.image('levelbar', '/phasergame/images/UI/status/levelbar.png')
    this.load.image('s_0', '/phasergame/images/UI/status/s_s.png')
    this.load.image('s_1', '/phasergame/images/UI/status/s_m.png')
    this.load.image('s_2', '/phasergame/images/UI/status/s_e.png')

    // 정보 UI
    this.load.image('todaybar', '/phasergame/images/UI/today.png');
    this.load.image('moneybar', '/phasergame/images/UI/moneybar.png')
    this.load.image('fishbar', '/phasergame/images/UI/fishbar.png')
    this.load.image('ticketbar', '/phasergame/images/UI/ticketbar.png')

    this.load.image('statusbar', '/phasergame/images/UI/statusbar.png')

    // 위쪽 버튼
    this.load.image('spanner', '/phasergame/images/button/Main/spanner.png');
    this.load.image('calculater', '/phasergame/images/button/Main/calculater.png')
    this.load.image('pen', '/phasergame/images/button/Main/pen.png')

    // 아래쪽 버튼
    this.load.image('saw', '/phasergame/images/button/Main/saw.png');
    this.load.image('achievebook', '/phasergame/images/button/Main/achieve.png');
    this.load.image('passport', '/phasergame/images/button/Main/passport.png');
    this.load.image('handle', '/phasergame/images/button/Main/handle.png');
    this.load.image('carrier', '/phasergame/images/button/Main/carrier.png');

    //this.load.addFile(new WebFontFile(this.load, 'Press Start 2P'))
    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
  }
  create() {
    // var Scenemoneyshop = this.scene.add('MoneyShop', MoneyShopScene, false);
    //var imgss = this.add.sprite(550, 100 + 80, 'playerimg')
    console.log(playerIMG)
    // if(check){
    // this.scene.start('MoneyShop');}
    //Scenemoneyshop.scene.events.on("start", function(){});
    //console.log(Scenemoneyshop);
    //var bg2 = this.add.sprite(720, 1480, 'man'); // 예비
    //var blocks = this.add.sprite(600, 1300, 'block');
    //this.add.text(10, 10, "this is a text", { } );
    var statusbars = this.add.sprite(450, 100 + 80, 'statusbar')
    var todaybars = this.add.sprite(270, 300 + 80, 'todaybar')

    var player_pic = this.add.sprite(150, 100 + 80, 'player_picture');
    var levelbar = this.add.sprite(560, 160 + 80, 'levelbar')

    var level_ui = new Array();
    for (var i = 0; i < 3; i++) {
      //console.log('s_'+'i')
      level_ui[i] = this.add.sprite(75 * i + 400, 235, 's_' + i) // 버튼 로드
    }
    var Player_name = this.add.text(320, 70, "홍길동", {
      font: "80px TheFont",
      align: 'right',
      color: '#ffffff'
    });
    var Player_area = this.add.text(620, 170, "경기도 시흥시", {
      font: "30px TheFont",
      align: 'right',
      color: '#ffffff'
    });

    var Player_Today = this.add.text(400, 340, "25", {
      font: "70px TheFont",
      align: 'right',
      color: '#ffffff'
    });

    Gold_Text = this.add.text(1210, 35, Player_Gold, {
      font: "80px TheFont",
      align: 'right',
      color: '#ffffff'
    });

    Coin_Text = this.add.text(1210, 135, Player_Coin, {
      font: "80px TheFont",
      align: 'right',
      color: '#ffffff'
    });

    Ticket_Text = this.add.text(1210, 235, Player_Ticket, {
      font: "80px TheFont",
      align: 'right',
      color: '#ffffff'
    });

    //Gold_Text.setTint(0xffffff);



    // 위쪽 UI
    var up_uilst = ['moneybar', 'fishbar', 'ticketbar'];
    var up_ui = new Array();
    for (var i = 0; i < 3; i++) {
      up_ui[i] = this.add.sprite(1150, 100 * i + 80, up_uilst[i]) // 버튼 로드
    }

    // 위쪽 버튼
    var i;
    var up_btnlist = ['spanner', 'calculater', 'pen', 'pen'];
    var up_btn = new Array();
    var thisUI = this.scene;
    for (i = 0; i < 4; i++) {
      up_btn[i] = this.add.sprite(1330, 200 * i + 450, up_btnlist[i]).setInteractive(); // 버튼 로드

      up_btn[i].on('pointermove', function (pointer) {
        this.setScale(1.2);

      });

      up_btn[i].on('pointerout', function (pointer) {
        this.setScale(1.0);
      });
    }

    up_btn[0].on('pointerup', function (pointer) {
      // 때면~
      thisUI.launch('Inputbox'); // 왜인지 여기 들어오면 this.scene이 달라지네...
      thisUI.moveUp('Inputbox');
      //this.scene.start()
      //alert(up_btnlist[0] + "(으)로 이동합니다.");
      //this.scene.launch('Inputbox');
    });

    //this.scene.launch('MoneyShopScene')
    up_btn[1].on('pointerup', function (pointer) {
      // 때면~
      console.log(this.scene)
      this.scene.launch('MoneyShopScene')
      this.scene.moveUp('MoneyShopScene');
    }, this);

    up_btn[2].on('pointerup', function (pointer) {
      // 때면~

      this.scene.launch('GuestbookScene')
      this.scene.moveUp('GuestbookScene');

      
      $('#myModal').modal('show');
    }, this);

    up_btn[3].on('pointerup', function (pointer) {
      // 때면~
      $.ajax({
        url: "/pharser_user/updatemygoods",
        async: false,
        type: "post",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (data) {
          if (data.result == true) {
            if(data.isLevelUp) {
              alert(data.level +"레벨에 달성 했습니다.");
            }
            alert("경험치 " + data.addExp + "\n 골드 " + data.addGold + "\n 별 " + data.addStar +
            "\n 을 획득하셨습니다.");
            //location.reload();
        };
        },
        beforeSend: function () {},
        complete: function () {}
      });

    }, this);

    // 아래쪽 버튼
    var down_btnlist = ['carrier', 'passport', 'saw', 'achievebook', 'handle'];
    var down_btn = new Array();

    down_btn[0] = this.add.sprite(250 * 0 + 155, 2690, down_btnlist[0]).setInteractive(); // 버튼 로드
    down_btn[1] = this.add.sprite(250 * 1 + 155, 2700, down_btnlist[1]).setInteractive(); // 버튼 로드
    down_btn[2] = this.add.sprite(250 * 2 + 225, 2655, down_btnlist[2]).setInteractive(); // 버튼 로드
    down_btn[3] = this.add.sprite(250 * 3 + 285, 2700, down_btnlist[3]).setInteractive(); // 버튼 로드
    down_btn[4] = this.add.sprite(250 * 4 + 285, 2700, down_btnlist[4]).setInteractive(); // 버튼 로드

    for (i = 0; i < 5; i++) {
      // 버트 누르면 사이즈
      down_btn[i].on('pointermove', function (pointer) {
        this.setScale(1.2);
      });

      down_btn[i].on('pointerout', function (pointer) {
        this.setScale(1.0);
      });
    }

    down_btn[0].on('pointerup', function (pointer) {
      //this.scene.scene.start('SelectScene')
      $('#myGalleryfeed').modal('show');
      //alert(down_btnlist[0] + "(으)로 이동합니다.");a
      // 때면~
    });
    down_btn[1].on('pointerup', function (pointer) {
      $('#myGallerylist').modal('show');
      //alert(down_btnlist[1] + "(으)로 이동합니다.");
      // 때면~
    });

    // 건설하기
    down_btn[2].on('pointerup', function (pointer) {
      console.log(1);
      for (var i = 0; i < 3; i++) {
        fixbtn[i].visible = !fixbtn[i].visible;
      }
      listbar.visible = !listbar.visible;

      fixedtype = 1;

      if (fixbtn[0].visible == false) {
        for (var i = 0; i < treecheckcnt; i++) {
          tree_btn[i].visible = false;
        }

        for (var i = 0; i < tilecheckcnt; i++) {
          tile_btn[i].visible = false;
        }

        for (var i = 0; i < housecheckcnt; i++) {
          house_btn[i].visible = false;
        }
      }
      //alert(down_btnlist[2] + "(으)로 이동합니다.");
      // 때면~
    });

    down_btn[3].on('pointerup', function (pointer) {
      
      //alert(down_btnlist[3] + "(으)로 이동합니다.");
      alert("해당 타일맵을 저장합니다");

      var count = 0;
      for (var i = 0; i < 40; i++) {
        for (var j = 0; j < 40; j++) {
          tempDBMAP[count] = map1["layers"][0]['data'][i][j]['index'];
          tempDBMAP_TOWER[count] = map1["layers"][1]['data'][i][j]['index'];
          tempDBMAP_TREE[count] = map2["layers"][0]['data'][i][j]['index'];
          tempDBMAP_HOUSE[count] = map3["layers"][0]['data'][i][j]['index'];
          count++;
          //console.log('hi');
        }
      }
      alert("해당 타일맵을 저장합니다");

      if (isCreate == false) {
        console.log("isCreate = false")
        $.ajax({
          url: "/pharser/savemap",
          data: {
            "id": userId,
            'mappos': tempDBMAP.toString(),
            'coin' : Player_Gold,
            's_coin' : Player_Coin,
            't_coin' : Player_Ticket,
            'map_id': 1
          },
          async: false,
          type: "post",
          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
          success: function (data) {},
          beforeSend: function () {},
          complete: function () {}
        });
        $.ajax({
          url: "/pharser/savemap_tower",
          data: {
            "id": userId,
            'mappos': tempDBMAP_TOWER.toString(),
            'treepos': tempDBMAP_TREE.toString(),
            'housepos':tempDBMAP_HOUSE.toString(),
            'map_id': 1
          },
          async: false,
          type: "post",
          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
          success: function (data) {},
          beforeSend: function () {},
          complete: function () {}
        });
        $.ajax({
          url: "/pharser/savemap_tower_count",
          data: {
            "id": userId,
            'count': towercount,
            'map_id': 1
          },
          async: false,
          type: "post",
          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
          success: function (data) {},
          beforeSend: function () {},
          complete: function () {}
        });
      } else if (isCreate == true) {
        console.log("isCreate")
        $.ajax({
          url: "/pharser/updatesavemap",
          data: {
            "id": userId,
            'mappos': tempDBMAP.toString(),
            'coin' : Player_Gold,
            's_coin' : Player_Coin,
            't_coin' : Player_Ticket,
            'map_id': 1
          },
          async: false,
          type: "post",
          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
          success: function (data) {},
          beforeSend: function () {},
          complete: function () {}
        });

        $.ajax({
          url: "/pharser/updatesavemap_tower",
          data: {
            "id": userId,
            'mappos': tempDBMAP_TOWER.toString(),
            'treepos': tempDBMAP_TREE.toString(),
            'housepos':tempDBMAP_HOUSE.toString(),
            'map_id': 1
          },
          async: false,
          type: "post",
          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
          success: function (data) {},
          beforeSend: function () {},
          complete: function () {}
        });

        $.ajax({
          url: "/pharser/updatesavemap_tower_count",
          data: {
            "id": userId,
            'count': towercount,
            'map_id': 1
          },
          async: false,
          type: "post",
          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
          success: function (data) {},
          beforeSend: function () {},
          complete: function () {}
        });
      }

    });

    down_btn[4].on('pointerup', function (pointer) {
      this.scene.scene.launch('FriendScene')
      this.scene.scene.moveUp('FriendScene');
      // 때면~
    });
    //this.input.on('gameobjectup', this.clickHandler, this);
    //layer = map.create('level1', 40, 30, 32, 32);

    cointimer = this.time.addEvent({
      delay: 10000, // ms
      callback: GetCoin,
      loop: true
    });

  }
  update() {}
}

function GetCoin() {
  Player_Gold += 150 * towercount;
  Gold_Text.setText(Player_Gold);
}

function UpdateMoney() {
  Gold_Text.setText(Player_Gold);
  Ticket_Text.setText(Player_Ticket);
  Coin_Text.setText(Player_Coin);
}