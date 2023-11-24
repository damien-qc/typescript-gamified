"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crashedWithWorld = exports.crashedWithItself = exports.isSnakeHead = exports.isSnakeChunk = exports.addChunk = exports.updateSnakePosition = exports.createSnakeHead = void 0;
function createSnakeHead(x, y, direction) {
    return Object.assign(Object.assign({}, createChunk(x, y)), { direction });
}
exports.createSnakeHead = createSnakeHead;
function createChunk(x, y) {
    return { x, y, name: "snake-chunk" };
}
function updateSnakePosition(head) {
    let previous = { x: head.x, y: head.y };
    // move first chunk
    switch (head.direction) {
        case "up":
            head.y--;
            break;
        case "down":
            head.y++;
            break;
        case "left":
            head.x--;
            break;
        case "right":
            head.x++;
            break;
    }
    let current = head.next;
    while (current) {
        const temp = { x: current.x, y: current.y };
        current.x = previous.x;
        current.y = previous.y;
        previous = temp;
        current = current.next;
    }
}
exports.updateSnakePosition = updateSnakePosition;
function addChunk(head) {
    let current = head;
    while (current.next) {
        current = current.next;
    }
    current.next = createChunk(current.x, current.y);
    return current.next;
}
exports.addChunk = addChunk;
function isSnakeChunk(go) {
    return go.name == "snake-chunk";
}
exports.isSnakeChunk = isSnakeChunk;
function isSnakeHead(go) {
    return isSnakeChunk(go) && go.direction != undefined;
}
exports.isSnakeHead = isSnakeHead;
function crashedWithItself(head) {
    let current = head.next;
    while (current) {
        if (current.x == head.x && current.y == head.y) {
            return true;
        }
        current = current.next;
    }
    return false;
}
exports.crashedWithItself = crashedWithItself;
function crashedWithWorld(head, world) {
    return (head.x < world.left ||
        head.x > world.right ||
        head.y < world.top ||
        head.y > world.bottom);
}
exports.crashedWithWorld = crashedWithWorld;
