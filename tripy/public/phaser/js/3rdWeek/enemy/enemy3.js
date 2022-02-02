
var Enemy3 = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

    // Bullet Constructor
    function Enemy (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'enemy3');
        this.speed = 0.2;
        this.health = 7;
        this.born = 0;
        this.direction = 0;
        this.xSpeed = 0.175;
        this.ySpeed = 0.175;
        this.type = Phaser.Math.RND.between(0, 3);
        this.x = 0;
        this.y = 0;
        this.player = null;

        this.setSize(12, 12, true);
    },

    // Fires a bullet from the player to the reticle
    spawn: function (shooter)
    {
        if(this.type ==0){
            this.x = Phaser.Math.RND.between(0, stageWidth[stagelevel-1]);
        }else if(this.type == 1){
            this.x = Phaser.Math.RND.between(0, stageWidth[stagelevel-1]);
            this.y = stageHeight[stagelevel-1];
        }else if(this.type == 2){
            this.x = 0;
            this.y = Phaser.Math.RND.between(0, stageHeight[stagelevel-1]);
        }else if(this.type == 3){
            this.x = stageWidth[stagelevel-1];
            this.y = Phaser.Math.RND.between(0, stageHeight[stagelevel-1]);
        }
        this.setPosition(this.x, this.y); // Initial position
        this.direction = Math.atan( (shooter.x-this.x) / (shooter.y-this.y));

        // Calculate X and y velocity of bullet to moves it from shooter to target
        

        this.rotation = shooter.rotation; // angle bullet with shooters rotation
        this.born = 0; // Time since new bullet spawned
        this.player = shooter;
    },

    // Updates the position of the bullet each cycle
    update: function (time, delta, shooter)
    {
        if(playerX < this.x){
            this.x -= this.xSpeed * delta;;
        }
        else if(playerX == this.x){
            this.x = this.x;
        }else{
            this.x += this.xSpeed * delta;;
        }

        if(playerY < this.y){
            this.y -= this.ySpeed * delta;;
        }else if(playerY == this.y){
            this.y = this.y;
        }else{
            this.y += this.ySpeed * delta;;
        }
        
        
        this.rotation = Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y);
    },
    kill(){
        this.body = Phaser.Physics.Arcade.Body;
        body.enable=false;
        this.destroy(true);
    }




});