



module.exports = [
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