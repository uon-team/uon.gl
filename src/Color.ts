/**
 * @file Color
 * @see uon.gl.Color
 * @author Gabriel Roy <gab@uon.io>
 * 
 */


function hue2rgb(p: number, q: number, t: number) {

    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * 6 * (2 / 3 - t);
    return p;

};


/**
 * Represents a color with floats
 */
export class Color {

    r: number = 0;
    g: number = 0;
    b: number = 0;
    a: number = 1;

    private _cache: Float32Array;

    constructor(...color: number[]) {

        if (arguments.length === 3) {

            return this.setRGB(color[0], color[1], color[2]);

        }

        if (arguments.length === 4) {

            return this.setRGBA(color[0], color[1], color[2], color[3]);

        }
    }

    set(value: any) {

        if (value instanceof Color) {

            this.copy(value);

        } else if (typeof value === 'number') {

            this.setHex(value);

        } else if (typeof value === 'string') {

            this.fromStyle(value);

        }

        return this;

    }

    setHex(hex: number) {

        hex = Math.floor(hex);

        this.r = (hex >> 16 & 255) / 255;
        this.g = (hex >> 8 & 255) / 255;
        this.b = (hex & 255) / 255;

        return this;

    }

    setAlpha(a: number) {
        this.a = a;
        return this;
    }

    setRGB(r: number, g: number, b: number) {

        this.r = r;
        this.g = g;
        this.b = b;

        return this;

    }

    setRGBA(r: number, g: number, b: number, a: number) {

        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
        return this;

    }


    setHSL(h: number, s: number, l: number) {

        // h,s,l ranges are in 0.0 - 1.0

        if (s === 0) {

            this.r = this.g = this.b = l;

        } else {

            var p = l <= 0.5 ? l * (1 + s) : l + s - (l * s);
            var q = (2 * l) - p;

            this.r = hue2rgb(q, p, h + 1 / 3);
            this.g = hue2rgb(q, p, h);
            this.b = hue2rgb(q, p, h - 1 / 3);

        }

        return this;

    }

    fromStyle(style: string) {

        // rgb(255,0,0)

        if (/^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.test(style)) {

            var color = /^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.exec(style);

            this.r = Math.min(255, parseInt(color[1], 10)) / 255;
            this.g = Math.min(255, parseInt(color[2], 10)) / 255;
            this.b = Math.min(255, parseInt(color[3], 10)) / 255;

            return this;

        }

        // rgb(100%,0%,0%)

        if (/^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.test(style)) {

            var color = /^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.exec(style);

            this.r = Math.min(100, parseInt(color[1], 10)) / 100;
            this.g = Math.min(100, parseInt(color[2], 10)) / 100;
            this.b = Math.min(100, parseInt(color[3], 10)) / 100;

            return this;

        }

        // #ff0000

        if (/^\#([0-9a-f]{6})$/i.test(style)) {

            var color = /^\#([0-9a-f]{6})$/i.exec(style);

            this.setHex(parseInt(color[1], 16));

            return this;

        }

        // #f00

        if (/^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.test(style)) {

            var color = /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(style);

            this.setHex(parseInt(color[1] + color[1] + color[2] + color[2] + color[3] + color[3], 16));

            return this;

        }



    }

    copy(color: Color) {

        this.r = color.r;
        this.g = color.g;
        this.b = color.b;
        this.a = color.a;

        return this;

    }

    copyGammaToLinear(color: Color) {

        this.r = color.r * color.r;
        this.g = color.g * color.g;
        this.b = color.b * color.b;

        return this;

    }

    copyLinearToGamma(color: Color) {

        this.r = Math.sqrt(color.r);
        this.g = Math.sqrt(color.g);
        this.b = Math.sqrt(color.b);

        return this;

    }

    convertGammaToLinear() {

        var r = this.r, g = this.g, b = this.b;

        this.r = r * r;
        this.g = g * g;
        this.b = b * b;

        return this;

    }

    convertLinearToGamma() {

        this.r = Math.sqrt(this.r);
        this.g = Math.sqrt(this.g);
        this.b = Math.sqrt(this.b);

        return this;

    }

    getHex() {

        return (this.r * 255) << 16 ^ (this.g * 255) << 8 ^ (this.b * 255) << 0;

    }

    getHexString() {

        return ('000000' + this.getHex().toString(16)).slice(- 6);

    }

    getHSL(target?: any) {

        // h,s,l ranges are in 0.0 - 1.0

        var hsl = target || { h: 0, s: 0, l: 0 };

        var r = this.r,
            g = this.g,
            b = this.b;

        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);

        var hue, saturation;
        var lightness = (min + max) / 2.0;

        if (min === max) {

            hue = 0;
            saturation = 0;

        } else {

            var delta = max - min;

            saturation = lightness <= 0.5 ? delta / (max + min) : delta / (2 - max - min);

            switch (max) {

                case r: hue = (g - b) / delta + (g < b ? 6 : 0); break;
                case g: hue = (b - r) / delta + 2; break;
                case b: hue = (r - g) / delta + 4; break;

            }

            hue /= 6;

        }

        hsl.h = hue;
        hsl.s = saturation;
        hsl.l = lightness;

        return hsl;

    }

    toString() {

        return 'rgba(' + ((this.r * 255) | 0) + ',' + ((this.g * 255) | 0) + ',' + ((this.b * 255) | 0) + ',' + this.a + ')';

    }

    offsetHSL(h: number, s: number, l: number) {

        var hsl = this.getHSL();

        hsl.h += h; hsl.s += s; hsl.l += l;

        this.setHSL(hsl.h, hsl.s, hsl.l);

        return this;

    }

    add(color: Color) {

        this.r += color.r;
        this.g += color.g;
        this.b += color.b;

        return this;

    }

    addColors(color1: Color, color2: Color) {

        this.r = color1.r + color2.r;
        this.g = color1.g + color2.g;
        this.b = color1.b + color2.b;

        return this;

    }

    addScalar(s: number) {

        this.r += s;
        this.g += s;
        this.b += s;

        return this;

    }

    multiply(color: Color) {

        this.r *= color.r;
        this.g *= color.g;
        this.b *= color.b;

        return this;

    }

    multiplyScalar(s: number) {

        this.r *= s;
        this.g *= s;
        this.b *= s;

        return this;

    }

    lerp(color: Color, alpha: number) {

        this.r += (color.r - this.r) * alpha;
        this.g += (color.g - this.g) * alpha;
        this.b += (color.b - this.b) * alpha;
        this.a += (color.a - this.a) * alpha;
        return this;

    }

    equals(c: Color) {

        return (c.r === this.r) && (c.g === this.g) && (c.b === this.b);

    }

    fromArray(array: number[]) {

        this.r = array[0];
        this.g = array[1];
        this.b = array[2];
        this.a = array[3] !== undefined ? array[3] : this.a;

        return this;

    }

    toArray(array: any, offset?: number, copyAlpha?: boolean) {

        if (array === undefined)
            array = [];
        if (offset === undefined)
            offset = 0;

        array[offset] = this.r;
        array[offset + 1] = this.g;
        array[offset + 2] = this.b;
        if (/*copyAlpha ===*/ true) array[offset + 3] = this.a;
        return array;

    }

    toFloatArray() {

        if(this._cache == null) {
            this._cache = new Float32Array(4);
        }

        this.toArray(this._cache);

        return this._cache;
    }

    clone() {
        return new Color(this.r, this.g, this.b, this.a);
    }

};