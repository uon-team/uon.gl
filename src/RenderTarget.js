/**
 * @file RenderTarget
 * @see uon.gl.RenderTarget
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */
const Resource = require('./Resource');


class RenderTarget extends Resource {

    constructor(width, height, type, format) {
      
        this.width = width;
        this.height = height;
        this.format = format;
        this.type = type;

    }



};


module.exports = RenderTarget;