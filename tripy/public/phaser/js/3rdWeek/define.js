//inGameScence
var playerhp = 20;
var playerhpMAX = 25;

var player= null;
var playerX = null;
var playerY = null;

var enemy = null;
var healthpoints= null;
var reticle= null;
var moveKeys= null;
var playerBullets= null;
var playerFeverBullets= null;
var playerBombs= null;
var petBullets= null;
var enemyBullets= null;
var enemyGroup = null;
var stagelevel = 1
var playerSpeed = 400;
var playerWeaponType ='BULLET';
var playerWeaponChange = false;

var stageWidth = [1600,1800,2000,2200,2400,2600,2800,3000,3200,1600];
var stageHeight = [1200,1800,2000,2200,2400,2600,2800,3000,3200,1200];


var EnemyClass = ['Enemy','Enemy2','Enemy3','Enemy4','Enemy5','Enemy6','Enemy7','Enemy8','Enemy9'];

var playerMoney = 600;

var retry = 0;

var boss = null;
var bossHealth = 60;

var bossReload = null;
var enemycount = 0;
var hitBoss = false;

var playerDamage = 1;

var playerFeverMode = false;
var playerFeverGauge = 0;
var playerFeverGaugeMAX = 100;

var enemys =[];

var hitPlayer = false;
var speedItemEnable = false;
var damageItemEnable = false;
var coinItemEnable = false;

var itemX = null;
var itemY = null;
var sceneUI = null;
var sceneGame = null;
var sceneShop = null;

var cursors;

//obstace
var obstacleGroup = null;;
var obstacles = [];
var obstacleMax = null;

//pet
var petEnable = false;
var pet = null;

//sound 
var enemyDeathSound;
var mainSound;
var bossSound;

//UIscence

var scoreText = null;
var stageClearText = null;
var levelText = null;
var speedText = null;
var damageText = null;
var coinText = null;
var bossUI = null;
var weaponUiBomb = null;
var weaponUiBullet = null;
var waterGauge = 50;
var waterGaugeMAX = 50;
var waterRefresh = null;

var heart =  [];

var bossHeartUI = [];

var spineBoy = null;

//shopUI
var shopBG = null;
var itemText = null;
var buyBtn = null;
var cancleBtn = null;
var playBtn = null;

var seller = null;
var score = 0;

//login
var kakaoBtn = null;
var naverBtn = null;

//infinite Mode
var enemyImg = ['enemy','enemy2','enemy3','enemy4','enemy5','enemy6','enemy7','enemy8','enemy9'];
var enemyHP = 3;
var enemySpeed = 0.1;