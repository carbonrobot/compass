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

var canvas, radius, center, renderer;

function render() {
    let data = {
        heading: 260,
        twd: 300,
        awd: 290,
        rudderAngle: 8,
        currentAngle: 32
    };

    // frame
    const frame = new Frame(canvas, data); 
       
    // bezel
    const bezel_radius = radius - MARGIN;
    const bezel = new Bezel(center, bezel_radius, RING_WIDTH);
    
    // wind
    const wind_true = new WindDirection(center, bezel_radius, COLOR_twd, data, 'twd');
    const wind_apparent = new WindDirection(center, bezel_radius, COLOR_awd, data, 'awd');
    
    // compass
    const compass_radius = bezel_radius - RING_WIDTH - RING_MARGIN;
    const compass = new Compass(center, compass_radius, RING_WIDTH, data);
    
    // boat
    var boat_radius = compass_radius - RING_WIDTH - RING_MARGIN;
    const boat = new Boat(center, boat_radius);
    
    // tack lines
    const tacklines = new TackLines(center, boat_radius, data);
    
    // rudder
    const rudder_center = center.add([0, center.y / 4]);
    const rudder_radius = center.y / 4;
    const rudder = new Rudder(rudder_center, rudder_radius, data);
    
    // water current
    const water = new Water(center, center.y / 5, data);
    
    var components = [
        frame,
        bezel,
        wind_true,
        wind_apparent,
        compass,
        boat,
        tacklines,
        rudder,
        water
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

    let bounds = window.innerHeight;
    if (window.innerHeight > window.innerWidth) {
        bounds = window.innerWidth;
    }
    radius = bounds / 2;
    center = Draw.getPoint(canvas.width / 2, canvas.height / 2);

    render();
}

document.addEventListener('DOMContentLoaded', resize);
window.addEventListener('resize', resize, false);

