"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const readlineSync = __importStar(require("readline-sync"));
class Game {
    constructor(emojis) {
        this.tiles = this.createTiles(emojis);
    }
    createTiles(emojis) {
        const duplicatedEmojis = [...emojis, ...emojis];
        const shuffledEmojis = duplicatedEmojis;
        for (let i = 0; i < shuffledEmojis.length; i++) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            const currentEmoji = shuffledEmojis[i];
            shuffledEmojis[i] = shuffledEmojis[randomIndex];
            shuffledEmojis[randomIndex] = currentEmoji;
        }
        return shuffledEmojis.map((e, index) => {
            return {
                emoji: e,
                state: 'up',
                index: index
            };
        });
    }
    flipTile(inputTile) {
        const flippedTiles = this.tiles.filter(t => t.state == 'up');
        const selectedTile = this.tiles[inputTile];
        if (selectedTile.state !== 'down') {
            readlineSync.keyIn('Already flipped. Press any key to continue.');
            return;
        }
        selectedTile.state = 'up';
        this.printTiles();
        if (flippedTiles.length == 1 && flippedTiles[0].emoji === selectedTile.emoji) {
            readlineSync.keyIn('Matching! Press any key to continue.');
            flippedTiles[0].state = 'cleared';
            selectedTile.state = 'cleared';
        }
        else if (flippedTiles.length == 1) {
            readlineSync.keyIn('Not Matching. Press any key to continue.');
            flippedTiles[0].state = 'down';
            selectedTile.state = 'down';
            this.printTiles();
        }
    }
    printTiles() {
        console.clear();
        const gridSize = 4;
        for (var i = 0; i < this.tiles.length; i = i + gridSize) {
            const row = this.tiles.slice(i, i + gridSize)
                .map(tile => {
                if (tile.state == 'down')
                    return tile.index.toString().padStart(2, ' ');
                else
                    return tile.emoji;
            })
                .join('  |  ');
            console.log(row);
        }
    }
    run() {
        console.log('Welcome to Memory Game!');
        readlineSync.keyIn('', { hideEchoBack: true });
        this.printTiles();
        readlineSync.keyIn('Press any key to start');
        this.tiles.forEach(tile => tile.state = 'down');
        this.printTiles();
        while (this.tiles.some(tile => tile.state == 'down')) {
            let inputTile = readlineSync.questionInt('Enter number of tiles to return: ');
            if (inputTile >= 0 && inputTile < this.tiles.length) {
                this.flipTile(inputTile);
                this.printTiles();
            }
            else {
                console.log('Invalid tile number.');
            }
        }
        console.log('You won!');
    }
}
const game = new Game(['👻', '🔥', '🎦', '🌵', '📦', '💆', '💒', '🦘']);
game.run();
////// options //////
// difficulty level (easy, medium, hard)
// scoring points
// 
