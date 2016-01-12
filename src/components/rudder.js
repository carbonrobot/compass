/**
 * Rudder Indicator
 */
class Rudder {
    constructor(center, radius, data) {
        this.center = center;
        this.radius = radius;
        this.angle = data.rudderAngle;
    }

    render() {

        Draw.arc(this.center, this.radius, 30, 90, 150, '#111', RING_WIDTH * 2 / 3);
        Draw.arc(this.center, this.radius, 90, 90 + this.angle, 90 + this.angle*2, COLOR_RED, RING_WIDTH/2);

        for (var t = 30; t <= 150; t += 10) {
            if (t % 30 == 0) {
                const start = Math.toPointOnCircle(this.center, this.radius - RING_WIDTH * 2 / 6, t);
                const end = Math.toPointOnCircle(this.center, this.radius + RING_WIDTH * 2 / 6, t);
                Draw.line(start, end, COLOR_WHITE, 1);
            }
            else {
                var pt = Math.toPointOnCircle(this.center, this.radius, t);
                Draw.filledCircle(pt, 1, COLOR_WHITE);
            }
        }
    
        // rudder angle text
        new paper.PointText({
            point: this.center.add([0, this.radius * 2 / 3]),
            content: this.angle.toString() + '\u00B0',
            fillColor: COLOR_WHITE,
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 18,
            justification: 'center'
        });
        
    }
}


