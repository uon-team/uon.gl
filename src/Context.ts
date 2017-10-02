/**
 * @file Context
 * @see uon.gl.Context
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */

import { BlendState } from './BlendState';
import { DepthState } from './DepthState';
import { StencilState } from './StencilState';
import { CullState } from './CullState';
import { Color } from './Color';
import { ClearOptions } from './ClearOptions';
import { DataType, ToGLType } from './DataType';

import { ShaderProgram } from './ShaderProgram';
import { RenderTarget } from './RenderTarget';
import { VertexBuffer } from './VertexBuffer';
import { IndexBuffer } from './IndexBuffer';
import { Topology } from './Topology';
import { Resource } from './Resource';



interface ContextOptions {

}

/**
 *  The web gl context
 */
export class Context {


    canvas: HTMLCanvasElement;
    gl: WebGLRenderingContext;

    private _extensions: { [s: string]: any };
    private _blendState: BlendState;
    private _depthState: DepthState;
    private _stencilState: StencilState;
    private _cullState: CullState;
    private _clearOptions: ClearOptions;
    private _currentProgram: ShaderProgram;
    private _currentRenderTarget: RenderTarget;

    private _lastUsedAttributeLocs: number[] = [];

    /**
     * Creates a new web gl context
     * @param canvas
     * @param options
     */
    constructor(canvas: HTMLCanvasElement, options: any) {

        let context_options = {
            alpha: true,
            depth: true,
            stencil: true,
            antialias: true,
            premultipliedAlpha: false,
            preserveDrawingBuffer: false
        };

        // the canvas element on which we do the rendering
        this.canvas = canvas;

        // the gl context
        this.gl = <WebGLRenderingContext>(canvas.getContext("webgl", context_options) || canvas.getContext("experimental-webgl", context_options));

        if (!this.gl) {
            throw new Error('Counldnt get webgl context from canvas');
        }

        // init extentions

        var ext_list = [
            "ANGLE_instanced_arrays",
            "OES_texture_float",
            "OES_texture_half_float",
            "OES_texture_float_linear",
            "EXT_frag_depth"
        ];

        this._extensions = {};


        ext_list.forEach((name) => {
            var ext = this.gl.getExtension(name);
            if (ext) {
                this._extensions[name] = ext;
            } else {
                console.warn("Couldnt initialize extension", name);
            }
        })



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

        let gl = this.gl;

        /*if (this._depthState.equals(val)) {
            return;
        }*/

        gl.depthFunc(val.compareFunc)

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

        let gl = this.gl;

        /*if (this._stencilState.equals(val)) {
            return;
        }
        */

        if (val.enabled) {
            gl.enable(gl.STENCIL_TEST);
        } else {
            gl.disable(gl.STENCIL_TEST);
        }

        gl.stencilFunc(val.compareFunc, val.value, val.readMask);

        gl.stencilOp(val.fail, val.depthFail, val.depthPass);

        gl.stencilMask(val.writeMask);


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

       /* if (this._cullState.equals(val)) {
            return;
        }*/

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
    set clearOptions(val: ClearOptions) {

        let gl = this.gl;
        let color = val.color;
        gl.clearColor(color.r, color.g, color.b, color.a);
        gl.clearDepth(val.depth);
        gl.clearStencil(val.stencil);

        this._clearOptions = val;
    }

    /**
     * Set the render buffer to render to
     */
    set renderTarget(rt: RenderTarget) {

        let gl = this.gl;

        this._currentRenderTarget = rt;

        if (rt == null) {
            this.gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        } else {
            rt.bind(this.gl);
        }
    }

    set program(p: ShaderProgram) {
        
        this._currentProgram = p;
        this.bind(p);
    }


    /**
     * Sets the viewport in pixels
     * @param x
     * @param y
     * @param w
     * @param h
     */
    setViewport(x: number, y: number, w: number, h: number) {

        //console.log(w, h);
        this.gl.viewport(x, y, w, h);
    }





    /**
     * Update/Create a gl resource
     * @param resource
     */
    update(resource: Resource, options?: any) {

        if (resource._glresource == null) {
            resource.create(this.gl, options);
        }

        resource.update(this.gl, options);
    }

    /**
     * Release a resource
     * @param resource
     */
    release(resource: Resource) {

        resource.release(this.gl);

        resource._glresource = null;
    }

    /**
     * 
     * @param resource
     */
    bind(resource: Resource) {
        resource.bind(this.gl);
    }

    /**
     * Draw a model
     * @param vbuffer
     * @param ibuffer
     * @param topology
     */
    draw(vbuffer: VertexBuffer, ibuffer: IndexBuffer, topology: Topology, count?: number) {

        // bind the vbuffer
        vbuffer.bind(this.gl);

        // bind attributes
        this.bindAttributes(vbuffer);


        if (!ibuffer) {


            if (vbuffer.count == 0) {
                //console.error('0 vertices, ABORTINGS');
                return;
            }
           
            // draw without indices
            this.gl.drawArrays(topology, 0, count || vbuffer.count);

        } else {

            if (ibuffer.count == 0) {
                //console.error('0 vertices, ABORTINGS');
                return;
            }


            // bind index buffer
            ibuffer.bind(this.gl);

            // draw with indices
            this.gl.drawElements(topology, count || ibuffer.count, this.gl.UNSIGNED_SHORT, 0);
        }


    }

    /**
     * Draw a
     * @param vbuffer
     * @param ibuffer
     * @param instbuffer
     * @param topology
     * @param count
     */
    drawInstanced(
        vbuffer: VertexBuffer,
        ibuffer: IndexBuffer,
        instbuffer: VertexBuffer,
        topology: Topology,
        count: number) {

        var gl = this.gl;
        var inst_ext = this._extensions['ANGLE_instanced_arrays'];

        if (!inst_ext) {
            console.warn('Cannot drawInstanced because ANGLE_instanced_arrays extension is not supported.');
            return;
        }

        // bind the vbuffer
        vbuffer.bind(this.gl);

        // bind attributes
        this.bindAttributes(vbuffer);

        // bind instance buffer
        instbuffer.bind(this.gl);

        // bind attributes
        this.bindAttributes(instbuffer, 1);


        if (!ibuffer) {

            // draw without indices
            inst_ext.drawArraysInstancedANGLE(topology, 0, vbuffer.count, count);

        } else {

            // bind index buffer
            ibuffer.bind(this.gl);

            // draw with indices
            inst_ext.drawElementsInstancedANGLE(topology, ibuffer.count, gl.UNSIGNED_SHORT, 0, count);
        }

    }

    /**
     * 
     * @param vb
     * @param divisor
     */
    bindAttributes(vb: VertexBuffer, divisor?: number) {

        var gl = this.gl;
        var inst_ext = this._extensions['ANGLE_instanced_arrays'];

        var vsize = vb.layout.getStride(),
            elements = vb.layout.attributes,
            element;

        for (let i = 0; i < this._lastUsedAttributeLocs.length; i++) {
            gl.disableVertexAttribArray(this._lastUsedAttributeLocs[i]);
        }

        this._lastUsedAttributeLocs.length = 0;

        for (let i = 0; i < elements.length; i++) {

            element = elements[i];

            var loc = this._currentProgram.attributeLocations[element.usage];

            if (loc !== undefined) {

                this._lastUsedAttributeLocs.push(loc);

                gl.enableVertexAttribArray(loc);
                gl.vertexAttribPointer(loc, element.count, ToGLType(element.type), false, vsize, element.offset);

                if (inst_ext && divisor !== undefined) {

                    inst_ext.vertexAttribDivisorANGLE(loc, divisor);

                } /*else if (inst_ext) {

                    inst_ext.vertexAttribDivisorANGLE(loc, 0);

                }*/

            }
        }

    }

    /**
     * Sets uniforms for the current program
     * @param {Object} values
     */
    uniforms(values: any) {

        if (this._currentProgram == null) {
            throw new Error('A program must be bound before you can apply uniforms');
        }

        var gl = this.gl;
        var tex_count = -1;
        var program_uniforms = this._currentProgram.uniforms;


        for (var i in values) {

            var param: any = program_uniforms[i];
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

                    //console.log('binding', tex_count);
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
    clear(bits: number) {

        if (arguments.length == 0) {
            bits = ClearOptions.ALL;
        }

        this.gl.clear(bits);
    }

};
