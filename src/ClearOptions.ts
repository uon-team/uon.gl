/**
 * @file BlendState
 * @see uon.gl.BlendState
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */

import { Color } from '@uon/math'


/**
 * Holds values for clearing the frame buffer
 */
export class ClearOptions {


    static COLOR = 0x00004000;
    static DEPTH = 0x00000100;
    static STENCIL = 0x00000400;
    static ALL = ClearOptions.COLOR | ClearOptions.DEPTH | ClearOptions.STENCIL;

    color: Color;
    depth: number;
    stencil: number;


    constructor() {

        this.color = new Color(0, 0, 0, 1.0);
        this.depth = 1.0;
        this.stencil = 0;
    }
};