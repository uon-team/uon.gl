/**
 * @file ShaderProgram
 * @see uon.gl.ShaderProgram
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */
const Resource = require('./Resource');

/**
 * 
 */
class ShaderProgram extends Resource {

    constructor(vert, frag) {
        super();

        this.vertex = vert;
        this.fragment = frag;

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

module.exports = ShaderProgram;