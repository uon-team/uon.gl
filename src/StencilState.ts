/**
 * @file StencilState
 * @see uon.gl.StencilState
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */

import { CompareOp } from './CompareOp';



export enum StencilOp {

    Keep= 0x1E00,
    Replace= 0x1E01,
    IncreaseWrap= 0x8507,
    DecreaseWrap= 0x8508,
    Invert= 0x150A,
    Increase= 0x1E02,
    Decrease= 0x1E03,

}

/**
 * 
 */
export class StencilState {


    enabled: boolean;
    value: number;
    readMask: number;
    writeMask: number;
    fail: StencilOp;
    depthFail: StencilOp;
    depthPass: StencilOp;
    compareFunc: CompareOp;

    /**
     *
     * @param enabled
     */
    constructor(enabled: boolean) {

        this.enabled = enabled || true;
        this.value = 0;
        this.readMask = 0xFF;
        this.writeMask = 0xFF;

        this.fail = StencilOp.Keep;
        this.depthFail = StencilOp.Keep;
        this.depthPass = StencilOp.Replace;
        this.compareFunc = CompareOp.Less;

    }

    /**
     * Test for equality with anonther BlendState
     * @param {StencilState} ss
     */
    equals(ss: StencilState) {
        return this.enabled === ss.enabled && this.value == ss.value && this.readMask == ss.readMask &&
            this.writeMask == ss.writeMask && this.fail == ss.fail && this.depthFail == ss.depthFail &&
            this.depthPass == ss.depthPass && this.compareFunc == ss.compareFunc;
    }

    /**
     * Copy values from another blend state
     * @param {StencilState} ss
     */
    copy(ss: StencilState) {
        this.enabled = ss.enabled;

    }

    /**
     * Creates a copy of this object
     */
    clone() {
        return new StencilState(this.enabled);
    }


};