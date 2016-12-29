/**
 * @file BlendState
 * @see uon.gl.BlendState
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */


/**
 * 
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
     * Clones the blend state
     */
    clone() {
        return new BlendState(this.enabled, this.equation, this.src, this.dst);
    }


};

BlendState.Equation = {
    Add: 0,
    Sub: 1,
    InvSub: 2,
    Min: 3,
    Max: 4
};

BlendState.Blend = {
    Zero: 0,
    One: 1,
    SrcColor: 2,
    OneMinusSrcColor: 3,
    SrcAlpha: 4,
    OneMinusSrcAlpha: 5,
    DstAlpha: 6,
    OneMinusDstAlpha: 7,
    DstColor: 8,
    OneMinusDstColor: 9,
    SrcAlphaSaturate: 10
};

BlendState.ADD = new BlendState(true, 0, 4, 1);
BlendState.SUB = new BlendState(true, 0, 0, 3);
BlendState.MULTIPLY = new BlendState(true, 0, 0, 2);


module.exports = BlendState;