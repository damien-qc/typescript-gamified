interface Player {
    name: string;
    hp: number;
}

function createPlayer(): Player;
function createPlayer(hp: number): Player;
function createPlayer(hp: number, name: string): Player;
function createPlayer(hp?: number, name?: string): Player {
    const player = {
        hp: hp ?? 100,
        name: name ?? 'player-01'
    };
        return player;
}
const player1 = createPlayer();
const player2 = createPlayer(95);
const player3 = createPlayer(75, 'Devina');

console.log(player1.name, player1.hp);
console.log(player2.name, player2.hp);
console.log(player3.name, player3.hp);