/**
 * @file Shader
 * @see uon.gl.Shader
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */

import { Resource } from './Resource';


/**
 * 
 */
export class Shader extends Resource {


    static VERTEX = 0x8B31;
    static FRAGMENT = 0x8B30;

    src: string;
    type: number;


    constructor(type: number, src: string) {
        super();

        this.src = src;
        this.type = type;

    }

    create(gl: WebGLRenderingContext) {

        // create a new gl shader
        var id = gl.createShader(this.type);

        // set shader source
        gl.shaderSource(id, this.src);

        // compile shader
        gl.compileShader(id);

        // check compile status
        if (!gl.getShaderParameter(id, gl.COMPILE_STATUS)) {
            console.error(gl.getShaderInfoLog(id), this);

            throw new Error(gl.getShaderInfoLog(id));
        }

        this._glresource = {
            id: id
        };

    }

    update(gl: WebGLRenderingContext) {
        return;
    }

    bind(gl: WebGLRenderingContext) {
        return;
    }

    release(gl: WebGLRenderingContext) {

        gl.deleteShader(this._glresource.id);
    }


};
