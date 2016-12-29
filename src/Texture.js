/**
 * @file Texture
 * @see uon.gl.Texture
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */
const Resource = require('./Resource');


class Texture extends Resource {

    constructor(width, height, type, format) {
        super();

        this.image = null;
        this.width = width;
        this.height = height;
        this.format = format;
        this.type = type;

    }

    static FromImage(image) {

        var texture = new Texture(image.width, image.height, 'ubyte', 'rgba');
        texture.image = image;

        return texture;
    }



};

Texture.Format = {
    RGBA: 'rgba',
    RGB: 'rgb'
};

Texture.Type = {
    Float: 'float',
    Half: 'half',
    UByte: 'ubyte'
};

module.exports = Texture;