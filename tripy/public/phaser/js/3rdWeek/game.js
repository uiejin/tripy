var petAngle = 0;


class GameScene extends Phaser.Scene {
    GameScene ()
    {
        Phaser.Scene.call(this, { key: 'GameScene' });
    }
    constructor ()
    {
        super({ key: 'GameScene',
        
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
        this.load.image('background', '/phaserphasergame/images/3rdWeek/underwater1.png');
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
    enemyBullets = this.physics.add.group({ classType: EnemyBullet, runChildUpdate: true });
    enemyGroup = this.physics.add.group({ classType: Enemy, runChildUpdate: true });
    obstacleGroup = this.physics.add.group({ classType: Obstacle, runChildUpdate: true });
    if(stagelevel == 2){
        enemyGroup = this.physics.add.group({ classType: Enemy2, runChildUpdate: true });
    }else if(stagelevel == 3){
        enemyGroup = this.physics.add.group({ classType: Enemy3, runChildUpdate: true });
    }else if(stagelevel == 4){
        enemyGroup = this.physics.add.group({ classType: Enemy4, runChildUpdate: true });
    } else if(stagelevel == 5){
        enemyGroup = this.physics.add.group({ classType: Enemy5, runChildUpdate: true });
    } else if(stagelevel == 6){
        enemyGroup = this.physics.add.group({ classType: Enemy6, runChildUpdate: true });
    } else if(stagelevel == 7){
        enemyGroup = this.physics.add.group({ classType: Enemy7, runChildUpdate: true });
    } else if(stagelevel == 8){
        enemyGroup = this.physics.add.group({ classType: Enemy8, runChildUpdate: true });
    } else if(stagelevel == 9){
        enemyGroup = this.physics.add.group({ classType: Enemy9, runChildUpdate: true });
    } 
    console.log("stagelevel", stagelevel);

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
        pet.setOrigin(1.0, 1.0).setDisplaySize(25, 25).setCollideWorldBounds(true).
        setDrag(500, 500);
        pet.setScale(3);

    }

    this.anims.create({
        key: 'coin',
        frames: this.anims.generateFrameNumbers('coin', { frames: [ 0, 1, 2, 3 ] }),
        frameRate: 8,
        repeat: -1
    });

   

    //boss
    if(stagelevel == 10){
        
        sceneUI.createBossUI();
        boss = this.add.spine(500, 200, 'bossImage', 'animation', true);
        //boss.setOrigin(0.5, 0.5).setDisplaySize(132, 120).setCollideWorldBounds(true);
        this.physics.add.existing(boss);
        boss.setDisplaySize(402,402);
        boss.body.setCollideWorldBounds(true);
        mainSound.stop();
        bossSound.play();
        bossReload = 0;
        boss.lastFired = 0;
    }
    // Set sprite variables
    player.health = 3;
    //enemy.health = 3;
    //enemy.lastFired = 0;

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
    if(stagelevel < 10){
        for(var i = 0 ; i < 5; i++){
            
                var enemy = enemyGroup.get().setActive(true).setVisible(true);
                
                if(enemy){
                    enemy.spawn(player);
                    enemys.push(enemy);
                    
                    //this.physics.add.collider(enemys, bullet, this.enemysHitCallback);
                    this.physics.add.collider(player, enemy, this.playerHitCallback);
                    enemycount++;
                }  
        }
    }

    obstacleMax = 2 + stagelevel *1;
    if(stagelevel == 10) obstacleMax = 0;
    for(var i=0; i<obstacleMax;i++){
        var obstacle = obstacleGroup.get().setActive(true).setVisible(true);
                if(obstacle){
                    obstacle.spawn();
                    obstacles.push(obstacle);
                    
                    this.physics.add.collider(obstacle, player, this.obstacleHitPlayerCallback);
        }
    }

    if(stagelevel < 10){
    var timer = this.time.addEvent({ delay: 4000, callback: this.onEvent, callbackScope: this, repeat: 15 });
    }
    
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
                    if(stagelevel == 10){
                        this.physics.add.collider(boss, bullet, this.enemyHitCallback);
                    }
                }
                if(petEnable == true)
                {
                    var petbullet = petBullets.get().setActive(true).setVisible(true);
                    if(petbullet){
                        petbullet.fire(pet, reticle);
                        this.physics.add.collider(enemys, petbullet, this.enemysHitCallback);
                        this.physics.add.collider(obstacles, petbullet, this.obstaclesHitCallback);
                    if(stagelevel == 10){
                        this.physics.add.collider(boss, petbullet, this.enemyHitCallback);
                        this.physics.add.collider(obstacles, petbullet, this.obstaclesHitCallback);
                    }
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
                    if(stagelevel == 10){
                        this.physics.add.collider(boss, bullet, this.enemyHitCallback);
                        this.physics.add.collider(obstacles, bullet, this.obstaclesHitCallback);
                    }
                }
                if(petEnable == true)
                {
                    var petbullet = petBullets.get().setActive(true).setVisible(true);
                    if(petbullet){
                        petbullet.fire(pet, reticle);
                        this.physics.add.collider(enemys, petbullet, this.enemysHitCallback);
                        this.physics.add.collider(obstacles, petbullet, this.obstaclesHitCallback);
                    if(stagelevel == 10){
                        this.physics.add.collider(boss, petbullet, this.enemyHitCallback);
                        this.physics.add.collider(obstacles, petbullet, this.obstaclesHitCallback);
                    }
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
        if(enemycount >= 20 + (stagelevel * 1)){
            for(var i=0; i< enemys.length; i++){
                enemys[i].destroy;
            }
                stagelevel++;
                this.scene.pause();
                if(userName == 'user'){
                }
                else{
                    this.saveUserData();
                }
                sceneUI.stageClear();
                enemycount = 0;
        }
        else{
        for(var i = 0 ; i < 3; i++){
        var enemy = enemyGroup.get().setActive(true).setVisible(true);
            if(enemy){
                enemy.spawn(player);
                enemys.push(enemy);
                this.physics.add.collider(player, enemy, this.playerHitCallback);
                enemycount++;
            }
        }
                  }
        
    }

    saveUserData(){
        $.ajax({
            url: "/phaserExample/saveStageMode",
            data: {"id" : userId, "hp": playerhp, "stageLevel": stagelevel,"playerMoney" : playerMoney,
            "playerDamage" : playerDamage, "playerSpeed": playerSpeed,"stageMode" : "stageMode",
            "petEnable" : petEnable, "waterGaugeMax": waterGaugeMAX, "score" : score
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
        
        

        if(stagelevel == 10){
           // boss.rotation = Phaser.Math.Angle.Between(boss.x, boss.y, player.x, player.y);
            //constrainVelocity(player, 500);
    
        // Constrain position of constrainReticle
            //constrainReticle(reticle);
            bossReload++;
            this.enemyFire(boss, player, this.time, this);

        }

        if(hitPlayer == true){
            this.hitPlayer();
        }
        if(hitBoss == true){
            this.hitBoss();
        }
        if(speedItemEnable == true){
            this.spawnSpeedItem();
            speedItemEnable = false;
        }
        if(damageItemEnable == true){
            this.spawnDamageItem();
            damageItemEnable = false;
        }
        if(coinItemEnable == true){
            this.spawnCoinItem();
            coinItemEnable = false;
        }

        if(playerFeverGauge == playerFeverGaugeMAX){
            this.playerFeverMode();
        }
        
    }

    playerFeverMode(){
        playerFeverGauge =0;
        playerFeverMode = true;
        player.setTexture('playerFever');
        var timer = this.time.addEvent({ delay: 6000, callback: this.playerFeverEnd, 
            callbackScope: this, repeat: 0 });
    
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
                playerFeverGauge+= 20;
                enemyHit.destroy();
                enemyHit.setActive(false).setVisible(false);
                sceneUI.addScore();
                enemyDeathSound.play();
                var randItem = Phaser.Math.RND.between(0, 4);
                var randType = Phaser.Math.RND.between(0, 1);
                if(randItem == 0){
                    if(randType == 0)
                    speedItemEnable = true;
                    else if(randType == 1)
                    damageItemEnable = true;
                    else if(randType <= 4)
                    coinItemEnable = true;
                    itemX = enemyHit.x;
                    itemY = enemyHit.y;
                }
                else if(randType < 2){
                        coinItemEnable = true;
                        itemX = enemyHit.x;
                        itemY = enemyHit.y;
                }
               // scene.events.emit('hitEnemy');
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
            var randItem = Phaser.Math.RND.between(0, 4);
            var randType = Phaser.Math.RND.between(0, 1);
            if(randItem == 0){
                if(randType == 0)
                speedItemEnable = true;
                else if(randType == 1)
                damageItemEnable = true;
                else if(randType <= 4)
                coinItemEnable = true;
                itemX = enemyHit.x;
                itemY = enemyHit.y;
            }
            else if(randType < 2){
                    coinItemEnable = true;
                    itemX = enemyHit.x;
                    itemY = enemyHit.y;
            }
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

    spawnSpeedItem(){
        var item =  this.physics.add.sprite(itemX,itemY, 'item1');
        this.physics.add.collider(player, item, this.speedItemHitCallback);
        
    }

    spawnDamageItem() {
        var item =  this.physics.add.sprite(itemX,itemY, 'item2');
        this.physics.add.collider(player, item, this.damageItemHitCallback);
    }

    spawnCoinItem() {
        var item = this.physics.add.sprite(itemX, itemY  );
        item.play('coin');
        this.physics.add.collider(player, item, this.coinItemHitCallback);
    }

    coinItemHitCallback(player, item)
    {
        if (player.active === true && item.active === true)
        {
            playerMoney = playerMoney + 10;
            item.setActive(false).setVisible(false);
            sceneUI.addCoinItem();
        }
    }

    speedItemHitCallback(player, item)
    {
        if (player.active === true && item.active === true)
        {
            playerSpeed = playerSpeed + 10;
            item.setActive(false).setVisible(false);
            sceneUI.addSpeedItem();
        }
    }

    damageItemHitCallback(player, item)
    {
        if (player.active === true && item.active === true)
        {
            playerDamage = playerDamage + 1;
            item.setActive(false).setVisible(false);            
            sceneUI.addDamageItem();
        }
    }
    
//boss
    enemyHitCallback(enemyHit, bulletHit)
    {
        console.log("bossHealth", bossHealth);
        if(bossHealth > 0){
        // Reduce health of enemy
            if (bulletHit.active === true && enemyHit.active === true)
            {
                bossHealth = bossHealth - playerDamage;
                hitBoss = true;

                
                // Destroy bullet
                bulletHit.setActive(false).setVisible(false);
            }
        }
    }
//boss
    enemyFire(enemy, player, time, gameObject)
    {
        /*if (enemy.active === false)
        {
            return;
        }*/
        if(bossHealth > 0){
            if (bossReload > 5)
            {
                if (enemy.active === false)
                {
                return;
                }
                enemy.lastFired = time;

                // Get bullet from bullets group
                var bullet = enemyBullets.get().setActive(true).setVisible(true);

                if (bullet)
                {
                    bullet.fire(enemy, player);
                    // Add collider between bullet and player
                    gameObject.physics.add.collider(player, bullet, this.playerHitCallback);
                    bossReload = 0;
                }
            }
        }
    }

    hitBoss() {
        this.events.emit('hitBoss');
        hitBoss = false;
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

