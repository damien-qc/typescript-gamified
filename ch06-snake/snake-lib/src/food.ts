import type { GameObject, WorldBoundaries } from "./game";

export type Food = GameObject & {
  name: "food";
};

export function createFood(boundaries: WorldBoundaries): Food {
  return {
    x:
      Math.floor(Math.random() * (boundaries.right - boundaries.left)) +
      boundaries.left,
    y:
      Math.floor(Math.random() * (boundaries.bottom - boundaries.top)) +
      boundaries.top,
    name: "food",
  };
}
export function isFood(object: GameObject) {
  return (object as Food).name == "food";
}
