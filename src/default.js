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

var canvas, bounds, radius, center, renderer;

function render() {
    var heading = 270;
    var twd = 310;
    var awd = 298;
    var twa = Math.abs(heading - twd);
    var awa = Math.abs(heading - awd);
    var rudder_angle = 8;

    // frame
    const frame = new Frame(canvas); 
       
    // bezel
    const bezel_radius = radius - MARGIN;
    const bezel = new Bezel(center, bezel_radius, RING_WIDTH);
    
    // wind
    const wind_true = new WindDirection(center, bezel_radius, COLOR_twd, twd);
    const wind_apparent = new WindDirection(center, bezel_radius, COLOR_awd, awd);
    
    // compass
    const compass_radius = bezel_radius - RING_WIDTH - RING_MARGIN;
    const compass = new Compass(center, compass_radius, RING_WIDTH, heading);
    
    // boat
    var boat_radius = compass_radius - RING_WIDTH - RING_MARGIN;
    const boat = new Boat(center, boat_radius);
    
    // tack lines
    const tacklines = new TackLines(center, boat_radius, twd);
    
    // rudder
    var rudder_center = center.add([0, center.y / 4]);
    var rudder_radius = center.y / 4;
    const rudder = new Rudder(rudder_center, rudder_radius, rudder_angle);
    
    // water current
    
    var components = [
        frame,
        bezel,
        wind_true,
        wind_apparent,
        compass,
        boat,
        tacklines,
        rudder
    ];

    renderer = new Renderer(components, canvas);
    renderer.setup();
    renderer.render();
    renderer.finalize();
}

function resize() {
    canvas = document.getElementById('stage');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if (window.innerHeight > window.innerWidth) {
        bounds = window.innerWidth;
    }
    else {
        bounds = window.innerHeight;
    }
    radius = bounds / 2;
    center = Draw.getPoint(canvas.width / 2, canvas.height / 2);

    render();
}

document.addEventListener('DOMContentLoaded', resize);
window.addEventListener('resize', resize, false);

