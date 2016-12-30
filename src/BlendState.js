/**
 * @file BlendState
 * @see uon.gl.BlendState
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */

const CompareOp = require('./CompareOp');

/**
 * Represents a blend operator
 */
class BlendState {

    /**
     *
     * @param enabled
     * @param eq
     * @param src
     * @param dst
     */
    constructor(enabled, eq, src, dst) {

        this.enabled = enabled;
        this.equation = eq || 0;
        this.src = src || 0;
        this.dst = dst || 0;

    }

    /**
     * Test for equality with anonther BlendState
     * @param {BlendState} blend
     */
    equals(blend) {
        return this.enabled === blend.enabled &&
            this.equation === blend.equation &&
            this.src === blend.src &&
            this.dst === blend.dst;
    }

    /**
     * Copy values from another blend state
     * @param {BlendState} blend
     */
    copy(blend) {
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

const EQUATION = BlendState.Equation = {
    Add: 0x8006,
    Sub: 0x800A,
    InvSub: 0x800B,
    Min: null, // not supported
    Max: null // not supported
};

const BLENDING = BlendState.Blend = {
    Zero: 0,
    One: 1,
    SrcColor: 0x0300,
    OneMinusSrcColor: 0x0301,
    SrcAlpha: 0x0302,
    OneMinusSrcAlpha: 0x0303,
    DstAlpha: 0x0304,
    OneMinusDstAlpha: 0x0305,
    DstColor: 0x0306,
    OneMinusDstColor: 0x0307,
    SrcAlphaSaturate: 0x0308
};

BlendState.ADD = new BlendState(true, EQUATION.Add, BLENDING.SrcAlpha, BLENDING.One);
BlendState.SUB = new BlendState(true, EQUATION.Add, BLENDING.Zero, BLENDING.OneMinusSrcColor);
BlendState.MULTIPLY = new BlendState(true, EQUATION.Add, BLENDING.Zero, BLENDING.SrcColor);


module.exports = BlendState;