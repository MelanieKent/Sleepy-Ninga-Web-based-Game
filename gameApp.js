const Application = PIXI.Application;


//CONSTANTS
var localServerName = 'http://127.0.0.1:5500';
var gameWidth = 1200;
var gameHeight = 645;
var lineY = 365;
var cooldown = -1;

const app = new Application({
   width: gameWidth,
   height: gameHeight,
});
app.renderer.background.color = 0xFF1FFF;

const Graphics = PIXI.Graphics;

// show the stuff
document.body.appendChild(app.view);

//the whole game area in which the game is played
const playArea = new Graphics();
playArea.beginFill(0x00008B);
playArea.drawRect(gameWidth/2 - 1200/2, gameHeight/2 - 1000/2, 1200, 1000);
playArea.endFill();


app.stage.addChild(playArea);


// background buidlings
const backTexture = PIXI.Texture.from(localServerName + '//images/back.jpg');
const backSprite = new PIXI.TilingSprite(
   backTexture,
   app.screen.width,
   app.screen.height,
   );
backSprite.tileScale.set(0.5, 0.5);


// for the background frame
app.ticker.add(function() {
   backSprite.tilePosition.x -= 2;
})

app.stage.addChild(backSprite);

// background track
const trackTexture = PIXI.Texture.from(localServerName + '//images/track.jpg');
const trackSprite = new PIXI.TilingSprite(
   trackTexture,
   );

trackSprite.width = 2400;
trackSprite.height = 150;
trackSprite.tileScale.set(0.5, 0.5);
trackSprite._anchor.set(0.5, 0,5);
trackSprite.position.set(0,493);

// for the background frame
app.ticker.add(function() {
   trackSprite.tilePosition.x -= 6;

})

app.stage.addChild(trackSprite);

//shape
var obstacle1position;
obstacle1position = 450;
var obstacle1position;
obstacle1position = 50;
var obstacle1position;
obstacle1position = 775;


const obstacle1 = new Graphics();
obstacle1.beginFill(0x1bcfcc)
.drawPolygon([
  obstacle1position, 450,
  obstacle1position + 150, 400,
  obstacle1position + 200, 500,
  obstacle1position - 50, 500
])
.endFill();

const obstacle2 = new Graphics();
obstacle2.beginFill(0xf0960e);
obstacle2.drawStar(1000, 500, 10, 50);
obstacle2.endFill();

const obstacle3 = new Graphics();
obstacle3.beginFill(0x1bcfcc)
.drawEllipse(775, 500, 100, 50)
.endFill();

//player
const playerTexture = PIXI.Texture.from(localServerName + '//images/ninja.png');
const playerSprite = new PIXI.Sprite(playerTexture);
playerSprite.scale.set(1, 1);
playerSprite.x = 100;
playerSprite.y = 420
app.stage.addChild(playerSprite);

playerSprite.interactive = true;


// keyboard events
document.addEventListener('keydown', function(e) {
    if (e.key == ' ' && cooldown <= 0) {
        playerSprite.y -= 400;
        cooldown = 30;
    }
    
})

// gravity and jumping
app.ticker.add(() => {
    if (playerSprite.y < 400) {
        playerSprite.y += 12; // gravity, player.y falling down at speed 1; 
    } 

    // prevent double jump
    cooldown--;

    // making the box move left with speed 10
    obstacle2.x -= 10;

    if (obstacle2.x < -1200) {
      obstacle2.x = 1000;
    }
});

app.stage.addChild(obstacle2);





