/**
 * @file ShaderProgram
 * @see uon.gl.ShaderProgram
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */
const Resource = require('./Resource');


class ShaderProgram extends Resource {

    constructor(vert, frag) {
        super();

        this.vertex = vert;
        this.fragment = frag;

    }




};
;

module.exports = ShaderProgram;