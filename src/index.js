import { Bezel, Frame, Stage, WindDirection } from './components';
import { Draw, Renderer } from './engine';
import { Settings } from './tools';

const canvas = document.getElementById('stage');
let components, renderer;

function init() {
    renderer = new Renderer(canvas, onFrame);
    draw();
}

function update(data) {
    for (let i = 0; i < components.length; i++) {
        components[i].update(data);
    }
}

let accum = 0;
function onFrame(v) {
    // v = {delta: 0.23, time: 5.9, count: 69}

    accum += v.delta;
    if(accum >= 1.0) {
        accum -= 1.0;
        
        const heading = 260 + Math.ceil((Math.random() * 10));
        const data = { heading, twd: 300, awd: 290, rudderAngle: 8, currentAngle: 32 };
        update(data);
    }
}

function draw() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stage = new Stage(canvas.width, canvas.height);

    components = [
        new Frame(stage),
        new Bezel(stage),
        new WindDirection(stage, Settings.TWD, 'twd'),
        new WindDirection(stage, Settings.AWD, 'aws')
    ];

    // render all components to canvas
    renderer.render(components);
}

document.addEventListener('DOMContentLoaded', init);

// TODO: not sure how to handle this yet
// window.addEventListener('resize', reload, false);

    // // wind
    // const wind_true = new WindDirection(center, bezel_radius, COLOR_twd, data, 'twd');
    // const wind_apparent = new WindDirection(center, bezel_radius, COLOR_awd, data, 'awd');

    // // compass
    // const compass_radius = bezel_radius - RING_WIDTH - RING_MARGIN;
    // const compass = new Compass(center, compass_radius, RING_WIDTH, data);

    // // boat
    // var boat_radius = compass_radius - RING_WIDTH - RING_MARGIN;
    // const boat = new Boat(center, boat_radius);

    // // tack lines
    // const tacklines = new TackLines(center, boat_radius, data);

    // // rudder
    // const rudder_center = center.add([0, center.y / 4]);
    // const rudder_radius = center.y / 4;
    // const rudder = new Rudder(rudder_center, rudder_radius, data);

    // // water current
    // const water = new Water(center, center.y / 5, data);

    // var components = [
    //     frame,
    //     bezel,
    //     wind_true,
    //     wind_apparent,
    //     compass,
    //     boat,
    //     tacklines,
    //     rudder,
    //     water
    // ];

