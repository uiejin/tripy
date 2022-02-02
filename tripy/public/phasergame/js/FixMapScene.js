var firsttime = false;
var marker;

var map1;
var tiles1;
var layer;
var layer2;

var btnt1;
var demolishbtn = false;
var btnt2;
var btnt3;

var pointerTileX;
var pointerTileY;
var pointerTileXY;

var cointimer;

var fixedtype = 0;
var listbar;
var fixbtn= new Array();

var selectedTile;

var mapheight = 20;
var mapwidth = 20;

class MapScene2 extends Phaser.Scene {
    MapScene2 ()
    {
        Phaser.Scene.call(this, { key: 'MapScene2' });
    }
    constructor ()
    {
        super({ key: 'MapScene2'});
    }
    
    preload() {
        this.load.image('fixbtn0', '/phasergame/images/button/sbtn0.png');
        this.load.image('fixbtn1', '/phasergame/images/button/sbtn1.png');
        this.load.image('fixbtn2', '/phasergame/images/button/sbtn2.png');

        this.load.image('listbar', '/phasergame/images/button/listbar.png');

        // 타일 추가
        this.load.image('tilelist0', '/phasergame/images/tile/chocotile.png');
        this.load.image('tilelist1', '/phasergame/images/tile/whitetile.png');
        this.load.image('tilelist2', '/phasergame/images/tile/icetile.png');
        this.load.image('tilelist3', '/phasergame/images/tile/cookietile.png');

        //this.load.image('ship', 'images/mapPack_tilesheet.png');

        // 나무 추가
        this.load.image('tree0', '/phasergame/images/json/tower/tree0.png');
        this.load.image('tree1', '/phasergame/images/json/tower/tree1.png');
        this.load.image('tree2', '/phasergame/images/json/tower/tree2.png');

        // 집 추가
        this.load.image('house0', '/phasergame/images/json/tower/house0.png');
        this.load.image('house1', '/phasergame/images/json/tower/house1.png');
    }
    create() {
        
        for (var i = 0; i < 3; i++) {
            fixbtn[i] = this.add.sprite(180 * (i + 1) -50, 530, 'fixbtn'+ i).setInteractive();
            fixbtn[i].visible = false;
        }

        listbar = this.add.sprite(720, 2250, 'listbar')
        listbar.visible = false;

        for (var i = 0; i < tilecheckcnt; i++) {
            tile_btn[i] = this.add.sprite(250 * (i + 1), 2250, 'tilelist' + i).setInteractive(); // 버튼 로드
            tile_btn[i].visible = false;
        }
        this.input.setDraggable(tile_btn[0]);

        for (var i = 0; i < tilecheckcnt; i++) {
            givetiletype(tile_btn, i);
        }

        // 나무 타일 선택하여 값 부여
        for (var i = 0; i < treecheckcnt; i++) {
            tree_btn[i] = this.add.sprite(250 * (i + 1), 2250, 'tree' + i).setInteractive(); // 버튼 로드
            tree_btn[i].visible = false;
        }
        // 나무값 부여
        for (var i = 0; i < treecheckcnt; i++) {
            givetreetype(tree_btn, i);
        }
        
        // 하우스 타일 선택하여 값 부여
        for (var i = 0; i < housecheckcnt; i++) {
            house_btn[i] = this.add.sprite(250 * (i + 1), 2250, 'house' + i).setInteractive(); // 버튼 로드
            house_btn[i].visible = false;
        }
        // 하우스값 부여
        for (var i = 0; i < housecheckcnt; i++) {
            givehousetype(house_btn, i);
        }
        
        // btnt1 = this.add.sprite(600, 2300, 't1').setInteractive().setScrollFactor(0);
        // btnt2 = this.add.image(900, 2300, 't2').setInteractive().setScrollFactor(0);

        //(카메라와 함께 이동한다.)
        // btnt1.visible = false;
        // btnt2.visible = false;

        // 건설하기 버튼을 누른다. 누르면 타일들이 생성
        fixbtn[0].on('pointerup', function (pointer) {
            // 나무 타일들은 나타내고
            fixedtype = 1;
            // 바닥 타일은 없앤다.
            for (var i = 0; i < tilecheckcnt; i++) {
                tile_btn[i].visible = true;
            }

            for (var i = 0; i < treecheckcnt; i++) {
                tree_btn[i].visible = false;
            }
            
            for (var i = 0; i < housecheckcnt; i++) {
                house_btn[i].visible = false;
            }
        });

        fixbtn[1].on('pointerup', function (pointer) {
            // 나무 타일들은 나타내고
            fixedtype = 2;
            // 바닥 타일은 없앤다.
            for (var i = 0; i < tilecheckcnt; i++) {
                tile_btn[i].visible = false;
            }

            for (var i = 0; i < treecheckcnt; i++) {
                tree_btn[i].visible = true;
            }

            // 바닥 타일은 없앤다.
            for (var i = 0; i < housecheckcnt; i++) {
                house_btn[i].visible = false;
            }

        });

        fixbtn[2].on('pointerup', function (pointer) {
            // 나무 타일들은 나타내고
            fixedtype = 3;
            for (var i = 0; i < treecheckcnt; i++) {
                tree_btn[i].visible = false;
            }
            // 바닥 타일은 없앤다.
            for (var i = 0; i < tilecheckcnt; i++) {
                tile_btn[i].visible = false;
            }

            for (var i = 0; i < housecheckcnt; i++) {
                house_btn[i].visible = true;
            }
        });
        // 타일하나 선택하여 추가
    }

    update(time, delta) {

    }

   

}