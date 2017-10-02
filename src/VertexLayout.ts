/**
 * @file VertexLayout
 * @see uon.gl.VertexLayout
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */

import { DataType, GetTypeSize } from './DataType';

/**
 * VertexLayout element
 */
export class Attribute {

    constructor(
        public usage: string,
        public type: DataType,
        public count: number,
        public offset: number) {
       
    }
};

/**
 * Vertex buffer layout descriptor
 */
export class VertexLayout {


    attributes: Attribute[];
    offset: number;
    elementCount: number;

    /**
     * 
     * @param {Array} attrs
     */
    constructor() {

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
    add(usage: string, type: DataType, count: number) {

        if (type != DataType.Float) {
            throw new Error('Only Float elements are supported in WebGL 1');
        }

        var size = GetTypeSize(type);


        this.attributes.push(new Attribute(usage, type, count, this.offset));

        this.offset += size * count;
        this.elementCount += count;
        
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
    equals(vl: VertexLayout) {

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