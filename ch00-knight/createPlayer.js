function createPlayer(hp, name) {
    var player = {
        hp: hp !== null && hp !== void 0 ? hp : 100,
        name: name !== null && name !== void 0 ? name : 'player-01'
    };
    return player;
}
var player1 = createPlayer();
var player2 = createPlayer(95);
var player3 = createPlayer(75, 'Devina');
console.log(player1.name, player1.hp);
console.log(player2.name, player2.hp);
console.log(player3.name, player3.hp);
