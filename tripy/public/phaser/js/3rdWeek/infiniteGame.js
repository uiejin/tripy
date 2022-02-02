var petAngle = 0;


class InfiniteGameScene extends Phaser.Scene {
    GameScene ()
    {
        Phaser.Scene.call(this, { key: 'InfiniteGameScene' });
    }
    constructor ()
    {
        super({ key: 'InfiniteGameScene',
        
        pack: {
            files: [
                    { type: 'scenePlugin', key: 'SpinePlugin', url: '/phaser/plugin/SpinePlugin.js', 
                    sceneKey: 'spine' }
                ]
            }});
    }

    preload ()
    {
       // Load in images and sprites
        this.load.spritesheet('player_handgun', '/phaserphasergame/images/3rdWeek/player.png',
            { frameWidth: 66, frameHeight: 60 }
        ); 
        this.load.image('bullet', '/phaserphasergame/images/3rdWeek/bullet.png');
        this.load.image('bomb', '/phaserphasergame/images/3rdWeek/bomb.png');
        this.load.image('enemyBullet', '/phaserphasergame/images/3rdWeek/enemyBullet.png');
        this.load.image('target', '/phaserphasergame/images/3rdWeek/bullet.png');
        this.load.image('background', '/phaserphasergame/images/3rdWeek/underwater2.png');
        this.load.image('cursor', '/phaserphasergame/images/3rdWeek/cursor.png');
        //enemy
        this.load.image('enemy', '/phaserphasergame/images/3rdWeek/enemy1.png');
        this.load.image('enemy2', '/phaserphasergame/images/3rdWeek/enemy2.png');
        this.load.image('enemy3', '/phaserphasergame/images/3rdWeek/enemy3.png');
        this.load.image('enemy4', '/phaserphasergame/images/3rdWeek/enemy4.png');
        this.load.image('enemy5', '/phaserphasergame/images/3rdWeek/enemy5.png');
        this.load.image('enemy6', '/phaserphasergame/images/3rdWeek/enemy6.png');
        this.load.image('enemy7', '/phaserphasergame/images/3rdWeek/enemy7.png');
        this.load.image('enemy8', '/phaserphasergame/images/3rdWeek/enemy8.png');
        this.load.image('enemy9', '/phaserphasergame/images/3rdWeek/enemy9.png');

        //pet
        this.load.image('pet1', '/phaserphasergame/images/3rdWeek/pet1.png');
        this.load.image('petBullet', '/phaserphasergame/images/3rdWeek/petBullet.png');

        //obstacleMax
        this.load.image('obstacle', '/phaserphasergame/images/3rdWeek/obstacle.png');

        //water refill
        
        this.load.image('waterRefresh', '/phaserphasergame/images/3rdWeek/waterRefresh.png');

        //playerFever
        
        this.load.image('bulletFever', '/phaserphasergame/images/3rdWeek/bulletFever.png');
        this.load.image('playerFever', '/phaserphasergame/images/3rdWeek/playerFever.png');


        this.load.image('item1', '/phaserphasergame/images/3rdWeek/item1.png');
        this.load.image('item2', '/phaserphasergame/images/3rdWeek/item2.png');
        this.load.spritesheet('coin', '/phaserphasergame/images/3rdWeek/coin.png', { frameWidth: 30, frameHeight: 33 });

        this.load.setPath('/phaser/spine/player/');

        this.load.spine('bossImage', 'boss.json',  'boss.atlas' , true);

        


    }

