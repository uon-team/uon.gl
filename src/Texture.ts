/**
 * @file Texture
 * @see uon.gl.Texture
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */
import { Resource } from './Resource';
import { PixelFormat } from './PixelFormat';
import { DataType, ToGLType } from './DataType';


/**
 * 
 */
export class Texture extends Resource {

    image: HTMLImageElement;
    width: number;
    height: number;
    type: DataType;
    format: PixelFormat;
    mipmap: boolean;


    constructor(width: number,
        height: number,
        type: DataType,
        format: PixelFormat,
        mipmap?: boolean) {

        super();

        this.image = null;
        this.width = width;
        this.height = height;
        this.format = format;
        this.type = type;
        this.mipmap = mipmap || false;

    }

    static FromImage(image: HTMLImageElement) {

        var texture = new Texture(image.width, image.height, DataType.Uint8, PixelFormat.RGBA);
        texture.image = image;

        return texture;
    }

    create(gl: WebGLRenderingContext) {

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

    update(gl: WebGLRenderingContext) {

        var id = this._glresource.id;

        // bind our new texture
        gl.bindTexture(gl.TEXTURE_2D, id);

        // set pixel store attributes
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
        gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.NONE);

        // upload the image to vram
        // gl.texImage2D(gl.TEXTURE_2D, 0, this.format, this.format, ToGLType(this.type), this.image);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);

        // TODO pass a sampler state...
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        // generate mipmaps if user requested it
        if (this.mipmap) {
            gl.generateMipmap(gl.TEXTURE_2D);
        }



    }

    bind(gl: WebGLRenderingContext, unit?: number) {

        var gl_obj = this._glresource;

        if (unit !== undefined) {
            gl.activeTexture(gl.TEXTURE0 + unit);
            gl_obj.unit = unit;
        }

        gl.bindTexture(gl.TEXTURE_2D, gl_obj.id);
        gl_obj.bound = true;

    }

    release(gl: WebGLRenderingContext) {

        gl.deleteTexture(this._glresource.id);

    }



};
