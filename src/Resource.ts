/**
 * @file Resource
 * @see uon.gl.Resource
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */


/**
 * Base class for GL resources
 */
export class Resource {

    _glresource: any;
    _dirty: boolean;


    constructor() {

        this._glresource = null;
        this._dirty = true;

    }

    create(gl: WebGLRenderingContext, options?: any) {
        throw new Error('You must implement create(gl) in subclass ');
    }

    update(gl: WebGLRenderingContext, options?: any) {
        throw new Error('You must implement update(gl) in subclass ');
    }

    bind(gl: WebGLRenderingContext) {
        throw new Error('You must implement bind(gl) in subclass ');
    }

    release(gl: WebGLRenderingContext) {
        throw new Error('You must implement release(gl) in subclass ');
    }

};