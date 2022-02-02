class SelectModeScene extends Phaser.Scene {
    SelectModeScene ()
    {
        Phaser.Scene.call(this, { key: 'SelectModeScene' });
    }
    constructor ()
    {
        super({ key: 'SelectModeScene'});

    }

    preload ()
    {
        this.load.image('selectMode1', '/phaserphasergame/images/3rdWeek/selectMode1.png');
        this.load.image('selectMode2', '/phaserphasergame/images/3rdWeek/selectMode2.png');
        
    }

    create ()
    {
        var TitleText = this.add.text(270,30,'Select Mode', { font: '48px Arial', fill: '#ffffff' });
       // var TitleText = this.add.text(300,350,'back to titleScene..', { font: '32px Arial', fill: '#ffffff' });
       var selectMode1 = this.add.sprite(300, 350, 'selectMode1').setInteractive();
       var selectMode2 = this.add.sprite(510, 350, 'selectMode2').setInteractive();
       selectMode1.setScale(0.8);
       selectMode2.setScale(0.8);

       /*
        this.input.on('pointerdown', function () {
    
            this.input.stopPropagation();
            this.scene.start('TitleScene');
        }, this);      
*/
            if(loginStatus  =='true'){
                $.ajax({
                    url: "/phaserExample/getSaveStageMode",
                    data: {"id" : userId, "stageMode" : 'stageMode'},
                    async: false,
                type: "get",
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        success: function (data) {
                if(data['result'] == true){
                    $.each(data.rows, function (index, item) {
                    playerhp = item.HP;
                    stagelevel = item.STAGE;
                    playerSpeed = item.SPEED;
                    playerMoney = item.COIN;
        
                    petEnable = item.PETENABLE;
                    if(petEnable == "true"){
                        petEnable = true;
                    }else{
                        petEnable = false;
                    }
                    waterGaugeMAX = item.WATERGAUGEMAX;
                    score = item.SCORE;
                    playerDamage = item.DAMAGE;
                       
                });
                };
                    },
                    beforeSend: function () {
                        
                    },
                    complete: function () {
                    }
                });
               }

        selectMode1.on('pointerdown', function (pointer) {

            this.setTint(0xff0000);

            player= null;
            enemy = null;
            healthpoints= null;
            reticle= null;
            moveKeys= null;
            playerBullets= null;
            playerBombs= 10;
            enemyBullets= null;
            enemyGroup = null;
            playerWeaponType ='BULLET';
            playerWeaponChange = false;
            playerX = null;
            playerY = null;

            boss = null;
            bossHealth = 600;

            bossReload = null;
            enemycount = 0;
            hitBoss = false;

            
            enemys =[];

            hitPlayer = false;
            speedItemEnable = false;
            damageItemEnable = false;
            coinItemEnable = false;

            itemX = null;
            itemY = null;
            sceneUI = null;
            sceneGame = null;
            cursors;

            //UIscence

            scoreText = null;
            stageClearText = null;
            levelText = null;
            speedText = null;
            damageText = null;
            bossUI = null;

            //shopUI
            shopBG = null;
            

            bossHeartUI = [];

            spineBoy = null;

            if(retry == 0){
                this.scene.scene.start('GameScene');
                //this.scene.start('SelectModeScene');
                this.scene.scene.start('UIScene');
                //this.scene.scene.start('ShopScene');
            }
                else{
                    this.scene.scene.restart('GameScene');
                    this.scene.scene.restart('UIScene');
                    
            }
        });

        selectMode2.on('pointerdown', function (pointer) {

            this.setTint(0xff0000);
            playerhp = 25;
            playerhpMAX = 25;


            player= null;
            enemy = null;
            healthpoints= null;
            reticle= null;
            moveKeys= null;
            playerBullets= null;
            playerBombs= 10;
            enemyBullets= null;
            enemyGroup = null;
            stagelevel = 1;
            playerSpeed = 400;
            playerWeaponType ='BULLET';
            playerWeaponChange = false;
            playerX = null;
            playerY = null;
            playerMoney = 0;

            boss = null;
            bossHealth = 600;

            bossReload = null;
            enemycount = 0;
            hitBoss = false;

            playerDamage = 1;

            enemys =[];

            hitPlayer = false;
            speedItemEnable = false;
            damageItemEnable = false;
            coinItemEnable = false;

            itemX = null;
            itemY = null;
            sceneUI = null;
            sceneGame = null;
            cursors;

            //UIscence

            scoreText = null;
            stageClearText = null;
            levelText = null;
            speedText = null;
            damageText = null;
            bossUI = null;

            //shopUI
            shopBG = null;
            score = 0;


            bossHeartUI = [];

            spineBoy = null;
            if(retry == 0){
                this.scene.scene.start('InfiniteGameScene');
                //this.scene.start('SelectModeScene');
                this.scene.scene.start('UIScene');
                //this.scene.scene.start('ShopScene');
            }
                else{
                    this.scene.scene.restart('InfiniteGameScene');
                    this.scene.scene.restart('UIScene');
                    
            }
        });


    }

    update ()
    {
        
    }


}