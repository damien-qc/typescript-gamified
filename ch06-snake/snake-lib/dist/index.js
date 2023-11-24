"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFood = exports.createFood = exports.isSnakeChunk = exports.createSnakeHead = exports.SnakeGame = void 0;
const food_1 = require("./food");
Object.defineProperty(exports, "createFood", { enumerable: true, get: function () { return food_1.createFood; } });
Object.defineProperty(exports, "isFood", { enumerable: true, get: function () { return food_1.isFood; } });
const game_1 = require("./game");
Object.defineProperty(exports, "SnakeGame", { enumerable: true, get: function () { return game_1.SnakeGame; } });
const snake_1 = require("./snake");
Object.defineProperty(exports, "createSnakeHead", { enumerable: true, get: function () { return snake_1.createSnakeHead; } });
Object.defineProperty(exports, "isSnakeChunk", { enumerable: true, get: function () { return snake_1.isSnakeChunk; } });
