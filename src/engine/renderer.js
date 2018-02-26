/* global paper */

/**
 * Encapsulates paper.js drawing
 */
export class Renderer {

    constructor(target, onFrame) {
        paper.setup(target);
        paper.view.onFrame = onFrame || function() {};
    }

    render(components) {
        if (components) {
            for (let i = 0; i < components.length; i++) {
                components[i].render();
            }
            paper.view.draw();
        }
    }

}