/* global paper */

/**
 * Encapsulates paper.js drawing
 */
class Renderer {
    constructor(components, target) {
        this.components = components;
        this.target = target;
    }

    setup() {
        paper.setup(this.target);
    }

    render() {
        if (this.components) {
            for (var i = 0; i < this.components.length; i++) {
                this.components[i].render();
            }
        }
    }

    finalize() {
        paper.view.draw();
    }
}