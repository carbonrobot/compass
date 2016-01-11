var COLOR_DARK = 'black',
    COLOR_DARKGRAY = '#333',
    COLOR_GREEN = 'green', 
    COLOR_RED = 'red',
    COLOR_twd = 'blue',
    COLOR_awd = 'white',
    COLOR_WHITE = '#EEE',
    MARGIN = 50, 
    RING_WIDTH = 18,
    RING_MARGIN = 9;

var canvas, bounds, radius, center, frame, compass, boat, wind;
var heading = 270;
var twd = 310;
var awd = 298;
var twa = Math.abs(heading - twd);
var awa = Math.abs(heading - awd);
var rudder_angle = 8;

function render(){
    frame = new paper.Path.Rectangle({
        point: [0,0],
        size: [canvas.width, canvas.height],
        strokeColor: 'orange',
        strokeWidth: 5,
        fillColor: COLOR_DARK
    });
        
    var bezel_radius = radius - MARGIN;
    var bezel_port = new paper.Path({
        strokeWidth: RING_WIDTH,
        strokeColor: {
            gradient: {
                stops: [COLOR_RED, COLOR_DARKGRAY, COLOR_DARKGRAY]
            },
            origin: p2c(center, bezel_radius, 270),
            destination: p2c(center, bezel_radius, 90)
        }
    });
    bezel_port.add(p2c(center, bezel_radius, 270));
    bezel_port.arcTo(p2c(center, bezel_radius, 180), p2c(center, bezel_radius, 90));
    
    var bezel_stbd = new paper.Path({
        strokeWidth: RING_WIDTH,
        strokeColor: {
            gradient: {
                stops: [COLOR_GREEN, COLOR_DARKGRAY, COLOR_DARKGRAY]
            },
            origin: p2c(center, bezel_radius, 270),
            destination: p2c(center, bezel_radius, 90)
        }
    });
    bezel_stbd.add(p2c(center, bezel_radius, 270));
    bezel_stbd.arcTo(p2c(center, bezel_radius, 0), p2c(center, bezel_radius, 90));
    
    
    // x = cx + r * cos(a)
    // y = cy + r * sin(a)
    var inset = (RING_WIDTH / 2) - 2;
    for(var t = 0; t < 360; t  +=10){
        if(t % 30 == 0){
            // lines
            var start = new paper.Point(p2c(center, bezel_radius - inset, t));        
            var end = new paper.Point(p2c(center, bezel_radius + inset, t));
            
            new paper.Path.Line({
                from: start,
                to: end, 
                strokeColor: '#AAA', 
                strokeWidth: 3
            });
        }
        else{
            // dots
            var pt = new paper.Point(p2c(center, bezel_radius, t));
            new paper.Path.Circle({
                center: pt,
                radius: 1.5,
                fillColor: '#CCC'
            });
        }
    }
    
    var compass_radius = bezel_radius - RING_WIDTH - RING_MARGIN;
    compass = new paper.Path.Circle({
        center: center,
        radius: compass_radius,
        strokeColor: COLOR_WHITE,
        strokeWidth: RING_WIDTH
    });
    
    for(var t = 0; t < 360; t +=10){
        if(t % 30 == 0){
            // tack-degrees
            var pt = p2c(center, compass_radius - (RING_WIDTH/2) + 2, t);
            var text = new paper.PointText({
                point: pt,
                content: t.toString(),
                fillColor: COLOR_DARK,
                fontFamily: 'Arial',
                fontWeight: 'bold',
                fontSize: 18,
                justification: 'center'
            });
            text.rotate(t + 90, pt);
        }
        else{
            // dots
            var pt = p2c(center, compass_radius, t);
            new paper.Path.Circle({
                center: pt,
                radius: 1.5,
                fillColor: COLOR_DARKGRAY
            });
        }
    }
    
    // boat
    var boat_radius = compass_radius - RING_WIDTH - RING_MARGIN;
    boat = new paper.Path({
        strokeColor: COLOR_WHITE,
        strokeWidth: 2
    });
    
    var half_width = new paper.Point(boat_radius / 2.5, 0);
    console.log();
    var pt0 = new paper.Point(center.x, center.y + boat_radius - RING_WIDTH);
    var lft = pt0.subtract(half_width);
    var rgt = pt0.add(half_width);
    
    var stb = center.add(half_width); // stb side
    var bow = new paper.Point(center.x, center.y - boat_radius); // bow
    var prt = center.subtract(half_width); // port side
    
    boat.add(lft);
    boat.add(rgt);
    boat.add(stb);
    boat.curveTo(bow.add(new paper.Point(half_width.x*2/3, half_width.x)), bow);
    boat.curveTo(bow.add(new paper.Point(-half_width.x*2/3, half_width.x)), prt);
    boat.add(lft);
    
    // wind
    drawIndicator(COLOR_awd, bezel_radius, awd);
    drawIndicator(COLOR_twd, bezel_radius, twd);
        
    // tack lines
    new paper.Path.Line({
        from: center,
        to: p2c(center, compass_radius - RING_WIDTH, twd+45),
        strokeColor: COLOR_RED,
        strokeWidth: 3,
        dashArray: [10,4]
    });
    new paper.Path.Line({
        from: center,
        to: p2c(center, compass_radius - RING_WIDTH, twd-45),
        strokeColor: COLOR_GREEN,
        strokeWidth: 3,
        dashArray: [10,4]
    });
    
    // heading
    var hpt = p2c(center, bezel_radius-RING_WIDTH/2, 270);
    var hdg = new paper.PointText({
        point: hpt,
        content: heading.toString(),
        fillColor: COLOR_DARK,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fontSize: 28,
        justification: 'center'
    });
    var r = new paper.Path.Rectangle({
        from: hdg.bounds.topLeft.subtract([3,1]),
        to: hdg.bounds.bottomRight.add([3,-2]),
        fillColor: COLOR_WHITE,
        strokeColor: COLOR_DARK,
        strokeWidth: 2,
        radius: 3
    });
    r.moveBelow(hdg);
    
    // current
    new paper.Path.Circle({
        center: center,
        radius: half_width.x - 10,
        strokeColor: COLOR_WHITE,
        strokeWidth: 2,
        fillColor: COLOR_DARK
    });
    
    // rudder
    var rudder_radius = half_width.x-10;
    var r_center = center.add([0, rudder_radius]);
    var rudder = new paper.Path({
         strokeColor: '#111',
         strokeWidth: RING_WIDTH*2/3
    });
    rudder.add(p2c(r_center, rudder_radius, 30));
    rudder.arcTo(p2c(r_center, rudder_radius, 90), p2c(r_center, rudder_radius, 150));
    
    var rudder_arc = new paper.Path({
        strokeWidth: RING_WIDTH/2,
        strokeColor: COLOR_RED
    });
    rudder_arc.add(p2c(r_center, rudder_radius, 90));
    rudder_arc.arcTo(p2c(r_center, rudder_radius, 90+rudder_angle), p2c(r_center, rudder_radius, 90+rudder_angle*2));
    
    for(var t = 30; t <= 150; t +=10){
        if(t % 30 == 0){
            // lines
            new paper.Path.Line({
                from: p2c(r_center, rudder_radius - RING_WIDTH*2/6, t),
                to: p2c(r_center, rudder_radius + RING_WIDTH*2/6, t), 
                strokeColor: COLOR_WHITE, 
                strokeWidth: 1
            });
        }
        else{
            // dots
            new paper.Path.Circle({
                center: p2c(r_center, rudder_radius, t),
                radius: 1,
                fillColor: COLOR_WHITE
            });
        }
    }
    
    // rudder angle text
    new paper.PointText({
        point: r_center.add([0, rudder_radius*2/3]),
        content: rudder_angle.toString() + '\u00B0',
        fillColor: COLOR_WHITE,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fontSize: 18,
        justification: 'center'
    });

}

function drawIndicator(fillColor, radius, angle){
    var i = new paper.Path({
       fillColor: fillColor 
    });
    i.add(p2c(center, radius, angle));
    i.add(p2c(center, radius + RING_WIDTH*1.5, angle-3));
    i.add(p2c(center, radius + RING_WIDTH*1.5, angle+3));
}

function p2c(center, r, a){
    return {
        x: center.x + r * Math.cos(Math.radians(a)),
        y: center.y + r * Math.sin(Math.radians(a))
    };
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
    center = new paper.Point(canvas.width / 2, canvas.height / 2);
    
    paper.setup(canvas);
    render();
    paper.view.draw();
}

window.onload = function(){
    canvas = document.getElementById('stage');
    resizeCanvas();
}

window.addEventListener('resize', resizeCanvas, false);

// Converts from degrees to radians.
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};
 
// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};