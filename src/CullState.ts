/**
 * @file CullState
 * @see uon.gl.CullState
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */



export enum Winding {
    CCW = 0x0901,
    CW = 0x0900
}

/**
 * 
 */
export class CullState {

    enabled: boolean;
    winding: Winding;

    /**
     *
     * @param enabled
     * @param winding
     */
    constructor(enabled: boolean, winding?: Winding) {

        this.enabled = enabled;
        this.winding = winding || Winding.CCW;

    }

    /**
     * Test for equality with anonther CullState
     * @param {CullState} cs
     */
    equals(cs: CullState) {
        return this.enabled === cs.enabled &&
            this.winding === cs.winding;
    }

    /**
     * Copy values from another blend state
     * @param {CullState} cs
     */
    copy(cs: CullState) {
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