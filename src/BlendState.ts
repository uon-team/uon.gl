/**
 * @file BlendState
 * @see uon.gl.BlendState
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */
import { CompareOp } from './CompareOp';
import { StateBase } from './StateBase';

export enum Equation {

    Add = 0x8006,
    Sub = 0x800A,
    InvSub = 0x800B,
    Min = null, // not supported
    Max = null // not supported
};

export enum Blending {
    Zero = 0,
    One = 1,
    SrcColor = 0x0300,
    OneMinusSrcColor = 0x0301,
    SrcAlpha = 0x0302,
    OneMinusSrcAlpha = 0x0303,
    DstAlpha = 0x0304,
    OneMinusDstAlpha = 0x0305,
    DstColor = 0x0306,
    OneMinusDstColor = 0x0307,
    SrcAlphaSaturate = 0x0308
};

/**
 * Represents a blend operator
 */
export class BlendState {

    static ADD = new BlendState(true, Equation.Add, Blending.SrcAlpha, Blending.OneMinusSrcAlpha);
    static SUB = new BlendState(true, Equation.Add, Blending.Zero, Blending.OneMinusSrcColor);
    static MULTIPLY = new BlendState(true, Equation.Add, Blending.Zero, Blending.SrcColor);


    enabled: boolean;
    equation: Equation;
    src: Blending;
    dst: Blending;

    /**
     *
     * @param enabled
     * @param eq
     * @param src
     * @param dst
     */
    constructor(enabled: boolean, eq?: Equation, src?: Blending, dst?: Blending) {

        this.enabled = enabled;
        this.equation = eq || Equation.Add;
        this.src = src || Blending.Zero;
        this.dst = dst || Blending.Zero;

    }

    /**
     * Test for equality with anonther BlendState
     * @param {BlendState} blend
     */
    equals(blend: BlendState) {
        return this.enabled === blend.enabled &&
            this.equation === blend.equation &&
            this.src === blend.src &&
            this.dst === blend.dst;
    }

    /**
     * Copy values from another blend state
     * @param {BlendState} blend
     */
    copy(blend: BlendState) {
        this.enabled = blend.enabled;
        this.equation = blend.equation;
        this.src = blend.src;
        this.dst = blend.dst;
    }

    /**
     * Creates a copy of this object
     */
    clone() {
        return new BlendState(this.enabled, this.equation, this.src, this.dst);
    }


};
