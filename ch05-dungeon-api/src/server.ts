import express, { Express, Request, Response } from 'express';
import { Dungeon } from './dungeon';
import { Player } from './player';
import { Direction, Room } from './room';

let dungeon: Dungeon | null = null;
let player: Player | null = null;

const app: Express = express();
const port = 3000;

function resetGame(): void {
  dungeon = null;
  player = null;
}

app.post('/api/start', (req: Request<{ easy: boolean }>, res: Response) => {
  player = new Player(50, 10, 'Player');
  if (req.query.easy) dungeon = Dungeon.createEasyMode();
  else dungeon = Dungeon.createRandom();
  let message: string = `You start with ${player.hp}. `;
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

app.post(
  '/api/go/:direction',
  (req: Request<{ direction: Direction }>, res: Response) => {
    if (!dungeon || !player) {
      res.send('The game is not ready. Use "POST api/start". ');
      return;
    }
    const currentRoom: Room | undefined = dungeon.getRoom(player.currentRoomId);
    const targetRoomId: number | undefined = currentRoom?.getRoomId(
      req.params.direction
    );
    if (currentRoom != undefined && currentRoom.hasEnnemy) {
      res.send("You can't leave until the ennemy is beaten! ");
      return;
    }
    if (targetRoomId != undefined) {
      const targetRoom: Room = dungeon.getRoom(targetRoomId)!;
      let message: string = targetRoom.enter(player);

      if (player.treasureFound) {
        message += 'You won!';
        resetGame();
      } else if (!player?.alive) {
        message += 'Game over!';
        resetGame();
      }

      res.send(message);
      return;
    }

    res.send('No door in that direction! ');
  }
);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to TSG Dungeon REST API! Use "POST api/start" to begin');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
// generate a get endpoint for rooms
