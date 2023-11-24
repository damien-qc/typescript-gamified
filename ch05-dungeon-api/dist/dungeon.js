"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dungeon = void 0;
const room_1 = require("./room");
const utils_1 = require("./utils");
class Dungeon {
    constructor(rooms) {
        this.rooms = [];
        this.rooms = rooms;
    }
    static createRandomRooms(numberOfRooms) {
        const rooms = [new room_1.EmptyRoom(0)];
        const distributeRoomTypes = [
            ...Array(7).fill("empty"),
            ...Array(3).fill("spikes"),
            ...Array(2).fill("healing"),
            ...Array(1).fill("sword"),
        ];
        for (let i = 1; i < numberOfRooms; i++) {
            const roomType = utils_1.Utils.getRandomItem(distributeRoomTypes);
            switch (roomType) {
                case "empty":
                    rooms.push(new room_1.EmptyRoom(i));
                    break;
                case "spikes":
                    rooms.push(new room_1.SpikesRoom(i));
                    break;
                case "healing":
                    rooms.push(new room_1.HealingPotionRoom(i));
                    break;
                case "sword":
                    rooms.push(new room_1.SwordRoom(i));
                    break;
            }
        }
        const treasureRoomId = utils_1.Utils.getRandomNumber(1, rooms.length - 1);
        rooms[treasureRoomId] = new room_1.TreasureRoom(treasureRoomId);
        return rooms;
    }
    static connectRooms(rooms) {
        if (rooms.length < 2)
            return rooms;
        const root = rooms[0];
        const splitAt = rooms.length / 2 + 1;
        const leftSide = rooms.slice(1, splitAt);
        const rightSide = rooms.slice(splitAt);
        if (leftSide.length > 0)
            root.connect(leftSide[0]);
        if (rightSide.length > 0)
            root.connect(rightSide[0]);
        return [root]
            .concat(this.connectRooms(leftSide))
            .concat(this.connectRooms(rightSide));
    }
    static createRandom() {
        const numberOfRooms = utils_1.Utils.getRandomNumber(7, 13);
        const rooms = this.createRandomRooms(numberOfRooms);
        const connectedRooms = this.connectRooms(rooms);
        return new Dungeon(connectedRooms);
    }
    static createEasyMode() {
        const firstRoom = new room_1.EmptyRoom(0);
        const secondRoom = new room_1.EnnemyRoom(1);
        firstRoom.connect(secondRoom);
        return new Dungeon([firstRoom, secondRoom]);
    }
    get firstRoom() {
        return this.rooms[0];
    }
    getRoom(id) {
        return this.rooms.find((r) => r.id === id);
    }
}
exports.Dungeon = Dungeon;
