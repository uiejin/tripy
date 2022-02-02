
var ratios = 1
var config = {
  type: Phaser.AUTO,  //Phaser will decide how to render our game (WebGL or Canvas)
  parent: 'phaser-example',
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'phaser-example',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1440,
    height: 2960,
},
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 0 },
        debug: false
      }
  },
  scene: [ MainScene, SelectScene, MapScene, MapScene2,MoneyShopScene, MainUIScene, GuestbookScene, GuestbookWrite, Inputbox]
};

var game = new Phaser.Game(config);
