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

        // create a new gl shader
        var id = gl.createShader(this.type);

        // set shader source
        gl.shaderSource(id, this.src);

        // compile shader
        gl.compileShader(id);

        // check compile status
        if (!gl.getShaderParameter(id, gl.COMPILE_STATUS)) {
            console.error(gl.getShaderInfoLog(id), this);

            throw new Error(gl.getShaderInfoLog(id));
        }

        this._glresource = {
            id: id
        };

    }

    update(gl) {
        return;
    }

    bind(gl) {
        return;
    }

    release(gl) {

        gl.deleteShader(this._glresource.id);
    }


};

Shader.VERTEX = 0x8B31;
Shader.FRAGMENT = 0x8B30;

module.exports = Shader;