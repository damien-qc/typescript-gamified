"use strict";
class Potion {
    constructor(name, target, effectPoints) {
        this.name = name;
        this.target = target;
        this.effectPoints = effectPoints;
    }
    use() {
        console.log(`Effect: ${this.target} Pts: ${this.effectPoints}`);
    }
}
class InfiniteHealingPotion extends Potion {
    constructor() {
        //invoking base's constructor:
        super('Infinite Healing Potion', 'hp', 10);
        this.usesLeft = Infinity;
    }
    use() {
        super.use();
        console.log(`What? The bottle is filling itself again!`);
    }
}
class HealingPotion extends Potion {
    constructor() {
        super(...arguments);
        this.usesLeft = 3;
    }
    use() {
        console.log('you healed');
    }
}
class ManaPotion extends Potion {
    constructor() {
        super(...arguments);
        this.usesLeft = 3;
    }
    use() {
        console.log('you feel more powerful');
    }
}
// new HealingPotion('Healing Potion', 'hp', 100).use();
// new ManaPotion('Mana Potion', 'mana', 15).use();
// new InfiniteHealingPotion().use();
class Poison extends Potion {
    constructor() {
        super('Poison', 'hp', -10);
    }
}
class RandomEffectPotion extends Potion {
    constructor() {
        super('Random Effect Potion', 'hp', Math.floor(Math.random() * 15 + 1));
    }
    use() {
        this.target = this.getRandomEffect();
        super.use();
    }
    getRandomEffect() {
        const randomIndex = Math.floor(Math.random() * 3);
        switch (randomIndex) {
            case 1: return 'hp';
            case 2: return 'stamina';
            default: return 'mana';
        }
    }
}
class Inventory {
    constructor() {
        this.potions = [];
    }
    usePotion(index) {
        this.potions[index].use();
    }
}
const inventory = new Inventory();
inventory.potions = [
    new InfiniteHealingPotion(),
    new Poison(),
    new RandomEffectPotion()
];
// inventory.usePotion(0);
// inventory.usePotion(1);
inventory.usePotion(2);
inventory.usePotion(2);
