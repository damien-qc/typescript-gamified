"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dungeon_1 = require("./dungeon");
const player_1 = require("./player");
let dungeon = null;
let player = null;
const app = (0, express_1.default)();
const port = 3000;
function resetGame() {
    dungeon = null;
    player = null;
}
app.post('/api/start', (req, res) => {
    player = new player_1.Player(50, 10, 'Player');
    if (req.query.easy)
        dungeon = dungeon_1.Dungeon.createEasyMode();
    else
        dungeon = dungeon_1.Dungeon.createRandom();
    let message = `You start with ${player.hp}. `;
    const room = dungeon.firstRoom;
    message += room.enter(player);
    res.send(message);
});
// app.post("/api/attack", (req: Request, res: Response) => {
//   if (!dungeon || !player) {
//     res.send('The game is not ready. Use "POST api/start". ');
//     return;
//   }
//   const currentRoom: Room | undefined = dungeon?.getRoom(player.currentRoomId);
//   let message: string = "";
//   if (currentRoom != undefined && currentRoom?.hasEnnemy) {
//     message += "You attack the ennemy! ";
//   } else {
//     message += "You can't attack! There's no ennemy alive here";
//   }
//   res.send(message);
// });
app.post('/api/go/:direction', (req, res) => {
    if (!dungeon || !player) {
        res.send('The game is not ready. Use "POST api/start". ');
        return;
    }
    const currentRoom = dungeon.getRoom(player.currentRoomId);
    const targetRoomId = currentRoom === null || currentRoom === void 0 ? void 0 : currentRoom.getRoomId(req.params.direction);
    if (currentRoom != undefined && currentRoom.hasEnnemy) {
        res.send("You can't leave until the ennemy is beaten! ");
        return;
    }
    if (targetRoomId != undefined) {
        const targetRoom = dungeon.getRoom(targetRoomId);
        let message = targetRoom.enter(player);
        if (player.treasureFound) {
            message += 'You won!';
            resetGame();
        }
        else if (!(player === null || player === void 0 ? void 0 : player.alive)) {
            message += 'Game over!';
            resetGame();
        }
        res.send(message);
        return;
    }
    res.send('No door in that direction! ');
});
app.get('/', (req, res) => {
    res.send('Welcome to TSG Dungeon REST API! Use "POST api/start" to begin');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
// generate a get endpoint for rooms
