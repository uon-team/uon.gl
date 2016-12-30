﻿/**
 * @file RenderTarget
 * @see uon.gl.RenderTarget
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */
const Resource = require('./Resource');


class RenderTarget extends Resource {

    constructor(width, height, type, format) {

        super();

        this.width = width;
        this.height = height;
        this.format = format;
        this.type = type;

    }

    create(gl) {

        // create and bind a framebuffer
        var framebuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);

        // create and bind a texture
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, this.format, this.width, this.height, 0, this.format, this.type, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        // create a depth attachment
        var depth = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, depth);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.width, this.height);

        // attach render buffers to framebuffer
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depth);

        if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
            throw new Error('Couldnt crea a render target');
        }
  
        this._glresource = {
            fbo: framebuffer,
            color: texture,
            depth: depth,
            unit: -1
        };

    }

    update(gl) {
        throw new Error('You must implement update(gl) in subclass ' + this.constructor.name);
    }

    bind(gl) {

        gl.bindFramebuffer(gl.FRAMEBUFFER, this._glresource.fbo);

    }

    release(gl) {

        gl.deleteTexture(this._glresource.color);
        gl.deleteRenderbuffer(this._glresource.depth);
        gl.deleteFramebuffer(this._glresource.fbo);

        this._glresource = null;
        
    }



};


module.exports = RenderTarget;