const canvas = document.querySelector("#canvas");
const pauseScreen = document.querySelector(".pause-screen");
const endTitle = document.querySelector(".end-title");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");

const ctx = canvas.getContext("2d");

let score = 0;
const highScore = localStorage.getItem("highScore") || 0;

const gameState = {
    settings: {
        paused: true,
        framesPerSecond: 75,
        canvasWidth: 800,
        canvasHeight: 500
    },

    background: {
        ground: {
            start: {
                x: 0,
                y: 400,
            },
            end: {
                x: 800,
                y: 400,
            }
        },

        sun: {
            x: 100,
            y: 100,
            dx: 0.1,
            sideLength: 40
        },

        clouds: [
            {
                x: 150,
                y: 10
            },

            {
                x: 650,
                y: 50
            },

            {
                x: 350,
                y: 165
            }
        ]
    },

    charector: {
        x: 100,
        y: 400,
        yOrigin: 400,
        size: 25,

        gravity: 0,
        gravityFactor: 0.5
    },

    obstacle: {
        obstacleSize: 40,
        obstacleSpeed: 4,
        obstacleSpeedIncrease: 0.002,
        randomFactor: 100,
        obstaclePos: []
    }
}

window.addEventListener("mousedown", (e) => {
    if(gameState.charector.yOrigin == gameState.charector.y){
        gameState.charector.gravity = -13;
    }
})

window.addEventListener("keydown", (e) => {
    if(gameState.charector.yOrigin == gameState.charector.y && e.key == " "){
        if(gameState.settings.paused == true){
            gameState.settings.paused = false;
            gameState.obstacle.obstacleSpeed = 4;
            gameState.obstacle.obstaclePos = [];
            pauseScreen.style.visibility = "hidden";

            score = 0;
            loadFrame();
        } else {
            gameState.charector.gravity = -10;
        }
    }
})

canvas.width = gameState.settings.canvasWidth;
canvas.height = gameState.settings.canvasHeight;

pauseScreen.style.width = gameState.settings.canvasWidth + "px";
pauseScreen.style.height = gameState.settings.canvasHeight + "px";

endTitle.innerHTML = "Jumping Game";
highScoreElement.innerHTML = `High Score: ${highScore}`;

loadFrame();
function loadFrame(){
    score++;
    scoreElement.innerHTML = `Score: ${score}`

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameState.obstacle.obstacleSpeed += gameState.obstacle.obstacleSpeedIncrease;

    drawBackground(gameState.background);
    drawCharector(gameState.charector, gameState.background.ground.start.y);
    drawObstacles(gameState);

    if(!gameState.settings.paused){
        setTimeout(loadFrame, 1000 / gameState.settings.framesPerSecond);
    } else {
        pauseScreen.style.visibility = "visible";
    }
}