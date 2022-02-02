class GameOverScene extends Phaser.Scene {
    GameOverScene ()
    {
        Phaser.Scene.call(this, { key: 'GameOverScene' });
    }
    constructor ()
    {
        super({ key: 'GameOverScene'});

    }

    preload ()
    {
        
    }

    create ()
    {
        var TitleText = this.add.text(200,250,'GameOver', { font: '64px Arial', fill: '#ffffff' });
        var TitleText = this.add.text(300,350,'back to titleScene..', { font: '32px Arial', fill: '#ffffff' });

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