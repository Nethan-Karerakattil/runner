const drawCharector = (data, groundY) => {
    /*
    Drawing the charector
    ~~~~~~~~~~~~~~~~
     - Every tick, the gravity factor variable is added to the charector's
       y position.

     - If the charector's y position is higher than the ground's y position, the
       charector's y position is reset to the ground's y position.

     - In the main.js, whenever the space or the mousedown event is triggered,
       -20 is added to the charector's y position. This combined with all the logic
       above gives a jumping like feeling.
    */
    
    data.gravity += data.gravityFactor;
    data.y += data.gravity;

    if(data.y > data.yOrigin){
        data.y = data.yOrigin;
    }

    ctx.beginPath();
    ctx.moveTo(data.x, data.y);
    ctx.lineTo(data.x + data.size, data.y);
    ctx.lineTo(data.x + data.size, data.y - data.size);
    ctx.lineTo(data.x, data.y - data.size);
    ctx.lineTo(data.x, data.y);
    ctx.stroke();
}