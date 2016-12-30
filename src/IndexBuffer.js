/**
 * @file IndexBuffer
 * @see uon.gl.IndexBuffer
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */
const Resource = require('./Resource');

/**
 * 
 */
class IndexBuffer extends Resource {

    /**
     * Creates a new IndexBuffer
     */
    constructor(count, data, dynamic) {
        super();


        this.data = data || new Uint16Array(count);
        this.count = count;
        this.dynamic = dynamic;

    }

    toUintArray() {
        return this.data;
    }

    create(gl) {

        var id = gl.createBuffer();
        this._glresource = {
            id: id,
            target: gl.ELEMENT_ARRAY_BUFFER,
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


module.exports = IndexBuffer;