/**
 * Water Current
 */
class Water {
    constructor(center, radius, data){
        this.center = center;
        this.radius = radius;
        this.angle = data.currentAngle;
    }
    
    render(){
        Draw.circle(this.center, this.radius, COLOR_WHITE, 2, COLOR_DARK);
    }
}