class SelectScene extends Phaser.Scene {
  SelectScene ()
  {
    Phaser.Scene.call(this, { key: 'SelectScene' });
  };

  constructor ()
  {
    super({
      key: 'SelectScene',
      active: false
    });
  };

  preload() {
    this.load.image('background', '/phasergame/images/background.png');

    this.load.image('btn1','/phasergame/images/fish.png');
    this.load.image('btn2','/phasergame/images/money.png');
  };

  create() {
      var bg = this.add.sprite(720, 1480, 'background');

      var up_btnlist = ['btn1', 'btn2'];
      var up_btn = new Array();
      var i
      for(i=0; i<2; i++){
        up_btn[i] = this.add.sprite(720, 220 * i + 300, up_btnlist[i]).setInteractive(); // 버튼 로드

        up_btn[i].on('pointermove',function(pointer){
          this.setScale(1.2);

        });

        up_btn[i].on('pointerout',function(pointer){
          this.setScale(1.0);
        });
      }

      up_btn[0].on('pointerup',function(pointer){
        // 때면~
        //alert(up_btnlist[0] + "(으)로 이동합니다.");
        this.scene.scene.start('MainScene');
      });
      up_btn[1].on('pointerup',function(pointer){
        this.scene.scene.add('myScene22', testScene, true);
      });
  };

  update(time, dt)
  {



  }
}


