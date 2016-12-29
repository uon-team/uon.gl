/**
 * @file CullState
 * @see uon.gl.CullState
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */


/**
 * 
 */
class CullState {

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

module.exports = CullState;