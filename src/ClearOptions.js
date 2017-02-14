/**
 * @file BlendState
 * @see uon.gl.BlendState
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */

const Color = require('./Color');

/**
 * Holds values for clearing the frame buffer
 */
class ClearOptions {

    constructor() {

        this.color = new Color(0, 0, 0, 1.0);
        this.depth = 1.0;
        this.stencil = 0;
    }
};

ClearOptions.COLOR = 0x00004000;
ClearOptions.DEPTH = 0x00000100;
ClearOptions.STENCIL = 0x00000400;
ClearOptions.ALL = ClearOptions.COLOR | ClearOptions.DEPTH | ClearOptions.STENCIL;

module.exports = ClearOptions;