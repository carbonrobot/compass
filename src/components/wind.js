/**
 * Wind Directional
 */
class WindDirection {
    constructor(center, radius, color, data, selector) {
        this.center = center;
        this.radius = radius;
        this.color = color;
        this.heading = data.heading;
        this.angle = data[selector];
    }
    
    render() {
        const delta = 3;
        const scale = 1.5;
        const path = new paper.Path({
            fillColor: this.color
        });
        path.add(Math.toPointOnCircle(this.center, this.radius, this.angle));
        path.add(Math.toPointOnCircle(this.center, this.radius + RING_WIDTH * scale, this.angle - delta));
        path.add(Math.toPointOnCircle(this.center, this.radius + RING_WIDTH * scale, this.angle + delta));
        path.rotate(270 - this.heading, this.center);
    }
}