import { Draw } from '../engine';
import { Settings } from '../tools';

const sections = 4;
const margin = 10;
const props = ['heading', 'twd', 'awd'];

/**
 * Background workspace
 */
export class Frame {

    constructor(stage) {
        this.stage = stage;
        this.width = this.stage.width / 8;
        this.height = (this.stage.height - (margin * sections) - margin) / sections;
        this.center = Draw.getMidPoint(this.width, this.height);
        this.size = [this.width, this.height];
    }

    render() {
        Draw.rectangle({
            point: [0, 0],
            size: [this.stage.width, this.stage.height],
            strokeColor: 'orange',
            strokeWidth: 5,
            fillColor: Settings.COLOR_DARK
        });
        
        // make these objects as well
        for (let i = 0; i < sections; i++) {
            Draw.rectangle({
                point: [10, (i * this.height) + (margin * i) + margin],
                size: this.size,
                strokeColor: Settings.DARKGRAY,
                strokeWidth: 2,
                radius: 8
            });
        }
    }

    renderValues(data) {
        if(this.textGroup){
            this.textGroup.remove();
        }
        const group = Draw.createGroup();
        for (let i = 0; i < sections; i++) {
            const textHeight = this.height / 2;
            const startPos = [0, i * (this.height + margin) + textHeight / 2];
            group.addChild(
                Draw.text(this.center.add(startPos), data[props[i]], textHeight)
            );
        }
        this.textGroup = group;
    }

    update(data) {
        this.renderValues(data);
    }
}