/**
 * Wind Directional
 */
class WindDirection {
    constructor(center, radius, color, angle) {
        this.center = center;
        this.radius = radius;
        this.color = color;
        this.angle = angle;
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
    }

    update() {
        // change angle
    }
}