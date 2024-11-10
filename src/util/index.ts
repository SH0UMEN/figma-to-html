import { Vector } from '../types/properties.ts';
import { createRequire } from 'module';

const calculateAngleBetweenPoints = (point1: Vector, point2: Vector) => {
    const dAy = point2.y - point1.y, dAx = point2.x - point1.x, dBy = 1, dBx = 0;
    return calculateAngle(dAx * dBy - dAy * dBx, dAx * dBx + dAy * dBy);
};

const calculateAngle = (x: number, y: number) => {
    return toDeg(Math.atan2(x, y));
};

const getDistanceBetweenPoints = (point1: Vector, point2: Vector, realSize?: Vector) => {
    if(realSize != null) {
        point1 = renormVector(point1, realSize);
        point2 = renormVector(point2, realSize);
    }

    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
};

const renormVector = (vector: Vector, realSize: Vector) => {
    return { x: realSize.x * vector.x, y: realSize.y * vector.y };
};

const intersects = (point1: Vector, point2: Vector, point3: Vector, point4: Vector): Vector => {
    const require = createRequire(import.meta.url);
    const intersects = require('lines-intersection');
    const result = intersects(point1.x, point1.y, point2.x, point2.y, point3.x, point3.y, point4.x, point4.y);

    return { x: result[0], y: result[1] };
};

const toRad = (angle: number) => {
    return angle * Math.PI / 180;
};

const toDeg = (angle: number) => {
    return angle * 180 / Math.PI;
};

const roundTo = (number: number, precision: number) => {
    precision = Math.pow(10, precision);
    return Math.round(number * precision) / precision;
};

export { calculateAngle, calculateAngleBetweenPoints, getDistanceBetweenPoints, renormVector, intersects, toRad, toDeg, roundTo };