    create ()
    {

        sceneUI = this.scene.get('UIScene');
        sceneShop = this.scene.get('ShopScene');
       // Set world bounds
    this.physics.world.setBounds(0, 0, stageWidth[stagelevel-1], stageHeight[stagelevel-1]);
    cursors = this.input.keyboard.createCursorKeys();

        // Add 2 groups for Bullet objects
    playerBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
    playerFeverBullets =  this.physics.add.group({ classType: BulletFever, runChildUpdate: true });
    playerBombs = this.physics.add.group({ classType: Bomb, runChildUpdate: true });
    enemyGroup = this.physics.add.group({ classType: InfiniteEnemy, runChildUpdate: true });
    obstacleGroup = this.physics.add.group({ classType: Obstacle, runChildUpdate: true });
    

    // Add background player, enemy, reticle, healthpoint sprites
    var background = this.add.image(stageWidth[stagelevel-1]/2, stageHeight[stagelevel-1]/2, 'background');
    player = this.physics.add.sprite(stageWidth[stagelevel-1]/2, stageHeight[stagelevel-1]/2, 'player_handgun');
    //enemy = this.physics.add.sprite(300, 600, 'enemy');
    reticle = this.physics.add.sprite(stageWidth[stagelevel-1]/2, stageHeight[stagelevel-1]/2, 'cursor');

    waterRefresh = this.physics.add.sprite(stageWidth[stagelevel-1]/2, stageHeight[stagelevel-1]/2+200, 'waterRefresh');

    this.physics.add.collider(player, waterRefresh, this.waterRefreshHitCallback);
    // Set image/sprite properties
    background.setOrigin(0.5, 0.5).setDisplaySize(stageWidth[stagelevel-1], stageHeight[stagelevel-1]);
    player.setOrigin(0.5, 0.5).setDisplaySize(132, 120).setCollideWorldBounds(true).setDrag(500, 500);
    //enemy.setOrigin(0.5, 0.5).setDisplaySize(132, 120).setCollideWorldBounds(true);
    reticle.setOrigin(0.5, 0.5).setDisplaySize(25, 25).setCollideWorldBounds(true);

    if(petEnable == true){
        petBullets = this.physics.add.group({ classType: PetBullet, runChildUpdate: true });
        pet= this.physics.add.sprite(750, 600, 'pet1');
        pet.setOrigin(1.0, 1.0).setDisplaySize(25, 25).setCollideWorldBounds(true).setDrag(500, 500);
        pet.setScale(3);

    }

    this.anims.create({
        key: 'coin',
        frames: this.anims.generateFrameNumbers('coin', { frames: [ 0, 1, 2, 3 ] }),
        frameRate: 8,
        repeat: -1
    });

   

    //boss
    // Set sprite variables

    // Set camera properties
    this.cameras.main.zoom = 0.5;
    this.cameras.main.startFollow(player);

    
    // Creates object for input with WASD kets
    cursors = this.input.keyboard.addKeys({
        'up': Phaser.Input.Keyboard.KeyCodes.W,
        'down': Phaser.Input.Keyboard.KeyCodes.S,
        'left': Phaser.Input.Keyboard.KeyCodes.A,
        'right': Phaser.Input.Keyboard.KeyCodes.D,
        'q': Phaser.Input.Keyboard.KeyCodes.Q,
        'changeWeaponBULLET': Phaser.Input.Keyboard.KeyCodes.ONE,
        'changeWeaponBOMB': Phaser.Input.Keyboard.KeyCodes.TWO
    });
//적 여려명 하게
        for(var i = 0 ; i < 5; i++){
            
                var enemy = enemyGroup.get().setActive(true).setVisible(true);
                var randImg = Phaser.Math.RND.between(0, 8);
                if(enemy){
                    enemy.spawn(player, enemyHP, enemySpeed, enemyImg[randImg]);
                    enemys.push(enemy);
                    
                    //this.physics.add.collider(enemys, bullet, this.enemysHitCallback);
                    this.physics.add.collider(player, enemy, this.playerHitCallback);
                    enemycount++;
                }  
        }

    obstacleMax = 3 + stagelevel *1;
    for(var i=0; i<obstacleMax;i++){
        var obstacle = obstacleGroup.get().setActive(true).setVisible(true);

                if(obstacle){
                    obstacle.spawn();
                    obstacles.push(obstacle);
                    //enemys.push(enemy);
                    
                    this.physics.add.collider(obstacle, player, this.obstacleHitPlayerCallback);
                    //this.physics.add.collider(player, obstacle, this.obstacleHitCallback);
        }
    }

    var timer = this.time.addEvent({ delay: 4000, callback: this.onEvent, callbackScope: this,loop: true });
    var timer2 = this.time.addEvent({ delay: 10000, callback: this.updateUser, callbackScope: this,loop: true });
    
    
    // Fires bullet from player on left click of mouse
    this.input.on('pointerdown', function (pointer, time, lastFired) {
        if (player.active === false)
            return;
        // Get bullet from bullets group
        if(playerFeverMode){
            if(playerWeaponType == 'BULLET'){
                var bullet = playerFeverBullets.get().setActive(true).setVisible(true);
                if (bullet)
                {   //playerBullets.add(bullet);
                    bullet.fire(player, reticle);
                    
                    this.physics.add.collider(enemys, bullet, this.enemysHitFeverCallback);
                    
                }
                if(petEnable == true)
                {
                    var petbullet = petBullets.get().setActive(true).setVisible(true);
                    if(petbullet){
                        petbullet.fire(pet, reticle);
                        this.physics.add.collider(enemys, petbullet, this.enemysHitCallback);
                        this.physics.add.collider(obstacles, petbullet, this.obstaclesHitCallback);
                    
                    }
                }
            }
            else if(playerWeaponType == 'BOMB'){
                var bomb = playerBombs.get().setActive(true).setVisible(true);
                if (bomb)
                {
                    bomb.fire(player, reticle);
            //     
                    this.physics.add.collider(enemys, bomb, this.enemysHitCallback);
                   
                }
            }
        }
        else if(waterGauge >= 1){
            if(playerWeaponType == 'BULLET'){
                var bullet = playerBullets.get().setActive(true).setVisible(true);
                if (bullet)
                {   //playerBullets.add(bullet);
                    bullet.fire(player, reticle);
                    waterGauge = waterGauge - 1;
                    
            //     
                    this.physics.add.collider(enemys, bullet, this.enemysHitCallback);
                    this.physics.add.collider(obstacles, bullet, this.obstaclesHitCallback);
                    
                }
                if(petEnable == true)
                {
                    var petbullet = petBullets.get().setActive(true).setVisible(true);
                    if(petbullet){
                        petbullet.fire(pet, reticle);
                        this.physics.add.collider(enemys, petbullet, this.enemysHitCallback);
                        this.physics.add.collider(obstacles, petbullet, this.obstaclesHitCallback);
                    
                    }
                }
            }
            else if(playerWeaponType == 'BOMB'){
                var bomb = playerBombs.get().setActive(true).setVisible(true);
                if (bomb)
                {
                    bomb.fire(player, reticle);
            //     
                    this.physics.add.collider(enemys, bomb, this.enemysHitCallback);
                    if(stagelevel == 10){
                        this.physics.add.collider(boss, bomb, this.enemyHitCallback);
                    }
                }
            }
        }
    }, this);

    // Pointer lock will only work after mousedown
    game.canvas.addEventListener('mousedown', function () {
        game.input.mouse.requestPointerLock();
    });

    // Move reticle upon locked pointer move
    this.input.on('pointermove', function (pointer) {
        if (this.input.mouse.locked)
        {
            reticle.x += pointer.movementX;
            reticle.y += pointer.movementY;
        }
    }, this);

    
    playerFeverMode = false;

    //gauge

    }

