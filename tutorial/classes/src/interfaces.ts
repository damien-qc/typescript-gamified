interface InventoryItem {
    name: string,
    price: number
}

interface Weapon {
    damage: number,
    durability: number,
    attack(target: Character): void
}

interface WeaponInventoryItem extends Weapon, InventoryItem { }

interface Character {
    hp: number;
}

class RestorationPotion implements InventoryItem {
    name: string = 'Restoration Potion';
    price: number = 10;

    restorePoints: number = 10;
}

//class Sword implements InventoryItem, Weapon {
class Sword implements WeaponInventoryItem {
    name: string = 'Sword';
    price: number = 20;

    damage: number = 5;
    durability: number = 85;

    attack(target: Character): void {
        target.hp -= this.damage;
    }
}

class Player implements Character {
    hp: number;
    coins: number;
    inventory: InventoryItem[] = [];
    weaponInventory: WeaponInventoryItem[] = [];
    equipedWeapon: Weapon | null = null;
    discoveredLocations: MapMarker[] = [];

    constructor(){
        this.hp = 100;
        this.coins = 0;
        this.inventory = [];
    }

    sell(itemIndex: number){
        const item: undefined | InventoryItem = this.inventory[itemIndex] =
            this.inventory.splice(itemIndex,1)[0];
       // this.coins += item.price; // won't work as item can be undefined
        this.coins += item?.price ?? 0;
        console.log(`Sold ${item?.name ?? 'nothing'} for ${item?.price ?? 0} coins.`);
    }

    equipWeapon(index:number): void {
        const weapon = this.weaponInventory[index];
        this.equipedWeapon = weapon;
    }
}

const player = new Player();
player.inventory.push(new RestorationPotion());
player.inventory.push(new Sword());
// player.sell(0);
// player.sell(0);
// player.sell(2);

abstract class MapMarker {
    name: string;
    x: number;
    y: number;

    constructor(
        name: string,
        x: number,
        y: number
    ) {
        this.name = name;
        this.x = x;
        this.y = y;
    }

    onClick() {
        console.log(`Clicked on ${this.name} at (${this.x}, ${this.y})`);
    }
}

class Cave extends MapMarker {
    ennemyCount: number;

    constructor(name: string, x: number, y: number, ennemyCount: number) {
        super(name, x, y);
        this.ennemyCount = ennemyCount;
    }
}

class SiteOfGrace extends MapMarker {
    npcCount: number;

    constructor(name: string, x: number, y: number, npcCount: number) {
        super(name, x, y);
        this.npcCount = npcCount;
    }
}

const cave = new Cave('Muddywater Cave', 10, 20, 30);
const grace = new SiteOfGrace('First Step', 11, 22, 33);
cave.onClick();
grace.onClick();
player.discoveredLocations.push(cave);
player.discoveredLocations.push(grace);
