/**
 * Boat
 */
class Boat {
    constructor(center, radius) {
        this.center = center;
        this.radius = radius;
    }

    render() {
        
        const path = new paper.Path({
            strokeColor: COLOR_WHITE,
            strokeWidth: 2
        });

        var half_width = new paper.Point(this.radius / 2.5, 0);
        var pt0 = new paper.Point(this.center.x, this.center.y + this.radius - RING_WIDTH);
        var lft = pt0.subtract(half_width);
        var rgt = pt0.add(half_width);

        var stb = this.center.add(half_width); // stb side
        var bow = new paper.Point(this.center.x, this.center.y - this.radius); // bow
        var prt = this.center.subtract(half_width); // port side
    
        path.add(lft);
        path.add(rgt);
        path.add(stb);
        path.curveTo(bow.add(new paper.Point(half_width.x * 2 / 3, half_width.x)), bow);
        path.curveTo(bow.add(new paper.Point(-half_width.x * 2 / 3, half_width.x)), prt);
        path.add(lft);

    }
}

