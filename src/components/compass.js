/**
 * Compass Ring
 */
class Compass {
    constructor(center, radius, width, heading) {
        this.center = center;
        this.radius = radius;
        this.width = width;
        this.heading = heading;
    }

    render() {
        
        Draw.circle(this.center, this.radius, COLOR_WHITE, this.width);

        for (var t = 0; t < 360; t += 10) {
            if (t % 30 == 0) {
                // tack-degrees
                var pt = Math.toPointOnCircle(this.center, this.radius - (this.width / 2) + 2, t);
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
            else {
                const pt = Math.toPointOnCircle(this.center, this.radius, t);
                Draw.filledCircle(pt, 1.5, COLOR_DARKGRAY);
            }
        }

        // heading
        var hpt = Math.toPointOnCircle(this.center, this.radius - this.width / 2, 270);
        var hdg = new paper.PointText({
            point: hpt,
            content: this.heading.toString(),
            fillColor: COLOR_DARK,
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 28,
            justification: 'center'
        });
        var r = new paper.Path.Rectangle({
            from: hdg.bounds.topLeft.subtract([3, 1]),
            to: hdg.bounds.bottomRight.add([3, -2]),
            fillColor: COLOR_WHITE,
            strokeColor: COLOR_DARK,
            strokeWidth: 2,
            radius: 3
        });
        r.moveBelow(hdg);
    }
}
