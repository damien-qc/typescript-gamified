class Player6 {
  name: string;
  hp: number = 100;

  constructor(name: string) {
    this.name = name;
  }
}

class ZombiePirate {
  name: string = "Zombie Pirate";
  hp: number = 100;

  getDialog(): string {
    return `Sail with me, and I'll make ye Queen of the Dead!`;
  }
}

type Character6 = Player6 | ZombiePirate;

const characters: Character6[] = [new Player6("hi"), new ZombiePirate()];
const character = characters.find((c) => c.name == "Zombie Pirate");

//console.log(character?.getDialog());
// console.log((character as ZombiePirate).getDialog());
function pirateNameToLower(pirateName: unknown) {
  return (pirateName as string).toLowerCase();
}
// function pirateNameToLower(pirateName: unknown) {
// return pirateName.toLowerCase();
// }

type Character62 = { name: string };
type Merchant62 = { gold: number };
type Fighter62 = { damage: number; hp: number };
type QuestGiver62 = { quest: string };

type Ennemy62 = Character62 & Fighter62;
const slime: Ennemy62 = { name: "Slime", damage: 10, hp: 100 };

type ShopkeeperFighter62 = Character62 & Merchant62 & Fighter62;
const blacksmithAndre: ShopkeeperFighter62 = {
  name: "Blacksmith Andre",
  gold: 1000,
  damage: 10,
  hp: 100,
};

// conflicting types
type Character63 = { name: string; level: number };
type Ennemy63 = { level: number | string; damage: number };
type Pirate63 = Character63 & Ennemy63;
let mrPirate: Pirate63 = {
  name: "Mr Pirate",
  damage: 10,
  level: 10,
};

// intersection types
type Character64 = { name: string };
type Merchant64 = { gold: number };
type Shopkeeper64 = Character64 & Merchant64;
// We have to set the properties
// from both Merchant and Character:
let shopkeeper: Shopkeeper64 = {
  name: "",
  gold: 1000,
};

// union types
type Character65 = { name: string };
type Merchant65 = { gold: number };
type CharacterOrMerchant65 = Character65 | Merchant65;
function log(npc: CharacterOrMerchant65) {
  // console.log(npc);
}
let merchant65: Merchant65 = { gold: 1000 };
// Our `log` function can take Character types or Merchant types:
// log({ name: "Leon" });
// log(merchant65);

interface Knife {
  baseDamage: number;
  criticalDamage: number;
  effect: "slash" | "bleed";
}
interface FireBall {
  baseDamage: number;
  criticalDamage: number;
  effect: "fire";
}

type AttackFailed = { success: false };
type AttackSuccessful = { success: true; damage: number };
type KnifeAttackResult = Knife & (AttackFailed | AttackSuccessful);
type FireBallAttackResult = FireBall & (AttackFailed | AttackSuccessful);

function executeAttack(knife: Knife): KnifeAttackResult {
  let chance = getRandomBetween(0, 6);
  if (chance == 0) return { ...knife, success: false };
  if (chance == 6)
    return {
      ...knife,
      success: true,
      damage: knife.baseDamage + knife.criticalDamage,
    };
  return { ...knife, success: true, damage: knife.baseDamage };
}

function getRandomBetween(arg0: number, arg1: number): number {
  return Math.floor(Math.random() * (arg1 - arg0 + 1) + arg0);
}
let enemy = { hp: 100 };

let knifeAttackResult = executeAttack({
  baseDamage: 10,
  criticalDamage: 3,
  effect: "bleed",
});
// can we test which type is knifeAttackResult?
// can we test which type is knifeAttackResult?
// can we test which type is knifeAttackResult?
if (knifeAttackResult.success) {
  // Here TS knows `knifeAttackResult` is a `Knife & AttackSuccessful`
  // This gives us access to `knifeAttackResult.damage
  enemy.hp -= knifeAttackResult.damage;

  console.info(
    `Enemy received ${knifeAttackResult.damage} with ${knifeAttackResult.effect} effect`
  );
} else {
  console.info("Attack failed");
  // Here TS knows `knifeAttackResult` is a `Knife & AttackFailed`
  // so if we to invoke `knifeAttackResult.damage` we'll get an error:
  //console.log(knifeAttackResult.damage)
}

function rollDice(sides?: number) {
  if (sides) {
    console.log("thruthy: sides is a number");
  } else {
    console.log("falsy: sides is 0 (number) or undefined");
  }
}

rollDice(1);
rollDice(0);
rollDice();

function equip(leftHand: string, rightHand?: string | undefined) {
  if (leftHand == rightHand) {
    //righthand is string
    console.log(rightHand.toLowerCase());
  } else {
    // rightHand could be string or undefined
    console.log(rightHand?.toLowerCase() ?? "right hand is empty");
  }
}
equip("Pickaxe"); // Output: Right hand empty
equip("Knife", "Knife"); // Output: knife
equip("Staff", "Spellbook"); // Output: speelbook
/* (
?? (Nullish Coalescing)=> 
  use left value of ?? 
  unless it's null 
  then use right value
) //*/

// Type predicate
type Arrow64 = {
  damage: number;
  material: "wood" | "bone";
};
type FireBall64 = {
  damage: number;
  size: "small" | "large";
};
function isArrow(projectile: Arrow64 | FireBall64): projectile is Arrow64 {
  return (projectile as Arrow64).material != undefined;
}
function print64(projectile: Arrow64 | FireBall64): void {
  // Conditional with type guard
  if (isArrow(projectile)) {
    console.log(`An arrow made of ${projectile.material}`);
  } else {
    console.log(`A ${projectile.size} fireball`);
  }
}
const arrow: Arrow64 = { damage: 10, material: "bone" };
const fireball: FireBall64 = { damage: 10, size: "large" };
print64(arrow);
print64(fireball);

class Projectile642 {
  damage: number;
  constructor(damage: number) {
    this.damage = damage;
  }

  isArrow(): this is Arrow642 {
    return this instanceof Arrow642;
  }

  isFireBall(): this is FireBall642 {
    return this instanceof FireBall642;
  }

  isProjectile(): this is Projectile642 {
    return !this.isArrow() && !this.isFireBall();
  }
}

class Arrow642 extends Projectile642 {
  material: "wood" | "bone" = "wood";
}
class FireBall642 extends Projectile642 {
  size: "small" | "large" = "small";
}

// Type Predicates in Classes
function print642(p: Projectile642) {
  if (p.isArrow()) {
    console.log(`An arrow made of ${p.material}`);
  } else if (p.isFireBall()) {
    console.log(`A ${p.size} fireball`);
  } else if (p.isProjectile()) {
    console.log(`A projectile that deals ${p.damage}`);
  }
}
print642(new Arrow642(10));
print642(new FireBall642(10));
print642(new Projectile642(10));
