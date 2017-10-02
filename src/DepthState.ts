/**
 * @file DepthState
 * @see uon.gl.DepthStencilState
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */

import { CompareOp } from './CompareOp';

/**
 * 
 */
export class DepthState {


    enabled: boolean;
    compareFunc: CompareOp;

    /**
     *
     * @param enabled
     * @param cmp
     */
    constructor(enabled: boolean, cmp?: CompareOp) {

        this.enabled = enabled;
        this.compareFunc = cmp || CompareOp.Less;

    }

    /**
     * Test for equality with anonther BlendState
     * @param {DepthState} ds
     */
    equals(dss: DepthState) {
        return this.enabled === dss.enabled &&
            this.compareFunc === dss.compareFunc;
    }

    /**
     * Copy values from another blend state
     * @param {DepthState} ds
     */
    copy(dss: DepthState) {
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
