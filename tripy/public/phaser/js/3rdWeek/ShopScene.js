var iter = 0;
var btnEnalbe = false;
var itemSelected = "";
class ShopScene extends Phaser.Scene {
    ShopScene ()
    {
        Phaser.Scene.call(this, { key: 'ShopScene'} );
    }
    constructor ()
    {
        super({ key: 'ShopScene',
        pack: {
            files: [
                    { type: 'scenePlugin', key: 'SpinePlugin', url: '/phaser/plugin/SpinePlugin.js', 
                    sceneKey: 'spine' }
                ]
            }});

        this.score = 0;
    }

    preload ()
    {
        
        this.load.image('uiBack', '/phaserphasergame/images/3rdWeek/uiBack.png');
        this.load.image('shopBG', '/phaserphasergame/images/3rdWeek/shopBG.png');
        this.load.image('heartItem', '/phaserphasergame/images/3rdWeek/heartItem.png');
        this.load.image('petItem', '/phaserphasergame/images/3rdWeek/petItem.png');
        this.load.image('waterItem', '/phaserphasergame/images/3rdWeek/waterItem.png');
        this.load.image('buyBtn', '/phaserphasergame/images/3rdWeek/buyBtn.png');
        this.load.image('playBtn', '/phaserphasergame/images/3rdWeek/playBtn.png');
        this.load.image('cancleBtn', '/phaserphasergame/images/3rdWeek/cancleBtn.png');
        this.load.setPath('/phaser/spine/player/');
        this.load.spine('seller', 'shop.json',  'shop.atlas' , true);
    }

    create ()
    {
        
        sceneGame = this.scene.get('GameScene');
        sceneUI = this.scene.get('UIScene');
       // shopBG = this.add.tileSprite(400,0,0,0,'shopBG');
       // shopBG.setScale(1.7);
        var uiBack = this.add.image(480, 90, 'uiBack');
        var tween = this.tweens.addCounter({
            from: 1,
            to: 2,
            duration: 5000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });

        //sceneUI.addCoinItem();

        seller = this.add.spine(80, 220, 'seller', 'animation', true);

        var hearItem = this.add.sprite(200, 300, 'heartItem').setInteractive();
        var petItem = this.add.sprite(350, 300, 'petItem').setInteractive();
        var waterItem = this.add.sprite(500, 300, 'waterItem').setInteractive();
        itemText = this.add.text(210, 50, '아이템을 클릭하면 살수있어.', { font: '24px Arial', fill: '#ffffff' });
        buyBtn = this.add.sprite(600, 130, 'buyBtn').setInteractive();
        cancleBtn = this.add.sprite(710, 130, 'cancleBtn').setInteractive();
        playBtn = this.add.sprite(700, 300, 'playBtn').setInteractive();
        buyBtn.visible  = false;
        cancleBtn.visible  = false;


        hearItem.on('pointerdown', function (pointer) {

            this.setTint(0xff0000);
            itemText.setText("체력을 1회복해주는 아이템이야\n구매할꺼야?\n30코인 소모");
            seller.play('buy',false, true);
            btnEnalbe = true;
            var timer = this.scene.time.addEvent({ delay: 4000, callback: this.scene.changSellerAnim, callbackScope: this, repeat: 0 });
            itemSelected = "heartItem";
            buyBtn.visible  = true;
            cancleBtn.visible  = true;

        });
        hearItem.on('pointerout', function (pointer) {

            this.clearTint();
    
        });
    
        hearItem.on('pointerup', function (pointer) {
    
            this.clearTint();
            console.log("on");
    
        });
        petItem.on('pointerdown', function (pointer) {
            console.log(petEnable);
            this.setTint(0xff0000);
            if(petEnable == false){
            itemText.setText("플레이어와 같이 물총을 발사하는 펫이야\n구매할꺼야?\n200코인 소모");
            seller.play('buy',false, true);
            btnEnalbe = true;
            var timer = this.scene.time.addEvent({ delay: 4000, callback: this.scene.changSellerAnim, callbackScope: this, repeat: 0 });
            itemSelected = "petItem";
            buyBtn.visible  = true;
            cancleBtn.visible  = true;
            }else{
                itemText.setText("이미 펫을 구매했어!");

            }

        });
        petItem.on('pointerout', function (pointer) {

            this.clearTint();
    
        });
    
        petItem.on('pointerup', function (pointer) {
    
            this.clearTint();
            console.log("on");
    
        });

        waterItem.on('pointerdown', function (pointer) {
            this.setTint(0xff0000);
            itemText.setText("물총의 제한을 늘려주는 아이템이야 \n최대 물총 : "+waterGaugeMAX+"\n50코인 소모");
            seller.play('buy',false, true);
            btnEnalbe = true;
            var timer = this.scene.time.addEvent({ delay: 4000, callback: this.scene.changSellerAnim, callbackScope: this, repeat: 0 });
            itemSelected = "waterItem";
            buyBtn.visible  = true;
            cancleBtn.visible  = true;

        });
        waterItem.on('pointerout', function (pointer) {

            this.clearTint();
    
        });
    
        waterItem.on('pointerup', function (pointer) {
    
            this.clearTint();
    
        });


        buyBtn.on('pointerdown', function (pointer) {
            if(itemSelected == 'heartItem'){
                if(playerMoney < 30){
                    itemText.setText("아이템을 구매하기엔 돈이 모자른걸?");

                }
                else if(playerhp >=playerhpMAX){
                    itemText.setText("이미 체력이 최대 한도야!");
                }
                else{
                    playerMoney=playerMoney-30;
                    itemText.setText("고마워\n체력을 1회복 했어!");
                    sceneUI.refreshHeart();
                    sceneUI.addCoinItem();
                }
            }
            if(itemSelected == 'petItem'){
                if(playerMoney < 200){
                    itemText.setText("펫을 구매하기엔 돈이 모자른걸?");

                }
                
                else{
                    playerMoney=playerMoney-200;
                    petEnable = true;
                    itemText.setText("고마워\n펫을 획득 했어!");
                    //sceneUI.refreshHeart();
                    sceneUI.addCoinItem();
                }
            }
            if(itemSelected == 'waterItem'){
                if(playerMoney < 50){
                    itemText.setText("아이템을 구매하기엔 돈이 모자른걸?");

                }
                
                else{
                    playerMoney=playerMoney-50;
                    waterGaugeMAX = waterGaugeMAX+25;
                    waterGauge = waterGaugeMAX;
                    itemText.setText("고마워\n물총의 한도가 증가했어!");
                    sceneUI.refreshHeart();
                    sceneUI.addCoinItem();
                }
            }
            buyBtn.visible  = false;
            cancleBtn.visible  = false;

        });

        cancleBtn.on('pointerdown', function (pointer) {
            
            itemText.setText("아이템을 클릭하면 살수있어.");
            itemSelected = "";
            buyBtn.visible  = false;
            cancleBtn.visible  = false;

        });

        playBtn.on('pointerdown', function (pointer) {
            
            if(retry == 0){
                //this.scene.start('ShopScene');
            this.scene.scene.start('GameScene');
            }
                else{
                    this.scene.scene.start('GameScene');
                    
                }
                this.scene.scene.stop('ShopScene');
        });

        if(btnEnalbe)
        {
            
        }

    }
    changSellerAnim(){
        seller.play('animation', true, false);
    }

    update ()
    {
        
        
        //shopBG.tilePositionY = Math.sin(iter) * 1000;
        iter += 0.01;
    }

}
