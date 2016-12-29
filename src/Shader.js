/**
 * @file Shader
 * @see uon.gl.Shader
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */
const Resource = require('./Resource');


class Shader extends Resource {

    constructor(type, src) {
        super();

        this.src = src;
        this.type = type;

    }




};

Shader.VERTEX = 1;
Shader.FRAGMENT = 2;

module.exports = Shader;