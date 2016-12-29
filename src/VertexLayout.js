/**
 * @file VertexLayout
 * @see uon.gl.VertexLayout
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */

const DataType = require('./DataType');


class Attribute {

    constructor(usage, type, count, offset) {
        this.usage = usage;
        this.type = type;
        this.count = count;
        this.offset = offset;
    }
}
/**
 * 
 */
class VertexLayout {


    constructor(attrs) {

        this.attributes = [];
        this.offset = 0;
    }


    add(usage, type, count) {

        var size = DataType.GetSize(type);

        this.offset += size * count;
        this.attributes.push(new Attribute(usage, type, count, this.offset));
    }

    getStride() {
        return offset;
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