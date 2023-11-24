export type Renderer = {
    draw: (game: SnakeGame) => void;
};
export type GameObject = {
    name: string;
    x: number;
    y: number;
};
export type WorldBoundaries = {
    left: number;
    right: number;
    top: number;
    bottom: number;
};
export declare class SnakeGame {
    state: 'running' | 'game over';
    gameObjects: GameObject[];
    readonly width: number;
    readonly height: number;
    readonly worldBoundaries: WorldBoundaries;
    private readonly renderer;
    constructor(width: number, height: number, renderer: Renderer);
    update(): void;
    add(gameObject: GameObject): void;
    add(gameObjects: GameObject[]): void;
}
