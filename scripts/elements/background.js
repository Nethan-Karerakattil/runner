const drawBackground = (data) => {
    // Ground
    ctx.beginPath();
    ctx.moveTo(data.ground.start.x, data.ground.start.y);
    ctx.lineTo(data.ground.end.x, data.ground.end.y);
    ctx.stroke();

    // Sun
    ctx.beginPath();
    ctx.moveTo(data.sun.x, data.sun.y);
    ctx.lineTo(data.sun.x, data.sun.y + data.sun.sideLength);
    ctx.lineTo(data.sun.x + data.sun.sideLength, data.sun.y + data.sun.sideLength);
    ctx.lineTo(data.sun.x + data.sun.sideLength, data.sun.y);
    ctx.lineTo(data.sun.x, data.sun.y);
    ctx.stroke();

    if(data.sun.x < -50) data.sun.x = 820;
    data.sun.x -= data.sun.dx;

    // Clouds
    for(let i = 0; i < data.clouds.length; i++){
        const cloud = data.clouds[i];

        if(i % 2 == 0){
            ctx.beginPath();
            ctx.moveTo(cloud.x, cloud.y);
            ctx.lineTo(cloud.x, cloud.y + 20);
            ctx.lineTo(cloud.x + 100, cloud.y + 20);
            ctx.lineTo(cloud.x + 100, cloud.y - 20);
            ctx.lineTo(cloud.x + 40, cloud.y - 20);
            ctx.lineTo(cloud.x + 40, cloud.y);
            ctx.lineTo(cloud.x, cloud.y);
            ctx.stroke();
        }

        else {
            ctx.beginPath();
            ctx.moveTo(cloud.x, cloud.y);
            ctx.lineTo(cloud.x + 100, cloud.y);
            ctx.lineTo(cloud.x + 100, cloud.y + 40);
            ctx.lineTo(cloud.x + 40, cloud.y + 40);
            ctx.lineTo(cloud.x + 40, cloud.y + 20);
            ctx.lineTo(cloud.x, cloud.y + 20);
            ctx.lineTo(cloud.x, cloud.y);
            ctx.stroke();
        }

        if(cloud.x < -110) data.clouds[i].x = 910;
        data.clouds[i].x -= 0.8;
    }
}