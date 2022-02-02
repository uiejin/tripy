
var waterGaugeUI;
var colorBlue;
var feverGaugeUI;
var colorRed;
var bossGaugeUI;
var waterGaugeTimer = 0;
var bossState = false;

class UIScene extends Phaser.Scene {
    UIScene ()
    {
        Phaser.Scene.call(this, { key: 'UIScene' });
    }
    constructor ()
    {
        super({ key: 'UIScene',
        pack: {
            files: [
                    { type: 'scenePlugin', key: 'SpinePlugin', url: '/phaser/plugin/SpinePlugin.js', 
                    sceneKey: 'spine' }
                ]
            }});

    }

    preload ()
    {
        
        this.load.image('uiBack', '/phaserphasergame/images/3rdWeek/uiBack.png');
        this.load.image('bossUI', '/phaserphasergame/images/3rdWeek/bossUI.png');
        this.load.image('weaponUiBomb', '/phaserphasergame/images/3rdWeek/weaponUiBomb.png');
        this.load.image('weaponUiBullet', '/phaserphasergame/images/3rdWeek/weaponUiBullet.png');
        this.load.setPath('/phaser/spine/player/');

        this.load.spine('playerImage', 'playerImage.json',  'playerImage.atlas' , true);


        this.load.spine('heart', 'heart.json',  'heart.atlas' , true);
    }

    create ()
    {
        sceneGame = this.scene.get('GameScene');
        var uiBack = this.add.image(480, 520, 'uiBack');
        //  Our Text object to display the Score
        scoreText = this.add.text(210, 460, 'Score: '+ score, { font: '36px Arial', fill: '#ffffff' });
        coinText = this.add.text(410, 550, 'Coin: '+ playerMoney, { font: '36px Arial', fill: '#ffffff' });
        damageText = this.add.text(210, 550, 'Damage: ' +playerDamage, { font: '30px Arial', fill: '#ffffff' });
        speedText = this.add.text(210, 510, 'Speed: '+playerSpeed, { font: '30px Arial', fill: '#ffffff' });
        levelText = this.add.text(410, 510, 'Stage:' +stagelevel, { font: '30px Arial', fill: '#ffffff' });
        stageClearText = this.add.text(250,250,'', { font: '64px Arial', fill: '#ffffff' });

        spineBoy = this.add.spine(50, 540, 'playerImage', 'normal', true);
        weaponUiBomb = this.add.image(680, 520, 'weaponUiBomb');
        weaponUiBullet = this.add.image(680, 520, 'weaponUiBullet');
        weaponUiBomb.visible = false;
        heart = [];
        for(var i=0; i<playerhpMAX; i++){
            heart[i] = this.add.spine(200+ (i*20), 430 , 'heart', 'animation', true);
        }
        for(var i=playerhp;i<playerhpMAX;i++){
            heart[i].setActive(false).setVisible(false);
        }
        
        

         //  Grab a reference to the Game Scene
         this.scene.get('GameScene').events.on('hitPlayer', function () {
            if(playerhp <= 1){
                heart[0].setActive(false).setVisible(false);
                this.scene.start('GameOverScene');
                
                this.scene.stop('GameScene');
                this.scene.stop('UIScene');
            }else{
                playerhp = playerhp - 1;
                heart[playerhp].setActive(false).setVisible(false);
            }
/*
            for(var i=0; i<playerhp; i++){
                heart[i] = this.add.spine(200+ (i*20), 430 , 'heart', 'animation', true);
            }*/
            spineBoy.play('hit',false, true);
                // info.setText('Score: ' + this.score);
                var timer = this.time.addEvent({ delay: 4000, callback: this.hitPlayerAnim, callbackScope: this, repeat: 0 });             

            /*else{
                // this.score += 10;
                heart[playerhp].setActive(false).setVisible(false);
                spineBoy.play('hit',false, true);
                // info.setText('Score: ' + this.score);
                var timer = this.time.addEvent({ delay: 4000, callback: this.hitPlayerAnim, callbackScope: this, repeat: 0 });
               
            }*/
         }, this);

         this.scene.get('GameScene').events.on('hitBoss', function () {
            if(bossHealth < 1){
               
                
                boss.play('death', true, false);
                var timer = this.time.addEvent({ delay: 16000, callback: this.gameOverScene, callbackScope: this, repeat: 0 });
                bossState = false;
                
            }
         }, this);


         

         this.scene.get('GameScene').events.on('hitEnemy', function () {
 
            score += 10;
            scoreText.setText('Score: ' + score);
         }, this);

        spineBoy.setScale(1);
        //gauge
        colorBlue = Phaser.Display.Color.GetColor(0, 0, 255);

        waterGaugeUI = this.add.graphics({ x: 190, y: 36 });

        colorRed = Phaser.Display.Color.GetColor(255, 0, 0);

        feverGaugeUI = this.add.graphics({ x: 190, y: 36 });


         this.scene.get('InfiniteGameScene').events.on('hitPlayer', function () {
            if(playerhp <= 1){
                heart[0].setActive(false).setVisible(false);
                if(loginStatus  == "true"){
                    $.ajax({
                        url: "/phaserExample/saveInfiniteMode",
                        data: {"id" : userId, "hp": 0, "stageLevel": 0,"playerMoney" : 0,
                        "playerDamage" : playerDamage, "playerSpeed": playerSpeed,"stageMode" : "infiniteMode",
                        "petEnable" : false, "waterGaugeMax": waterGaugeMAX, "score" : score
                    },
                        async: false,
                    type: "get",
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                            success: function (data) {
                    if(data['result'] == true){
                    alert("success save score");
                    };
                        },
                        beforeSend: function () {
                        },
                        complete: function () {
                        }
                    });
                    this.scene.start('GameOverInfiniteScene');

                }else{
                    this.scene.start('GameOverScene');
                }
                
                this.scene.stop('InfiniteGameScene');
                this.scene.stop('UIScene');
            }else{
                playerhp = playerhp - 1;
                heart[playerhp].setActive(false).setVisible(false);
                console.log(playerhp);

            }
/*
            for(var i=0; i<playerhp; i++){
                heart[i] = this.add.spine(200+ (i*20), 430 , 'heart', 'animation', true);
            }*/
            spineBoy.play('hit',false, true);
                // info.setText('Score: ' + this.score);
                var timer = this.time.addEvent({ delay: 4000, callback: this.hitPlayerAnim, callbackScope: this, repeat: 0 });             

            /*else{
                // this.score += 10;
                heart[playerhp].setActive(false).setVisible(false);
                spineBoy.play('hit',false, true);
                // info.setText('Score: ' + this.score);
                var timer = this.time.addEvent({ delay: 4000, callback: this.hitPlayerAnim, callbackScope: this, repeat: 0 });
               
            }*/
         }, this);

    }

