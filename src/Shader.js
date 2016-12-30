/**
 * @file Shader
 * @see uon.gl.Shader
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */
const Resource = require('./Resource');

/**
 * 
 */
class Shader extends Resource {

    constructor(type, src) {
        super();

        this.src = src;
        this.type = type;

    }

    create(gl) {
        throw new Error('You must implement create(gl) in subclass ' + this.constructor.name);
    }

    update(gl) {
        throw new Error('You must implement update(gl) in subclass ' + this.constructor.name);
    }

    bind(gl) {
        throw new Error('Cannot call bind on a Shader, bind must be called on a ShaderProgram');
    }

    release(gl) {
        throw new Error('You must implement release(gl) in subclass ' + this.constructor.name);
    }


};

Shader.VERTEX = 0;
Shader.FRAGMENT = 1;

module.exports = Shader;