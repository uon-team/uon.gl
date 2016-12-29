/**
 * @file Context
 * @see uon.gl.Context
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */


/**
 *  The web gl context
 */
class Context {

    /**
     * Creates a new web gl context
     * @param canvas
     * @param options
     */
    constructor(canvas, options) {

        var context_options = {
            alpha: false,
            depth: true,
            stencil: true,
            antialias: true,
            premultipliedAlpha: false,
            preserveDrawingBuffer: false
        };

        this.canvas = canvas;

        this.gl = canvas.getContext("webgl", context_options) || canvas.getContext("experimental-webgl", context_options);

        if (!this.gl) {
            throw new Error('Counldnt get webgl context from canvas');
        }
    }

    get blendState() {
        return this._blendState;
    }

    set blendState(val) {

    }


    /**
     * Update/Create a gl resource
     * @param resource
     */
    update(resource) {

    }

    /**
     * Release a resource
     * @param resource
     */
    release(resource) {

    }

    /**
     * 
     * @param resource
     */
    bind(resource) {

    }

    /**
     * 
     * @param topology
     */
    draw(topology) {

    }

    clear() {

    }

};


module.exports = Context;