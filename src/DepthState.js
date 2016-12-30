/**
 * @file DepthState
 * @see uon.gl.DepthStencilState
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */

const CompareOp = require('./CompareOp');


/**
 * 
 */
class DepthState {

    /**
     *
     * @param enabled
     * @param cmp
     */
    constructor(enabled, cmp) {

        this.enabled = enabled;
        this.compareFunc = cmp || CompareOp.Less;

    }

    /**
     * Test for equality with anonther BlendState
     * @param {DepthState} ds
     */
    equals(dss) {
        return this.enabled === dss.enabled &&
            this.compareFunc === dss.compareFunc;
    }

    /**
     * Copy values from another blend state
     * @param {DepthState} ds
     */
    copy(dss) {
        this.enabled = dss.enabled;
        this.compareFunc = dss.compareFunc;
    }

    /**
     * Creates a copy of this object
     */
    clone() {
        return new DepthState(this.enabled, this.compareFunc);
    }


};


module.exports = DepthState;