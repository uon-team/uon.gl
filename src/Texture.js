/**
 * @file Texture
 * @see uon.gl.Texture
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */
const Resource = require('./Resource');
const DataType = require('./DataType');
const PixelFormat = require('./PixelFormat');


/**
 * 
 */
class Texture extends Resource {

    constructor(width, height, type, format, mipmap) {
        super();

        this.image = null;
        this.width = width;
        this.height = height;
        this.format = format;
        this.type = type;

    }

    static FromImage(image) {

        var texture = new Texture(image.width, image.height, DataType.Uint8, PixelFormat.RGBA);
        texture.image = image;

        return texture;
    }

    create(gl, options) {

        // check if we are allowed
        if (this._glresource) {
            throw new Error('Cannot call create on an already created texture');
        }

        // create a gl texture
        var id = gl.createTexture();


        // save our gl object
        this._glresource = {
            id: id,
            unit: -1,
            bound: false
        };


    }

    update(gl, options) {

        var id = this._glresource.id;

        // bind our new texture
        gl.bindTexture(gl.TEXTURE_2D, id);

        // set pixel store attributes
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
        gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.NONE);

        // upload the image to vram
        gl.texImage2D(gl.TEXTURE_2D, 0, this.format, this.format, DataType.ToGLType(this.type), this.image);

        // TODO pass a sampler state...
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

        // generate mipmaps if user requested it
        if (options && options.mipmap) {
            gl.generateMipmap(gl.TEXTURE_2D);
        }



    }

    bind(gl, unit) {

        var gl_obj = this._glresource;

        if (unit !== undefined) {
            gl.activeTexture(gl.TEXTURE0 + unit);
            gl_obj.unit = unit;
        }

        gl.bindTexture(gl.TEXTURE_2D, gl_obj.id);
        gl_obj.bound = true;

    }

    release(gl) {

        gl.deleteTexture(this._glresource.id);

    }



};


module.exports = Texture;