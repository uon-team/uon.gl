/**
 * @file ShaderManager
 * @see uon.gl.ShaderManager
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */

import { ShaderProgram } from './ShaderProgram';
import { Shader } from './Shader';


const DEFAULT_VERTEX = [
    'precision highp float;',

    'attribute vec3 position;',
    'attribute vec3 normal;',
    'attribute vec2 texcoord;',
    'attribute vec3 color;',

    'uniform mat4 World;',
    'uniform mat4 ViewProjection;',
    'uniform float LogDepthBufferFar;',

    'varying vec4 vColor;',
    'varying vec3 vNormal;',
    'varying vec2 vTexcoord;',

    'varying float vFragDepth;',


    'void main(void)',
    '{',
    '	vec4 world_pos = World * vec4(position, 1.0);',
    '	vColor = vec4(color, 1.0);',
    '	vNormal = normal;',
    '	vTexcoord = texcoord;',

    '	gl_Position = ViewProjection * world_pos;',
    '	vFragDepth = 1.0 + gl_Position.w;',

    '}'].join('\n');

const COLOR_ID = [
    'precision highp float;',

    'uniform float LogDepthBufferFar;',
    'uniform vec3 CameraPosition;',

    'uniform vec4 ObjectID;',


    /*'#extension GL_EXT_frag_depth : enable',
    'varying float vFragDepth;',*/


    'void main() {',

    '    gl_FragColor = vec4(ObjectID.xyz, 1.0);',
    /*'    gl_FragDepthEXT = log2(vFragDepth) * LogDepthBufferFar * 0.5;',*/
    '}'
].join('\n');


/**
 * 
 */
export class ShaderManager {


    private programs: { [k:string] : ShaderProgram };
    private shaders: { [k: string]: Shader };


    constructor(options: any) {

        options = options || {};
        options.path = options.path || '/shaders';
        options.vertexExt = options.vertexExt || 'vsh';
        options.fragmentExt = options.fragmentExt || 'fsh';

        this.programs = {};
        this.shaders = {

            'default.v': new Shader(Shader.VERTEX, DEFAULT_VERTEX),
            'colorid.f': new Shader(Shader.FRAGMENT, COLOR_ID),
        };

    }


    get(vkey: string, fkey: string) {

        var key = [vkey, fkey].join(':');

        // program already exists
        if (this.programs[key]) {
            return this.programs[key];
        }

        // program doesnt exist, grab shaders
        var vert = this.shaders[vkey];
        var frag = this.shaders[fkey];

        if (vert == null) {
            throw new Error('Vertex shader with key ' + vkey + ' doesnt exist');
        }

        if (frag == null) {
            throw new Error('Fragment shader with key ' + fkey + ' doesnt exist');
        }

        var program = new ShaderProgram(vert, frag);

        this.programs[key] = program;

        return program;
    }


};
