"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerminalRenderer = void 0;
const snake_lib_1 = require("snake-lib");
exports.TerminalRenderer = {
    draw(game) {
        // get Matrix and convert it to string
        const matrix = toMatrix(game)
            .map((row) => row.join(""))
            .join("\n");
        console.clear();
        console.log(matrix);
        if (game.state == "game over") {
            console.log("\nYou crashed! Game over!");
        }
    },
};
function toMatrix(game) {
    const matrix = [];
    const board = { width: game.width + 2, height: game.height + 2 };
    // Initialize board
    for (let i = 0; i < board.height; i++) {
        matrix[i] = new Array(board.width).fill(" ");
    }
    // draw left and right boundaries
    for (let i = 0; i < board.height; i++) {
        matrix[i][0] = "│";
        matrix[i][board.width - 1] = "│";
    }
    // draw top and bottom boundaries
    matrix[0].fill("─");
    matrix[board.height - 1].fill("─");
    // draw corners
    matrix[0][0] = "┌";
    matrix[0][board.width - 1] = "┐";
    matrix[board.height - 1][0] = "└";
    matrix[board.height - 1][board.width - 1] = "┘";
    // Draw game objects.
    for (const gameObject of game.gameObjects) {
        const boardPosition = { x: gameObject.x + 1, y: gameObject.y + 1 };
        if ((0, snake_lib_1.isSnakeChunk)(gameObject))
            matrix[boardPosition.y][boardPosition.x] = "■";
        if ((0, snake_lib_1.isFood)(gameObject))
            matrix[boardPosition.y][boardPosition.x] = "●";
    }
    return matrix;
}
