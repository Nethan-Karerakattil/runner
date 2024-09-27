const drawObstacles = (gameState) => {
    /*
    Generate Obstacles
    ~~~~~~~~~~~~~
    Developer Notes:-
     - 1 in 100 chance of obstacle generation if the previous obstacle's x position
       is less than 600px
    
     - Obstacle generation can only happen from 800px to 900px. This is done by
       getting a random number between 0 and 99 and adding it to 800.
    */

    if(Math.floor(Math.random() * gameState.obstacle.randomFactor) == 5){
        if(!gameState.obstacle.obstaclePos[gameState.obstacle.obstaclePos.length - 1]){
            gameState.obstacle.obstaclePos.push(Math.floor(Math.random() * 100) + 800);
        }

        if(gameState.obstacle.obstaclePos[gameState.obstacle.obstaclePos.length - 1] < 600){
            gameState.obstacle.obstaclePos.push(Math.floor(Math.random() * 100) + 800);
        }
    }

    /*
    Update Obstacles
    ~~~~~~~~~~~~~~~
    Developer Notes:-
     - Collisoin detection is done by rounding the player's x position and the
       obstacle's x position to the nearest 5. Not sure why, but when I dont round it,
       it is not able to detect the collision.

     - When the obstacle's x position is lesser than -100px ( not visible on the screen ),
       the obstacle is deleted to avoid performance issues.

     - The obstacle's speed is increased by 0.001 px/tick.
    */
    
    for(let i = 0; i < gameState.obstacle.obstaclePos.length; i++){
        gameState.obstacle.obstaclePos[i] -= gameState.obstacle.obstacleSpeed;

        const charectorX = gameState.charector.x;
        const charectorY = gameState.charector.y;
        const charectorSize = gameState.charector.size;

        const obstacleX = gameState.obstacle.obstaclePos[i];
        const obstacleSize = gameState.obstacle.obstacleSize;
        const groundY = gameState.background.ground.start.y;

        if(obstacleX < -100){
            gameState.obstacle.obstaclePos.splice(i, 1);
        }

        if(
            charectorX + charectorSize >= obstacleX &&
            charectorX <= obstacleX + obstacleSize &&
            charectorY + charectorSize >= groundY &&
            charectorY <= groundY + obstacleSize
        ){
            gameState.settings.paused = true;
            endTitle.innerHTML = "Game Over";

            const highScore = localStorage.getItem("highScore");
            if(!highScore || parseInt(highScore) < score){
                localStorage.setItem("highScore", score);
                highScoreElement.innerHTML = `High Score: ${score}`;
            }
        }

        ctx.beginPath();
        ctx.moveTo(obstacleX, groundY);
        ctx.lineTo(obstacleX + (obstacleSize / 2), groundY - obstacleSize);
        ctx.lineTo(obstacleX + obstacleSize, groundY);
        ctx.stroke();
    }
}