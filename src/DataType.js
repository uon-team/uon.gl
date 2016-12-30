/**
 * @file DataType
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */



const TYPE_SIZE = [
    4, 8, 1, 2, 4, 1, 2, 4
]

const GL_TYPE = [

    0x8D61, // half : HALF_FLOAT_OES
    0x1406, // float
    0x1406, // double not supported,
    0x1400, //Int8
    0x1402, //Int16: 4,
    0x1404, //Int32: 5,
    0x1401, //Uint8: 6,
    0x1403, //Uint16: 7,
    0x1405, //Uint32: 8,
]

module.exports = {

    Half: 0,
    Float: 1,
    Double: 2,
    Int8: 3,
    Int16: 4,
    Int32: 5,
    Uint8: 6,
    Uint16: 7,
    Uint32: 8,

    GetSize: function (type) {
        return TYPE_SIZE[type];
    },

    ToGLType: function (type) {
        return GL_TYPE[type];
    }
  

};