/**
 * @file Texture
 * @see uon.gl.Texture
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */
const Resource = require('./Resource');


class Texture extends Resource {

    constructor(width, height, format, data) {
        super();

        this.width = width;
        this.height = height;
        this.format = format;
        this.data = data;

    }

    static FromImage(image) {

    }



};

module.exports = Texture;