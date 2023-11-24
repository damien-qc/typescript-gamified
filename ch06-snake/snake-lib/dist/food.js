"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFood = exports.createFood = void 0;
function createFood(boundaries) {
    return {
        x: Math.floor(Math.random() * (boundaries.right - boundaries.left)) +
            boundaries.left,
        y: Math.floor(Math.random() * (boundaries.bottom - boundaries.top)) +
            boundaries.top,
        name: "food",
    };
}
exports.createFood = createFood;
function isFood(object) {
    return object.name == "food";
}
exports.isFood = isFood;
