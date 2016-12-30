/**
 * @file VertexLayout
 * @see uon.gl.VertexLayout
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */

const DataType = require('./DataType');


/**
 * VertexLayout element
 */
class Attribute {

    constructor(usage, type, count, offset) {
        this.usage = usage;
        this.type = type;
        this.count = count;
        this.offset = offset;
    }
};

/**
 * Vertex buffer layout descriptor
 */
class VertexLayout {


    /**
     * 
     * @param {Array} attrs
     */
    constructor(attrs) {

        this.attributes = [];
        this.offset = 0;
        this.elementCount = 0;
    }

    /**
     * Appends a new element to the vertex layout descriptor
     * @param {String} usage - The name of the vertex attr used in the shader
     * @param {Number} type - The data type for the attribute
     * @param {Number} count - The number of elements
     */
    add(usage, type, count) {

        if (type != DataType.Float) {
            throw new Error('Only Float elements are supported in WebGL 1');
        }

        var size = DataType.GetSize(type);

        this.offset += size * count;
        this.elementCount += count;
        this.attributes.push(new Attribute(usage, type, count, this.offset));
    }

    /**
     * Get the stride size in basic machine units
     * @return {Number}
     */
    getStride() {
        return this.offset;
    }

    /**
     * Get the number of float elements in the vertex
     */
    getElementStride() {
        return this.elementCount;
    }

    /**
     * Test for equality with anonther layout
     * @param {VertexLayout} vl
     */
    equals(vl) {

        if (this.attributes.length != vl.attributes.length) {
            return false;
        }

        for (var i = 0, l = this.attributes.length; i < l; ++i) {

            if (this.attributes[i].usage != vl.attributes[i].usage ||
                this.attributes[i].type != vl.attributes[i].type ||
                this.attributes[i].count != vl.attributes[i].count) {

                return false;
            }
        }

        return true;
    }


};


module.exports = VertexLayout;