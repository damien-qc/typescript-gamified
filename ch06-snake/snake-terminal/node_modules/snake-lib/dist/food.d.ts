import type { GameObject, WorldBoundaries } from "./game";
export type Food = GameObject & {
    name: "food";
};
export declare function createFood(boundaries: WorldBoundaries): Food;
export declare function isFood(object: GameObject): boolean;
