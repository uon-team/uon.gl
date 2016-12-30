/**
 * @file Resource
 * @see uon.gl.Resource
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */


/**
 * Base class for GL resources
 */
class Resource {

    constructor() {

        this._glresource = null;
        this._dirty = true;

    }

    create(gl) {
        throw new Error('You must implement create(gl) in subclass ' + this.constructor.name);
    }

    update(gl) {
        throw new Error('You must implement update(gl) in subclass ' + this.constructor.name);
    }

    bind(gl) {
        throw new Error('You must implement bind(gl) in subclass ' + this.constructor.name);
    }

    release(gl) {
        throw new Error('You must implement release(gl) in subclass ' + this.constructor.name);
    }

};

module.exports = Resource;