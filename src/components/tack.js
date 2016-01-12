/**
 * Tack Lines
 */
class TackLines {
    constructor(center, radius, data) {
        this.center = center;
        this.radius = radius;
        this.heading = data.heading;
        this.angle = data.twd;
    }

    render() {
        let delta = 45;
        if(Math.abs(this.heading - this.angle) > 120){
            delta = 10;
        }
        const port_angle = Math.toPointOnCircle(this.center, this.radius, this.angle + delta);
        const stbd_angle = Math.toPointOnCircle(this.center, this.radius, this.angle - delta);
        const port = Draw.dashedLine(this.center, port_angle, COLOR_RED, 3);
        const stbd = Draw.dashedLine(this.center, stbd_angle, COLOR_GREEN, 3);
        const group = Draw.createGroup();
        group.addChild(port);
        group.addChild(stbd);
        group.rotate(270 - this.heading, this.center);
    }
}
        