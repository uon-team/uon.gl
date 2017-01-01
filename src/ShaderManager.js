/**
 * @file ShaderManager
 * @see uon.gl.ShaderManager
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */

const ShaderProgram = require('./ShaderProgram');
const Shader = require('./Shader');

const SHADERMANAGER_INSTANCE = null;



/**
 * 
 */
class ShaderManager {

    constructor(options) {

        options = options || {};
        options.path = options.path || '/shaders';
        options.vertexExt = options.vertexExt || 'vsh';
        options.fragmentExt = options.fragmentExt || 'fsh';

        this._programs = {};
        this._shaders = {

            'default.v': new Shader(Shader.VERTEX, require('../shaders/default')),
            'colorid.f': new Shader(Shader.FRAGMENT, require('../shaders/colorid')),
        };

    }


    get(vkey, fkey) {

        var key = [vkey, fkey].join(':');

        // program already exists
        if (this._programs[key]) {
            return this._programs[key];
        }

        // program doesnt exist, grab shaders
        var vert = this._shaders[vkey];
        var frag = this._shaders[fkey];

        if (vert == null) {
            throw new Error('Vertex shader with key ' + vkey + ' doesnt exist');
        }

        if (frag == null) {
            throw new Error('Fragment shader with key ' + fkey + ' doesnt exist');
        }

        var program = new ShaderProgram(vert, frag);

        this._programs[key] = program;

        return program;
    }


};


module.exports = ShaderManager;