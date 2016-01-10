var canvas, bounds, frame, bezel, radius, center;

function render(){
    frame = new paper.Path.Rectangle({
        point: [0,0],
        size: [canvas.width, canvas.height],
        strokeColor: 'orange',
        strokeWidth: 5,
        fillColor: 'black'
    });
        
    bezel = new paper.Path.Circle({
        center: center,
        radius: radius - 50,
        strokeColor: '#ccc',
        strokeWidth: 30
    });
}

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    if(window.innerHeight > window.innerWidth){
        bounds = window.innerWidth;
    }
    else{
        bounds = window.innerHeight;
    }
    radius = bounds / 2;
    center = [canvas.width / 2, canvas.height / 2];
    
    paper.setup(canvas);
    render();
    paper.view.draw();
}

window.onload = function(){
    canvas = document.getElementById('stage');
    resizeCanvas();
}

window.addEventListener('resize', resizeCanvas, false);