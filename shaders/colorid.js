


module.exports = [
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