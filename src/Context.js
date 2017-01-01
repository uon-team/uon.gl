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
const ClearOptions = require('./ClearOptions');

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

        // the canvas element on which we do the rendering
        this.canvas = canvas;

        // the gl context
        this.gl = canvas.getContext("webgl", context_options) || canvas.getContext("experimental-webgl", context_options);

        if (!this.gl) {
            throw new Error('Counldnt get webgl context from canvas');
        }


        // init defaults

        this._blendState = new BlendState(false);
        this._depthState = new DepthState(true);
        this._stencilState = new StencilState(true);
        this._cullState = new CullState(true);

        this._clearOptions = new ClearOptions();
        this._currentProgram = null;

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
     * Set the clear options
     */
    set clearOptions(val) {
        var gl = this.gl;
        var color = val.color;
        gl.clearColor(color.r, color.g, color.b, color.a);
        gl.clearDepth(val.depth);
        gl.clearStencil(val.stencil);

        this._clearOptions = val;
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
     * Sets uniforms for the current program
     * @param {Object} values
     */
    uniforms(values) {

        if (this._currentProgram == null) {
            throw new Error('A program must be bound before you can apply uniforms');
        }

        var gl = this.gl;
        var tex_count = -1;
        var program_uniforms = this._currentProgram.uniforms;


        for (var i in values) {

            var param = program_uniforms[i];
            var val = values[i];

            if (!param)
                continue;

            switch (param.type) {
                case gl.FLOAT_MAT4: {
                    gl.uniformMatrix4fv(param.index, false, val);
                    break;
                }
                   
                case gl.FLOAT_MAT3: {
                    gl.uniformMatrix3fv(param.index, false, val);
                    break;
                }

                case gl.FLOAT_MAT2: {
                    gl.uniformMatrix2fv(param.index, false, val);
                    break;
                }

                case gl.FLOAT_VEC4: {
                    gl.uniform4fv(param.index, val);
                    break;
                }
                case gl.FLOAT_VEC3: {
                    gl.uniform3fv(param.index, val);
                    break;
                }
                case gl.FLOAT_VEC2: {
                    gl.uniform2fv(param.index, val);
                    break;
                }

                case gl.FLOAT: {
                    gl.uniform1fv(param.index, [val]);
                    break;
                }
   
                case gl.SAMPLER_2D: {

                    tex_count++;

                    if (!val) {
                        break;
                    }

                    val.bind(gl, tex_count);
                    gl.uniform1i(param.index, tex_count);

                    break;
                }

                case gl.SAMPLER_CUBE: {
                    break;
                }

            }

        }

    }

    /**
     * Clear the current render target
     */
    clear(bits) {

        if (arguments.length == 0) {
            bits = ClearOptions.ALL;
        }

       this.gl.clear(bits);
    }

};


module.exports = Context;