/**
 * @file StencilState
 * @see uon.gl.StencilState
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */

const CompareOp = require('./CompareOp');


/**
 * 
 */
class StencilState {

    /**
     *
     * @param enabled
     */
    constructor(enabled) {

        this.enabled = enabled || true;
        this.readMask = 0
        this.writedMask = 0;
        this.fail = StencilState.Func.Keep;
        this.depthFail = StencilState.Func.Keep;
        this.pass = StencilState.Func.Keep;
        this.compareFunc = CompareOp.Less;

    }

    /**
     * Test for equality with anonther BlendState
     * @param {StencilState} ss
     */
    equals(ss) {
        return this.enabled === ss.enabled;
    }

    /**
     * Copy values from another blend state
     * @param {StencilState} ss
     */
    copy(ss) {
        this.enabled = ss.enabled;

    }

    /**
     * Creates a copy of this object
     */
    clone() {
        return new StencilState(this.enabled);
    }


};

StencilState.Func = {
    Keep: 0x1E00,
    Replace: 0x1E01,
    IncreaseWrap: 0x8507,
    DecreaseWrap: 0x8508,
    Invert: 0x150A,
    Increase: 0x1E02,
    Decrease: 0x1E03,
}


module.exports = StencilState;