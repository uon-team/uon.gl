/**
 * @file uon.gl
 * @see uon.gl

 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */

/**
 * The namespace for UON GL framework
 * @namespace uon.gl
 * 
 */
const gl = {
    BlendState: require('./src/Context'),
    Color: require('./src/Color'),
    ClearOptions: require('./src/ClearOptions'),
    CompareOp: require('./src/CompareOp'),
    Context: require('./src/Context'),
    CullState: require('./src/CullState'),
    DataType: require('./src/DataType'),
    DepthState: require('./src/DepthState'),
    IndexBuffer: require('./src/IndexBuffer'),
    PixelFormat: require('./src/PixelFormat'),
    RenderTarget: require('./src/RenderTarget'),
    Resource: require('./src/Resource'),
    Shader: require('./src/Shader'),
    ShaderManager: require('./src/ShaderManager'),
    ShaderProgram: require('./src/ShaderProgram'),
    StencilState: require('./src/StencilState'),
    Texture: require('./src/Texture'),
    Topology: require('./src/Topology'),
    VertexBuffer: require('./src/VertexBuffer'),
    VertexLayout: require('./src/VertexLayout')
};


module.exports = gl;