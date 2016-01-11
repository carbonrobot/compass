/**
 * Compass bezel ring
 */
class Bezel {
    constructor(center, radius, width) {
        this.center = center;
        this.radius = radius;
        this.width = width;
    }

    render() {

        Draw.gradientArc(this.center, this.radius, 270, 180, 90, [COLOR_RED, COLOR_DARKGRAY, COLOR_DARKGRAY], this.width);
        Draw.gradientArc(this.center, this.radius, 270, 0, 90, [COLOR_GREEN, COLOR_DARKGRAY, COLOR_DARKGRAY], this.width);

        const inset = (this.width / 2) - 2;
        for (let t = 0; t <= 360; t += 10) {
            if (t % 30 == 0) {
                const from = Math.toPointOnCircle(this.center, this.radius - inset, t);
                const to = Math.toPointOnCircle(this.center, this.radius + inset, t);
                Draw.line(from, to, '#AAA', 3)
            }
            else {
                const pt = Math.toPointOnCircle(this.center, this.radius, t);
                Draw.filledCircle(pt, 1.5, '#CCC');
            }
        }
    }
}
