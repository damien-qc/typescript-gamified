class Barrel {
    x: number = 0;
    y: number = 0;
    type: 'wooden' | 'fire' = 'wooden';
    static maxSpeed: number = 20;

    static createWooden(position: {x:number, y:number}): Barrel{
        const barrel = new Barrel();
        barrel.x = position.x;
        barrel.y = position.y;
        barrel.type = "wooden";

        return barrel;
    }
}

let woodenBarrel: Barrel;
woodenBarrel = Barrel.createWooden({x:0, y:0});


console.log(Barrel.maxSpeed);