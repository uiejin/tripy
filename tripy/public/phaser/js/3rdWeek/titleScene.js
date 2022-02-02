class TitleScene extends Phaser.Scene {
    TitleScene ()
    {
        Phaser.Scene.call(this, { key: 'TitleScene' });
    }
    constructor ()
    {
        super({ key: 'TitleScene', active: true});

    }

    preload ()
    {
        this.load.crossOrigin = true;
        this.load.audio('boss', [ '/phaser/sound/boss.mp3', 'boss.mp3' ]);
        this.load.audio('death', [ '/phaser/sound/death.wav', 'death.wav' ]);
        this.load.audio('main', [ '/phaser/sound/main.mp3', 'main.mp3' ]);
        this.load.image('kakaoBtn', '/image/login/kakao_account_login_btn_medium_narrow.png');
        this.load.image('naverBtn', '/image/login/naver_account_login_btn.png');
        //this.load.image('userImage', userImage);
    }

    create ()
    {
        //var userName = <%=username%>;
        var TitleText = this.add.text(200,250,'그날밤 목욕탕', { font: '64px Arial', fill: '#ffffff' });
        var TitleText = this.add.text(300,350,userName, { font: '32px Arial', fill: '#ffffff' });
        if(userName == 'user'){
        var kakaoBtn = this.add.sprite(400, 450, 'kakaoBtn').setInteractive();
        var naverBtn = this.add.sprite(400, 500, 'naverBtn').setInteractive();
        kakaoBtn.setScale(1.04);
        naverBtn.setScale(0.2);
        }
        mainSound = this.sound.add('main');
        enemyDeathSound = this.sound.add('death');
        bossSound = this.sound.add('boss');

        //console.log(<%=username%>);
        //alert(loginStatus );

        this.input.on('pointerdown', function () {
    
            this.input.stopPropagation();
             
            //mainSound.play();
            bossSound.stop();
            if(retry == 0){
            //this.scene.start('GameScene');
            this.scene.start('SelectModeScene');
            
            //this.scene.start('GameOverInfiniteScene');
            
            //this.scene.start('UIScene');
            //this.scene.start('ShopScene');
        }
            else{
                //this.scene.restart('GameScene');
                //this.scene.restart('UIScene');
                
            }
        }, this);
        if(userName == 'user'){
            kakaoBtn.on('pointerdown', function () {
    
            window.open("http://localhost:3000/login/kakao","카카오로그인", "width=800, height=700, toolbar=no, menubar=no, scrollbars=no, resizable=yes" );  
            
            //location.replace("/phaserExample/login/kakao");
        
            
            }, this);

            naverBtn.on('pointerdown', function () {
    
            window.open("http://localhost:3000/login/naver","네이버로그인", "width=800, height=700, toolbar=no, menubar=no, scrollbars=no, resizable=yes" );  

            //location.replace("/phaserExample/login/kakao");
        
            
            }, this);
        }

    }

    update ()
    {
        
    }


}
