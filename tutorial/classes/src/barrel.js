"use strict";
class Barrel {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.type = 'wooden';
    }
    static createWooden(position) {
        const barrel = new Barrel();
        barrel.x = position.x;
        barrel.y = position.y;
        barrel.type = "wooden";
        return barrel;
    }
}
Barrel.maxSpeed = 20;
let woodenBarrel;
woodenBarrel = Barrel.createWooden({ x: 0, y: 0 });
console.log(Barrel.maxSpeed);
