import { Draw } from '../engine';
import { Geometry, Settings } from '../tools';

/**
 * Compass bezel ring
 */
export class Bezel {

    constructor({ center, radius }) {
        this.center = center;
        this.radius = radius;
    }

    render() {

        Draw.gradientArc(this.center, this.radius, 270, 180, 90, [Settings.COLOR_RED, Settings.COLOR_DARKGRAY, Settings.COLOR_DARKGRAY], Settings.RING_WIDTH);
        Draw.gradientArc(this.center, this.radius, 270, 0, 90, [Settings.COLOR_GREEN, Settings.COLOR_DARKGRAY, Settings.COLOR_DARKGRAY], Settings.RING_WIDTH);

        const inset = (Settings.RING_WIDTH / 2) - 2;
        for (let t = 0; t <= 360; t += 10) {
            if (t % 30 == 0) {
                const from = Geometry.toPointOnCircle(this.center, this.radius - inset, t);
                const to = Geometry.toPointOnCircle(this.center, this.radius + inset, t);
                Draw.line(from, to, '#AAA', 1)
            }
            else {
                const pt = Geometry.toPointOnCircle(this.center, this.radius, t);
                Draw.filledCircle(pt, 1.5, '#CCC');
            }
        }
    }

    update(data) {
        // no dynamics for this component
    }
}
