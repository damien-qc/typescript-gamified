"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const snake_lib_1 = require("snake-lib");
const terminal_renderer_1 = require("./terminal-renderer");
const readline_1 = require("readline");
const game = new snake_lib_1.SnakeGame(30, 20, terminal_renderer_1.TerminalRenderer);
const snakeHead = (0, snake_lib_1.createSnakeHead)(15, 10, "right");
game.add(snakeHead);
const food = (0, snake_lib_1.createFood)(game.worldBoundaries);
game.add(food);
(0, readline_1.emitKeypressEvents)(process.stdin);
if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
}
process.stdin.on("keypress", (str, key) => {
    switch (key.name) {
        case "q":
            process.exit();
            break;
        case "up":
            snakeHead.direction = "up";
            console.log(snakeHead.direction);
            break;
        case "down":
            snakeHead.direction = "down";
            console.log(snakeHead.direction);
            break;
        case "left":
            snakeHead.direction = "left";
            console.log(snakeHead.direction);
            break;
        case "right":
            snakeHead.direction = "right";
            console.log(snakeHead.direction);
            break;
    }
});
const timer = setInterval(() => {
    game.update();
    if (game.state == "game over") {
        clearInterval(timer);
    }
}, 300);
