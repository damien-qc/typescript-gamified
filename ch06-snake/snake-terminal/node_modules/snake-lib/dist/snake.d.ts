import type { GameObject, WorldBoundaries } from "./game";
export type SnakeChunk = GameObject & {
    name: "snake-chunk";
    next?: SnakeChunk;
};
type Direction = "up" | "down" | "left" | "right";
export type SnakeHead = SnakeChunk & {
    direction: Direction;
};
export declare function createSnakeHead(x: number, y: number, direction: Direction): SnakeHead;
export declare function updateSnakePosition(head: SnakeHead): void;
export declare function addChunk(head: SnakeChunk): SnakeChunk;
export declare function isSnakeChunk(go: GameObject): go is SnakeChunk;
export declare function isSnakeHead(go: GameObject): go is SnakeHead;
export declare function crashedWithItself(head: SnakeHead): boolean;
export declare function crashedWithWorld(head: SnakeHead, world: WorldBoundaries): boolean;
export {};
