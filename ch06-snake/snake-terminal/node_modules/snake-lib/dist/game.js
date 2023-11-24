"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnakeGame = void 0;
const food_1 = require("./food");
const snake_1 = require("./snake");
class SnakeGame {
    constructor(width, height, renderer) {
        this.state = 'running';
        this.gameObjects = [];
        this.width = width;
        this.height = height;
        this.renderer = renderer;
        this.worldBoundaries = {
            left: 0,
            right: width - 1,
            top: 0,
            bottom: height - 1
        };
    }
    update() {
        if (this.state != 'running')
            return;
        this.gameObjects.forEach((gameObject, index) => {
            if ((0, snake_1.isSnakeHead)(gameObject)) {
                // Move snake.
                (0, snake_1.updateSnakePosition)(gameObject);
                // Check if snake crashed.
                if ((0, snake_1.crashedWithItself)(gameObject) ||
                    (0, snake_1.crashedWithWorld)(gameObject, this.worldBoundaries)) {
                    this.state = 'game over';
                }
            }
            // Check if snake ate food.
            if ((0, food_1.isFood)(gameObject)) {
                const snakeHead = this.gameObjects.find((go) => {
                    return (0, snake_1.isSnakeHead)(go) && gameObject.x == go.x && gameObject.y == go.y;
                });
                if (snakeHead) {
                    const newChunk = (0, snake_1.addChunk)(snakeHead);
                    this.gameObjects.push(newChunk);
                    // Replace food.
                    this.gameObjects[index] = (0, food_1.createFood)(this.worldBoundaries);
                }
            }
        });
        // Draw current state.
        this.renderer.draw(this);
    }
    add(gameObject) {
        if (Array.isArray(gameObject)) {
            this.gameObjects.push(...gameObject);
        }
        else {
            this.gameObjects.push(gameObject);
        }
    }
}
exports.SnakeGame = SnakeGame;