    onEvent ()
    {
        
        for(var i = 0 ; i < 5; i++){
            
        var randImg = Phaser.Math.RND.between(0, 8);
        var enemy = enemyGroup.get().setActive(true).setVisible(true);
            if(enemy){
                enemy.spawn(player, enemyHP, enemySpeed, enemyImg[randImg]);
                enemys.push(enemy);
                this.physics.add.collider(player, enemy, this.playerHitCallback);
                enemycount++;
            }
        }
    }

    updateUser(){

        enemyHP = enemyHP + 2;
        waterGaugeMAX = waterGaugeMAX + 5;
        enemySpeed = enemySpeed + 0.02;
        playerSpeed = playerSpeed + 10;
        sceneUI.addSpeedItem();
        playerDamage = playerDamage + 1;           
        sceneUI.addDamageItem();

    }

    update ()
    {
        playerX = player.x;
        playerY = player.y;

        if (cursors.left.isDown)
        {
            player.setVelocityX(-playerSpeed);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(playerSpeed);
        }
    
        if (cursors.up.isDown)
        {
            player.setVelocityY(-playerSpeed);
        }
        else if (cursors.down.isDown)
        {
            player.setVelocityY(playerSpeed);
        }
        if (cursors.q.isDown){
            if (game.input.mouse.locked)
                game.input.mouse.releasePointerLock();
        };
        //1번이 아닌 두번 이상 작동함 수정 필요
        if(cursors.changeWeaponBULLET.isDown){
                playerWeaponType = 'BULLET';
                sceneUI.changeWeaponBullet();
        }
        if(cursors.changeWeaponBOMB.isDown){
            playerWeaponType = 'BOMB';
            sceneUI.changeWeaponBomb();
        }
        
        // Rotates player to face towards reticle
        player.rotation = Phaser.Math.Angle.Between(player.x, player.y, reticle.x, reticle.y);
        if(petEnable)
        {
            pet.setPosition(500, 500);
            Phaser.Math.RotateAroundDistance(pet, player.x, player.y, petAngle, 150);

            petAngle = Phaser.Math.Angle.Wrap(petAngle + 0.02);
        }
        // Rotates enemy to face towards player
        //
        //Make reticle move with player
        reticle.body.velocity.x = player.body.velocity.x;
        reticle.body.velocity.y = player.body.velocity.y;
    
        // Constrain velocity of player
       // constrainVelocity(player, 500);
    
        // Constrain position of constrainReticle
       // constrainReticle(reticle);
    
        // Make enemy fire
        
        //console.log(hitPlayer);
        if(hitPlayer == true){
            this.hitPlayer();
        }
        if(playerFeverGauge == playerFeverGaugeMAX){
            this.playerFeverMode();
        }
        
    }

