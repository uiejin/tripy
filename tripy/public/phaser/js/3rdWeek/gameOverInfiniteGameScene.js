class GameOverInfiniteScene extends Phaser.Scene {
    GameOverScene ()
    {
        Phaser.Scene.call(this, { key: 'GameOverInfiniteScene' });
    }
    constructor ()
    {
        super({ key: 'GameOverInfiniteScene'});

    }

    preload ()
    {
        
    }

    create ()
    {
        var TitleText = this.add.text(200,50,'GameOver', { font: '32px Arial', fill: '#ffffff' });
        var TitleText = this.add.text(300,100,'HighScore - Infinite Mode', { font: '32px Arial', fill: '#ffffff' });
        var TitleText1 = this.add.text(100,150,'', { font: '28px Arial', fill: '#ffffff' });
        var TitleText2 = this.add.text(100,200,'', { font: '28px Arial', fill: '#ffffff' });
        var TitleText3 = this.add.text(100,250,'', { font: '28px Arial', fill: '#ffffff' });
        var TitleText4 = this.add.text(100,300,'', { font: '28px Arial', fill: '#ffffff' });
        var TitleText5 = this.add.text(100,350,'', { font: '28px Arial', fill: '#ffffff' });
        var TitleText6 = this.add.text(100,450,'', { font: '28px Arial', fill: '#ffffff' });
        var TitleText7 = this.add.text(100,500,'', { font: '28px Arial', fill: '#ffffff' });
        var TitleText8 = this.add.text(100,550,'', { font: '28px Arial', fill: '#ffffff' });
        

        $.ajax({
			url: "/phaserExample/getInfiniteScore",
            data: {"stageMode" : "infiniteMode"},
			async: false,
        type: "get",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    var y = 0;
        $.each(data.rows, function (index, item) {
            if(index == 0)
            TitleText1.setText(index+1 + ": " + "   ID :" + item.ID+ "   SCORE :" +item.SCORE);
            if(index == 1)
            TitleText2.setText(index+1 + ": " + "   ID :" + item.ID+ "   SCORE :" +item.SCORE);
            if(index == 2)
            TitleText3.setText(index+1 + ": " + "   ID :" + item.ID+ "   SCORE :" +item.SCORE);
            if(index == 3)
            TitleText4.setText(index+1 + ": " + "   ID :" + item.ID+ "   SCORE :" +item.SCORE);
            if(index == 4)
            TitleText5.setText(index+1 + ": " + "   ID :" + item.ID+ "   SCORE :" +item.SCORE);
            if(index == 5)
            TitleText6.setText(index+1 + ": " + "   ID :" + item.ID+ "   SCORE :" +item.SCORE);
            if(index == 6)
            TitleText7.setText(index+1 + ": " + "   ID :" + item.ID+ "   SCORE :" +item.SCORE);
            if(index == 7)
            TitleText8.setText(index+1 + ": " + "   ID :" + item.ID+ "   SCORE :" +item.SCORE);
            
        });
        },
			beforeSend: function () {
			},
			complete: function () {
			}
		});

        this.input.on('pointerdown', function () {
    
            this.input.stopPropagation();
            this.scene.start('TitleScene');
        }, this);

        mainSound.stop();
        bossSound.stop();;

    }

    update ()
    {
        
    }


}