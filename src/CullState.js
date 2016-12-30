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
     * @param winding
     */
    constructor(enabled, winding) {

        this.enabled = enabled;
        this.winding = winding || CullState.CCW;

    }

    /**
     * Test for equality with anonther CullState
     * @param {CullState} cs
     */
    equals(cs) {
        return this.enabled === cs.enabled &&
            this.winding === cs.winding;
    }

    /**
     * Copy values from another blend state
     * @param {CullState} cs
     */
    copy(cs) {
        this.enabled = cs.enabled;
        this.winding = cs.winding;
    }

    /**
     * Creates a copy of this object
     */
    clone() {
        return new CullState(this.enabled, this.winding);
    }


};

CullState.CCW = 0x0901;
CullState.CW = 0x0900;

module.exports = CullState;