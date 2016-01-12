/**
 * Background workspace
 */
class Frame {
    constructor(bounds, data){
        this.bounds = bounds;
        this.data = data;
    }
    
    render() {
        
        Draw.rectangle({
            point: [0, 0],
            size: [this.bounds.width, this.bounds.height],
            strokeColor: 'orange',
            strokeWidth: 5,
            fillColor: COLOR_DARK
        });
        
        const sections = 4;
        const margin = 10;
        const width = this.bounds.width / 4;
        const height = (this.bounds.height - (margin * sections) - margin) / sections;
        const center = Draw.getPoint(width/2, height/2);
        const props = ['heading', 'twd', 'awd'];
        
        for (let i = 0; i < 5; i++) {
            Draw.rectangle({
                point: [10,(i*height) + (margin * i) + margin],
                size: [width,height],
                strokeColor: COLOR_DARKGRAY,
                strokeWidth: 2,
                radius: 8
            });
            
            Draw.text(center.add([0,i*height]), this.data[props[i]], 48);
        }
        
        
        
    }
}