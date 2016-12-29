



const TYPE_SIZE = [
    4, 8, 1, 2, 4, 1, 2, 4
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
    }
  

};