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


        this.canvas = canvas;

        this.gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

        if (!this.gl) {
            throw new Error('Counldnt get webgl context from canvas');
        }
    }

    /**
     * 
     * @param resource
     */
    update(resource) {

    }

    /**
     * 
     * @param resource
     */
    release(resource) {

    }

};


module.exports = Context;