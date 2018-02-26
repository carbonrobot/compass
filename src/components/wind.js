import { Draw } from '../engine';
import { Geometry, Settings } from '../tools';

/**
 * Wind Directional
 */
export class WindDirection {

    constructor({center, radius}, color, param) {
        this.center = center;
        this.radius = radius;
        this.color = color;
        this.param = param;
        this.adjTack = 0;
    }
    
    render() {
        const delta = 3;
        const scale = 1.5;
        this.path = Draw.getPath({
            fillColor: this.color
        });
        this.path.add(Geometry.toPointOnCircle(this.center, this.radius, 0));
        this.path.add(Geometry.toPointOnCircle(this.center, this.radius + Settings.RING_WIDTH * scale, - delta));
        this.path.add(Geometry.toPointOnCircle(this.center, this.radius + Settings.RING_WIDTH * scale, delta));
    }

    update(data) {
        const tack = data.heading || 0;
        this.adjTack -= 270 - tack;
        this.path.rotate(this.adjTack, this.center);
    }
}