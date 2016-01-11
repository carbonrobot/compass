/**
 * Tack Lines
 */
class TackLines {
    constructor(center, radius, angle) {
        this.center = center;
        this.radius = radius;
        this.angle = angle;
    }

    render() {
        new paper.Path.Line({
            from: center,
            to: Math.toPointOnCircle(this.center, this.radius, this.angle + 45),
            strokeColor: COLOR_RED,
            strokeWidth: 3,
            dashArray: [10, 4]
        });
        new paper.Path.Line({
            from: center,
            to: Math.toPointOnCircle(this.center, this.radius, this.angle - 45),
            strokeColor: COLOR_GREEN,
            strokeWidth: 3,
            dashArray: [10, 4]
        });
    }
}
        