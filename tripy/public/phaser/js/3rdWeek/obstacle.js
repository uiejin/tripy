
var Obstacle = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

    // Bullet Constructor
    function Obstacle (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'obstacle');
        this.x = 0;
        this.y = 0;
        this.type = Phaser.Math.RND.between(0, 1);
        this.setSize(12, 12, true);
    },

    // Fires a bullet from the player to the reticle
    spawn: function ()
    {
        if(this.type ==0){
            this.x = Phaser.Math.RND.between(100, 700);
            this.y = Phaser.Math.RND.between(200, 1000);
        }else if(this.type == 1){
            this.x = Phaser.Math.RND.between(1000, 1500);
            this.y = Phaser.Math.RND.between(200, 1000);
        }
        this.setPosition(this.x, this.y);
    },

    // Updates the position of the bullet each cycle
    update: function (time, delta, shooter)
    {
        
    },

    kill(){
        this.body = Phaser.Physics.Arcade.Body;
        body.enable=false;
        this.destroy(true);
    }



});