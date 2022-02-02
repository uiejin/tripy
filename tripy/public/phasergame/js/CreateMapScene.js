var firsttime = false;
var marker;

// 시작 위치 조정
var mapposX = 700;
var mapposY = 500;

var map1;
var map2;
var map3;

var tiles1;
var tiles2;
var layer;
var layer2;

//tree맵 관련
var treetile1;
var treelayer;

//tree맵 관련
var housetile1;
var houselayer;

var worldPoint;
var pointerTileXY;
var markerXY;

var cointimer;

var selectedTile;

var mapheight = 20;
var mapwidth = 20;

var towergroups;

var mastileposx = 0;
var mastileposy = 840;


class MapScene extends Phaser.Scene {
    MapScene ()
    {
        Phaser.Scene.call(this, { key: 'MapScene' });
    }
    constructor ()
    {
        super({ key: 'MapScene'});
    }

    preload() {
        this.load.tilemapTiledJSON('map', '/phasergame/images/json/real.json');
        this.load.tilemapTiledJSON('treemap', '/phasergame/images/json/testing.json');
        this.load.tilemapTiledJSON('housemap', '/phasergame/images/json/house.json');
        //this.load.tilemapTiledJSON('t1', '/phasergame/images/json/testing.json');
        //json 파일 받는 방3
        //this.load.image('tiles', 'images/tmw_desert_spacing2.png');
        this.load.image('tiles', '/phasergame/images/json/floortower2.png');
        this.load.image('tiles2', '/phasergame/images/json/tower/tree1.png');
        //this.load.image('tree1', '/phasergame/images/json/tower/tree1.png');

        //건물 추가
        //this.load.image('tower1', '/phasergame/images/json/tower/tower1.png');
        this.load.image('treetiles', '/phasergame/images/json/tower/trees_tile.png');
        this.load.image('housetiles', '/phasergame/images/json/tower/house_tile.png');
    }
    create() {
        map1 = this.make.tilemap({
            key: 'map',
            tileHeight: 64
        });
        selectedTile = map1.getTileAt(2, 3, true, layer);

        tiles1 = map1.addTilesetImage('floortower', 'tiles'); // 타일셋 이름, 
        tiles2 = map1.addTilesetImage('treetiles', 'tiles2', 82, 123);
        //tiles2.setSize(82,123,82,123);

        layer = map1.createLayer('Ground', tiles1, mastileposx+mapposX, mastileposy+mapposY); // 타일 생성 좌표
        layer2 = map1.createLayer('Tower', tiles2, mastileposx+mapposX, mastileposy+mapposY);
        //console.log(layer);

        //treetile관련
        map2 = this.make.tilemap({
            key: 'treemap'
        });
        treetile1 = map2.addTilesetImage('tree120', 'treetiles'); // 타일셋 이름, 
        treelayer = map2.createLayer('Trees', treetile1,  mastileposx+mapposX, mastileposy+mapposY - 90);

        //housetile 관련
        map3 = this.make.tilemap({
            key: 'housemap'
        });
        housetile1 = map3.addTilesetImage('house160', 'housetiles'); // 타일셋 이름, 
        houselayer = map3.createLayer('Houses', housetile1,  mastileposx-40 + mapposX, mastileposy+mapposY -120);

        //layer3 = map1.createLayer('tl1', tiles1, 0, 840);
        //map.createLayer('Tile Layer 1', [ groundTiles, itemTiles, platformTiles ]); //한번에 여러개 사용할때
        //once라는 명렁어 존재.

        this.input.on('pointerup', function (pointer) {
            // 제작 버튼을 누르면
            if (fixbtn[0].visible) {
                switch (fixedtype) {
                    case 1:
                        //타일 생성
                        map1.setLayer(layer)
                        selectedTile = map1.getTileAt(pointerTileXY.x, pointerTileXY.y, true, layer);
                        map1.replaceByIndex(selectedTile["index"], tiletype, pointerTileXY.x, pointerTileXY.y, 1, 1);
                        console.log("타일 생성중");
                        console.log(selectedTile.index);
                        break;
                    case 2:
                        // 나무 생성
                        map1.setLayer(layer2)
                        selectedTile = map1.getTileAt(pointerTileXY.x, pointerTileXY.y, true, layer2);
                        if (selectedTile["index"] == -1) {
                            map2.replaceByIndex(selectedTile["index"], treetype, pointerTileXY.x, pointerTileXY.y, 1, 1);
                            map1.replaceByIndex(selectedTile["index"], 10, pointerTileXY.x, pointerTileXY.y, 1, 1);
                            console.log("나무 생성중");
                            Player_Gold -= 100;
                            towercount++;
                            Gold_Text.setText(Player_Gold);
                        }
                        break;
                    case 3:
                        // 하우스 생성
                        map1.setLayer(layer2)
                        selectedTile = map1.getTileAt(pointerTileXY.x, pointerTileXY.y, true, layer2);
                        if (selectedTile["index"] == -1) {
                            map3.replaceByIndex(selectedTile["index"], housetype, pointerTileXY.x, pointerTileXY.y, 1, 1);
                            map1.replaceByIndex(selectedTile["index"], 10, pointerTileXY.x, pointerTileXY.y, 1, 1);
                            console.log("하우스 생성중");
                            Player_Gold -= 100;
                            towercount++;
                            Gold_Text.setText(Player_Gold);
                        }
                        break;
                        //map1.putTileAt(pointerTileXY.x, pointerTileXY.y);
                }
                //console.log(layer)

                //console.log(map["layers"][0]['data'][0][0]["index"]);
                //                                  요걸로 배열을 만들면 됩니다.

                if (shiftKey.isDown) {
                    if (btnt1.visible == true) {
                        selectedTile = map1.getTileAt(pointerTileXY.x, pointerTileXY.y, true, layer2);
                    } else {
                        selectedTile = map1.getTileAt(pointerTileXY.x, pointerTileXY.y, true, layer);
                    }
                    //console.log(map1["layers"]);

                } else {

                }
            }
        });
        this.cameras.main.setZoom(2.5);
        // 카메라 관련

        // 카메라 움직이기
        var cursors = this.input.keyboard.createCursorKeys();
        //this.cameras.main.setZoom(1.3);
        /*this.cameras.main.setBounds(0, 0, map1.widthInPixels, map1.heightInPixels); // 크기 고정

        this.ship = this.physics.add.image(400, 2500, 'ship');
        this.cameras.main.startFollow(this.ship, true, 0.09, 0.09);
        this.cameras.main.setZoom(3);*/


        //this.cameras.main.setBounds(0, 0, 1440, 2960);

        //this.add.image(0, 0, 'map').setOrigin(0).setScrollFactor(1);

        this.cursors = this.input.keyboard.createCursorKeys();

        //this.ship = this.physics.add.image(400.5, 301.3, 'ship');
        // ship = this.add.image(400.5, 301.3, 'ship');

        //this.cameras.main.startFollow(this.ship, true, 0.09, 0.09);
        // this.cameras.main.roundPixels = true;

        //this.cameras.main.setZoom(2);

        var controlConfig = {
            camera: this.cameras.main,
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S), //cursors.down,
            zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
            zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
            drag: 0.0005,
            speed: 0.5
        };
        controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
        this.MakeMarker();
    }

    update(time, delta) {
        //text.setText('Event.progress: ' + timedEvent.getProgress().toString().substr(0, 4));
        if (firsttime == false) {
            firsttime = true;
            shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
            loadmap();
            savemap();
            //console.log(mappos);
        }

        // worldPoint의 좌표를 맵만의 좌표로 변경해준다. 0 ~ 39까지
        //pointerTileY = map1.worldToTileY(worldPoint.y)

        worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
        pointerTileXY = map1.worldToTileXY(worldPoint.x, worldPoint.y, true);
        markerXY = map1.tileToWorldXY(pointerTileXY.x, pointerTileXY.y);

        // console.log ("월드 = ", worldPoint.x)
        // console.log("포인트 = ", pointerTileXY.x)
        // console.log (markerXY.x, markerXY.y);

        // //범위가 벗어나면 새롭게 그리지 않는다.
        if (pointerTileXY.x < 40 && pointerTileXY.x > -1 && pointerTileXY.y < 40 && pointerTileXY.y > -1) {
            // 다시 고정 좌표로
            marker.x = markerXY.x;
            marker.y = markerXY.y
        }

        // 컨트롤러 업데이트
        controls.update(delta);
    }

    MakeMarker() {
        marker = this.add.graphics();
        marker.lineStyle(5, 0x000000, 1); // 굶기, 색상, 
        marker.strokeRect(0, 0, map1.tileWidth, map1.tileHeight);
    }

}


function loadmap() {
    var count = 0;
    for (var i = 0; i < 40; i++) {
        for (var j = 0; j < 40; j++) {
            map1["layers"][0]['data'][i][j]['index'] = DBMAP[count];
            map1["layers"][1]['data'][i][j]['index'] = DBMAP_TOWER[count];
            map2["layers"][0]['data'][i][j]['index'] = DBMAP_TREE[count];
            map3["layers"][0]['data'][i][j]['index'] = DBMAP_HOUSE[count];
            count++;
        }
    }
}

function savemap() {
    //console.log(map["layers"][0]['data'])
    var count = 0;
    for (var i = 0; i < 40; i++) {
        for (var j = 0; j < 40; j++) {
            DBMAP[count] = map1["layers"][0]['data'][i][j]["index"]
            DBMAP_TOWER[count] = map1["layers"][1]['data'][i][j]["index"]
            DBMAP_TREE[count] = map2["layers"][0]['data'][i][j]['index']; 
            DBMAP_HOUSE[count] = map3["layers"][0]['data'][i][j]['index'];
            count++;
            //console.log(map["layers"][0]['data'][i][j]["index"]);
            //console.log(count);
        }
    }
}