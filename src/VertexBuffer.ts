/**
 * @file VertexBuffer
 * @see uon.gl.VertexBuffer
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */
import { Resource } from './Resource';
import { PixelFormat } from './PixelFormat';
import { DataType } from './DataType';
import { VertexLayout } from './VertexLayout';


/**
 * 
 */
export class VertexBuffer extends Resource {



    private _layout: VertexLayout;
    private _data: Float32Array;
    private _count: number;
    private _dynamic: boolean;

    /**
     * Creates a new VertexBuffer
     * Note that only float attributes are supports
     * @param {VertexLayout} layout
     */
    constructor(layout: VertexLayout, count: number, data?: Float32Array, dynamic?: boolean) {

        super();

        this._layout = layout;
        this._data = data || new Float32Array(layout.getElementStride() * count);
        this._count = count;
        this._dynamic = dynamic;

    }


    get layout() {
        return this._layout;
    }

    get data() {
        return this._data;
    }

    get count() {
        return this._count;
    }

    get dynamic() {
        return this._dynamic;
    }


    create(gl: WebGLRenderingContext) {

        var id = gl.createBuffer();
        this._glresource = {
            id: id,
            target: gl.ARRAY_BUFFER,
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

