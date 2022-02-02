
var config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false
      }
    },
    scene: [TitleScene, GameScene,InfiniteGameScene,UIScene, GameOverScene,GameOverInfiniteScene, ShopScene,SelectModeScene],
    
};


var game = new Phaser.Game(config);
