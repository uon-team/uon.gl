/**
 * @file ShaderProgram
 * @see uon.gl.ShaderProgram
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */
import { Resource } from './Resource';
import { Shader } from './Shader';

/**
 * 
 */
export class ShaderProgram extends Resource {


    vertex: Shader;
    fragment: Shader;

    attributeLocations: { [k: string]: number };
    uniforms: { [k: string]: object };


    constructor(vert: Shader, frag: Shader) {
        super();

        this.vertex = vert;
        this.fragment = frag;

        this.attributeLocations = {};
        this.uniforms = {};
    }

    create(gl: WebGLRenderingContext) {

        var id = gl.createProgram();

        var vs_gl = this.vertex._glresource;
        var fs_gl = this.fragment._glresource;

        // check that the shaders has been created
        if (!vs_gl) {
            this.vertex.create(gl);
            vs_gl = this.vertex._glresource
        }

        if (!fs_gl) {
            this.fragment.create(gl);
            fs_gl = this.fragment._glresource
        }

        // attach the shaders
        gl.attachShader(id, vs_gl.id);
        gl.attachShader(id, fs_gl.id);

        // link the program
        gl.linkProgram(id);

        if (!gl.getProgramParameter(id, gl.LINK_STATUS)) {
            throw 'Linker exception: ' + gl.getProgramInfoLog(id);
        }

        // extract attributes
        var attr_count = gl.getProgramParameter(id, gl.ACTIVE_ATTRIBUTES);
        for (let i = 0; i < attr_count; i++) {

            let attr = gl.getActiveAttrib(id, i);
            let loc = gl.getAttribLocation(id, attr.name);
            gl.bindAttribLocation(id, loc, attr.name);

            this.attributeLocations[attr.name] = loc;
        }


        // extract uniforms
        attr_count = gl.getProgramParameter(id, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < attr_count; i++) {

            let attr = gl.getActiveUniform(id, i);
            let loc = gl.getUniformLocation(id, attr.name);
            let param_obj = {
                name: attr.name,
                type: attr.type,
                index: loc
            };
            this.uniforms[attr.name] = param_obj;


        }


        // save the gl resource
        this._glresource = {
            id: id
        };

    }

    update(gl: WebGLRenderingContext) {
        return
    }

    bind(gl: WebGLRenderingContext) {

        gl.useProgram(this._glresource.id);

    }

    release(gl: WebGLRenderingContext) {


        gl.deleteProgram(this._glresource.id);

        // this.vertex.release(gl);

        // this.fragment.release(gl);
    }

};