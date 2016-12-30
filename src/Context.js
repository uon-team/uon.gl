/**
 * @file Context
 * @see uon.gl.Context
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */

const BlendState = require('./BlendState');
const DepthState = require('./DepthState');
const StencilState = require('./StencilState');
const CullState = require('./CullState');
const Color = require('./Color');

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


        // init defaults

        this._blendState = new BlendState(false);
        this._depthState = new DepthState(true);
        this._stencilState = new StencilState(true);
        this._cullState = new CullState(true);
    }

    /**
     * Getter for the current blendstate
     * @return {BlendState}
     */
    get blendState() {
        return this._blendState;
    }

    /**
     * Setter for the current blend state
     * @param {BlendState} val
     */
    set blendState(val) {

        let gl = this.gl;

        if (this._blendState.equals(val)) {
            return;
        }

        if (val.enabled) {

            gl.enable(gl.BLEND);

            gl.blendEquation(val.equation);
            gl.blendFunc(val.src, val.dst);

        } else {

            gl.disable(gl.BLEND);

        }



        this._blendState = val;
    }

    /**
     * Getter for depth state
     * @return {DepthState}
     */
    get depthState() {
        return this._depthState;
    }

    /**
     * Setter for depth state
     */
    set depthState(val) {

        if (this._depthState.equals(val)) {
            return;
        }

        if (val.enabled) {
            gl.enable(gl.DEPTH_TEST);
        } else {
            gl.disable(gl.DEPTH_TEST);
        }

        this._depthState = val;
    }

    /**
     * Getter for StencilState
     * @return {StencilState}
     */
    get stencilState() {
        return this._stencilState;
    }

    /**
     * Setter for stencil state
     */
    set stencilState(val) {

        if (this._stencilState.equals(val)) {
            return;
        }

        this._stencilState = val;
    }

    /**
     * Getter for cull state
     * @return {CullState}
     */
    get cullState() {
        return this._cullState;
    }

    /**
     * Setter for cull state
     */
    set cullState(val) {

        let gl = this.gl;

        if (this._cullState.equals(val)) {
            return;
        }

        gl.frontFace(val.winding);
        gl.cullFace(gl.BACK);

        if (val.enabled) {
            gl.enable(gl.CULL_FACE);
        } else {
            gl.disable(gl.CULL_FACE);
        }

        this._cullState = val;
    }


    /**
     * Set the clear color
     */
    set clearColor(val) {
        this.gl.clearColor(val.r, val.g, val.b, val.a);
    }

    /**
     * Set the clear depth value
     */
    set clearDepth(val) {
        this.gl.clearDepth(val);
    }
    /**
     * Set the clear stencil value
     */
    set clearStencil(val) {
        this.gl.clearStencil(val);
    }


    /**
     * Sets the viewport in pixels
     * @param x
     * @param y
     * @param w
     * @param h
     */
    setViewport(x, y, w, h) {

        this.gl.setViewport(x, y, w, h);
    }
     


    /**
     * Update/Create a gl resource
     * @param resource
     */
    update(resource, options) {

        if (resource._glresource == null) {
            resource.create(this.gl, options);
        }

        resource.update(this.gl, options);
    }

    /**
     * Release a resource
     * @param resource
     */
    release(resource) {
        resource.release(this.gl);

        resource._glresource = null;
    }

    /**
     * 
     * @param resource
     */
    bind(resource) {
        resource.bind(this.gl);
    }

    /**
     * Draw the current state
     * @param topology
     */
    draw(topology) {




    }

    /**
     * Clear the current render target
     */
    clear(color, depth, stencil) {

        let gl = this.gl;
        let bits = 0;


        if (arguments.length == 0) {

            bits = gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT;

        } else {

            if (color === true) {
                bits |= gl.COLOR_BUFFER_BIT;
            }

            if (depth === true) {
                bits |= gl.DEPTH_BUFFER_BIT;
            }

            if (stencil === true) {
                bits |= gl.STENCIL_BUFFER_BIT;
            }

        }

        gl.clear(bits);
    }

};


module.exports = Context;