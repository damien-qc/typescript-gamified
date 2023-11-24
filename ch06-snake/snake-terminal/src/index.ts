import {
  SnakeGame,
  createSnakeHead,
  Food,
  createFood,
  SnakeHead,
} from "snake-lib";
import { TerminalRenderer } from "./terminal-renderer";
import { emitKeypressEvents } from "readline";

const game: SnakeGame = new SnakeGame(30, 20, TerminalRenderer);
const snakeHead: SnakeHead = createSnakeHead(15, 10, "right");
game.add(snakeHead);

const food: Food = createFood(game.worldBoundaries);
game.add(food);

emitKeypressEvents(process.stdin);

if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}

process.stdin.on("keypress", (str, key) => {
  switch (key.name) {
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
    case "q":
      process.exit();
  }
});

const timer = setInterval(() => {
  game.update();
  if (game.state == "game over") {
    clearInterval(timer);
  }
}, 300);
