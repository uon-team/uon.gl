/**
 * @file IndexBuffer
 * @see uon.gl.IndexBuffer
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */

import { Resource } from './Resource';

/**
 * 
 */
export class IndexBuffer extends Resource {

    data: Uint16Array;
    count: number;
    dynamic: boolean;

    /**
     * Creates a new IndexBuffer
     */
    constructor(count: number, data?: Uint16Array, dynamic?: boolean) {

        super();

        this.data = data || new Uint16Array(count);
        this.count = count;
        this.dynamic = dynamic;

    }

    toUintArray() {
        return this.data;
    }

    create(gl: WebGLRenderingContext) {

        var id = gl.createBuffer();
        this._glresource = {
            id: id,
            target: gl.ELEMENT_ARRAY_BUFFER,
            mode: this.dynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW
        };

    }

    update(gl: WebGLRenderingContext) {
        this.bind(gl);

        var gl_obj = this._glresource;
        gl.bufferData(gl_obj.target, this.data, gl_obj.mode);
    }

    bind(gl: WebGLRenderingContext) {

        if (!this._glresource) {
            throw new Error('Cannot bind unexisting resource');
        }

        var gl_obj = this._glresource;
        gl.bindBuffer(gl_obj.target, gl_obj.id);

    }

    release(gl: WebGLRenderingContext) {

        var gl_obj = this._glresource;

        gl.deleteBuffer(gl_obj.id);
    }



};
