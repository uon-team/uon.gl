/**
 * @file VertexBuffer
 * @see uon.gl.VertexBuffer
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */
const Resource = require('./Resource');
const DataType = require('./DataType');
const PixelFormat = require('./PixelFormat');



/**
 * 
 */
class VertexBuffer extends Resource {

    /**
     * Creates a new VertexBuffer
     * Note that only float attributes are supports
     * @param {VertexLayout} layout
     */
    constructor(layout, count, data, dynamic) {
        super();


        this.layout = layout;
        this.data = data || new Float32Array(layout.getElementStride() * count);
        this.count = count;
        this.dynamic = dynamic;

    }

    toFloatArray() {
        return this.data;
    }

    create(gl) {

        var id = gl.createBuffer();
        this._glresource = {
            id: id,
            target: gl.ARRAY_BUFFER,
            mode: this.dynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW
        };

    }

    update(gl) {
        this.bind(gl);

        var gl_obj = this._glresource;
        gl.bufferData(gl_obj.target, this.data, gl_obj.mode);
    }

    bind(gl) {

        if (!this._glresource) {
            throw new Error('Cannot bind unexisting resource');
        }

        var gl_obj = this._glresource;
        gl.bindBuffer(gl_obj.target, gl_obj.id);

    }

    release(gl) {

        var gl_obj = this._glresource;

        gl.deleteBuffer(gl_obj.id);
    }



};


module.exports = VertexBuffer;