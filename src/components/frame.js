/**
 * Background workspace
 */
class Frame {
    constructor(bounds){
        this.bounds = bounds;
    }
    
    render() {
        
        Draw.rectangle({
            point: [0, 0],
            size: [this.bounds.width, this.bounds.height],
            strokeColor: 'orange',
            strokeWidth: 5,
            fillColor: COLOR_DARK
        });
        
    }
}