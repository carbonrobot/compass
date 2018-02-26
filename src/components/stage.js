import { Draw } from '../engine';

const MARGIN = 50;

export class Stage {
    constructor(width, height) {
        let bounds = height;
        if (height > width) {
            bounds = width;
        }

        this.radius = (bounds - MARGIN * 2) / 2;
        
        this.width = width;
        this.height = height;
        this.topLeft = Draw.getPoint(MARGIN, MARGIN);
        this.topRight = Draw.getPoint(width - MARGIN, MARGIN);
        this.bottomLeft = Draw.getPoint(MARGIN, height - MARGIN);
        this.bottomRight = Draw.getPoint(width - MARGIN, height - MARGIN);
        this.center = Draw.getPoint(width / 2, height / 2);
    }
}