    playerFeverMode(){
        playerFeverGauge =0;
        playerFeverMode = true;
        player.setTexture('playerFever');
        var timer = this.time.addEvent({ delay: 6000, callback: this.playerFeverEnd, callbackScope: this, repeat: 0 });
    
    }

    playerFeverEnd(){
        playerFeverMode = false;
        player.setTexture('player_handgun');
    }

    changeDelayWeaponFALSE(){
        playerWeaponChange = false;
        var timer = this.time.addEvent({ delay: 2000, callback: this.changeDelayWeaponTRUE, callbackScope: this, repeat: 0 });
    }
    changeDelayWeaponTRUE(){
        playerWeaponChange = true;
    }

    moveEnemy(enemy){
        
        this.physics.moveToObject(enemy,player,enemy.speed);
    }
    

    enemySpawn(){
        
    }
//적
    enemysHitCallback(enemyHit, bulletHit)
    {
        // Reduce health of enemy
        if (bulletHit.active === true && enemyHit.active === true)
        {
            enemyHit.health = enemyHit.health - playerDamage;
            console.log("enemy hit");
            // Kill enemy if health <= 0
            if (enemyHit.health <= 0)
            {
                playerFeverGauge+= 10;
                enemyHit.destroy();
                enemyHit.setActive(false).setVisible(false);
                sceneUI.addScore();
                enemyDeathSound.play();
            }
            // Destroy bullet
            bulletHit.setActive(false).setVisible(false);
        }
    }

    enemysHitFeverCallback(enemyHit, bulletHit)
    {
        // Reduce health of enemy
        if (bulletHit.active === true && enemyHit.active === true)
        {
            
            enemyHit.destroy();
            enemyHit.setActive(false).setVisible(false);
            sceneUI.addScore();
            enemyDeathSound.play();
               // scene.events.emit('hitEnemy');
        }
    }
//obstacle
    obstaclesHitCallback(enemyHit, bulletHit)
    {
        // Reduce health of enemy
        if (bulletHit.active === true && enemyHit.active === true)
        {
            // Destroy bullet
            bulletHit.setActive(false).setVisible(false);
        }
    }

    //waterRefresh
    waterRefreshHitCallback(player, waterRefresh){
        if (player.active === true && waterRefresh.active === true)
        {
            // Destroy bullet
            player.body.stop();
            waterRefresh.body.stop();
            waterGauge = waterGaugeMAX;
        }
    }

    obstacleHitPlayerCallback(obstacleHit, playerHit){
        if (obstacleHit.active === true && playerHit.active === true)
        {
            // Destroy bullet
            playerHit.body.stop();
            obstacleHit.body.stop();
        }
    }
    restartGame(){
        this.scene.restart();
        sceneUI.restartGame();
    }

    
    hitPlayer() {
        this.events.emit('hitPlayer');
        hitPlayer = false;
    }

    playerHitCallback(playerHit, bulletHit)
    {
        // Reduce health of player
        if (bulletHit.active === true && playerHit.active === true)
        {
            hitPlayer = true;
           
            bulletHit.setActive(false).setVisible(false);
        }
    }


    // Ensures sprite speed doesnt exceed maxVelocity while update is called
    constrainVelocity(sprite, maxVelocity)
    {
        if (!sprite || !sprite.body)
        return;

        var angle, currVelocitySqr, vx, vy;
        vx = sprite.body.velocity.x;
        vy = sprite.body.velocity.y;
        currVelocitySqr = vx * vx + vy * vy;

        if (currVelocitySqr > maxVelocity * maxVelocity)
        {
            angle = Math.atan2(vy, vx);
            vx = Math.cos(angle) * maxVelocity;
            vy = Math.sin(angle) * maxVelocity;
            sprite.body.velocity.x = vx;
            sprite.body.velocity.y = vy;
        }
    }

    // Ensures reticle does not move offscreen
    constrainReticle(reticle)
    {
        var distX = reticle.x-player.x; // X distance between player & reticle
        var distY = reticle.y-player.y; // Y distance between player & reticle
        // Ensures reticle cannot be moved offscreen (player follow)
        if (distX > 800)
            reticle.x = player.x+800;
        else if (distX < -800)
            reticle.x = player.x-800;

        if (distY > 600)
            reticle.y = player.y+600;
        else if (distY < -600)
            reticle.y = player.y-600;
    }

}

