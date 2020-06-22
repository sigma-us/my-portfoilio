'use strict';


export default class Vector {
    constructor() {

    }

    // radius helper 
    radius = (degree: number) => {
        return Math.PI / 180 * degree;
    }

    opposite = (angle: any, mag: number) => {
        return Math.sin(this.radius(angle)) * mag;
    }

    adjacent = (angle: any, mag: number) => {
        return Math.cos(this.radius(angle)) * mag;
    }

    convert = (angle: any, mag: number) => {
        let a = this.adjacent(angle, mag);
        let o = this.opposite(angle, mag);
        // console.log(a, o);
        // console.log(a ** 2 + o ** 2, mag ** 2)

        return [a, o]
    }

    vectorAdd = (v1: any[], v2: any[]) => {
        let v3 = [v1[0] + v2[0], v1[1] + v2[1]];
        // console.log(v3);

        return v3;
    }

    vectorSub = (v1: number[], v2: number[]) => {
        let v3 = [v1[0] - v2[0], v1[1] - v2[1]];

        return v3;
    }

}



// let v1 = convert(0, 1);
// let v2 = convert(90, 1);

// let v3 = vectorAdd(v1, v2);

// let v4 = vectorAdd(v3, convert(180, 2))