    createBossUI(){
            bossUI = this.add.image(40, 50, 'bossUI');
            //bossHeartUI[i] = this.add.spine(100+ (i*10), 50 , 'heart', 'animation', true);
            bossGaugeUI = this.add.graphics({ x: 80, y: 36 });
            bossState = true;

    }


    hitPlayerAnim(){
        spineBoy.play('normal', true, false);
    }

    gameOverScene() {

        this.scene.start('GameOverScene');
        this.scene.stop('GameScene');
        this.scene.stop('UIScene');
    }


    update ()
    {
        waterGaugeUI.clear();
        waterGaugeUI.fillStyle(colorBlue , 1);
        waterGaugeUI.fillRect(0, 360, 400 * (waterGauge / waterGaugeMAX), 8);

        feverGaugeUI.clear();
        feverGaugeUI.fillStyle(colorRed , 1);
        feverGaugeUI.fillRect(0, 352, 400 * (playerFeverGauge / playerFeverGaugeMAX), 8);
        
        if(bossState){
            bossGaugeUI.clear();
            bossGaugeUI.fillStyle(colorRed , 1);
            bossGaugeUI.fillRect(0, 0, 700 * ( bossHealth / 600), 24);
        }
    }

    addScore ()
    {
        score += (10 * stagelevel);
        scoreText.setText('Score: ' + score);
    }

    stageClear ()
    {
        //this.score += 10;
        stageClearText = this.add.text(250,250,'Stage Clear!', { font: '64px Arial', fill: '#ffffff' });
        levelText.setText("Stage level:" + stagelevel);
        //button = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 2, 1, 0);
        retry= retry+1;
        var timer = this.time.addEvent({ delay: 4000, callback: this.gameScenceRestart, 
            callbackScope: this, repeat: 0 });

    }

    addCoinItem (){
        coinText.setText("Coin: "+playerMoney);
    }

    addSpeedItem (){
        speedText.setText("Speed: "+playerSpeed);
    }

    addDamageItem (){
        damageText.setText("Damage: "+playerDamage);
    }

    changeWeaponBullet (){
        weaponUiBomb.visible = false;
        weaponUiBullet.visible = true;
    }
    changeWeaponBomb (){
        weaponUiBomb.visible = true;
        weaponUiBullet.visible = false;
    }

    gameScenceRestart () {
        
        this.scene.stop('GameScene');
        //this.scene.stop('UIScene');
        
        this.scene.start('ShopScene');
        this.scene.restart('UIScene');
        //sceneGame.restartGame();
    }

    restartGame ()
    {
        //this.score += 10;
        //stageClearText.setText("");
        levelText.setText("Stage level:" + stagelevel);
    }

    refreshHeart(){
        //오류 고치기
           //heart[playerhp] = this.add.spine(200+ ((playerhp)*20), 430 , 'heart', 'animation', true);
        
        playerhp = playerhp+1;
        
        heart[playerhp-1].setActive(true).setVisible(true);
        console.log(playerhp);
    }
}
