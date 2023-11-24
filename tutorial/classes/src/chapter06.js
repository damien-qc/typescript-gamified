var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Player6 = /** @class */ (function () {
    function Player6(name) {
        this.hp = 100;
        this.name = name;
    }
    return Player6;
}());
var ZombiePirate = /** @class */ (function () {
    function ZombiePirate() {
        this.name = "Zombie Pirate";
        this.hp = 100;
    }
    ZombiePirate.prototype.getDialog = function () {
        return "Sail with me, and I'll make ye Queen of the Dead!";
    };
    return ZombiePirate;
}());
var characters = [new Player6("hi"), new ZombiePirate()];
var character = characters.find(function (c) { return c.name == "Zombie Pirate"; });
//console.log(character?.getDialog());
// console.log((character as ZombiePirate).getDialog());
function pirateNameToLower(pirateName) {
    return pirateName.toLowerCase();
}
var slime = { name: "Slime", damage: 10, hp: 100 };
var blacksmithAndre = {
    name: "Blacksmith Andre",
    gold: 1000,
    damage: 10,
    hp: 100
};
var mrPirate = {
    name: "Mr Pirate",
    damage: 10,
    level: 10
};
// We have to set the properties
// from both Merchant and Character:
var shopkeeper = {
    name: "",
    gold: 1000
};
function log(npc) {
    // console.log(npc);
}
var merchant65 = { gold: 1000 };
function executeAttack(knife) {
    var chance = getRandomBetween(0, 6);
    if (chance == 0)
        return __assign(__assign({}, knife), { success: false });
    if (chance == 6)
        return __assign(__assign({}, knife), { success: true, damage: knife.baseDamage + knife.criticalDamage });
    return __assign(__assign({}, knife), { success: true, damage: knife.baseDamage });
}
function getRandomBetween(arg0, arg1) {
    return Math.floor(Math.random() * (arg1 - arg0 + 1) + arg0);
}
var enemy = { hp: 100 };
var knifeAttackResult = executeAttack({
    baseDamage: 10,
    criticalDamage: 3,
    effect: "bleed"
});
// can we test which type is knifeAttackResult?
// can we test which type is knifeAttackResult?
// can we test which type is knifeAttackResult?
if (knifeAttackResult.success) {
    // Here TS knows `knifeAttackResult` is a `Knife & AttackSuccessful`
    // This gives us access to `knifeAttackResult.damage
    enemy.hp -= knifeAttackResult.damage;
    console.info("Enemy received ".concat(knifeAttackResult.damage, " with ").concat(knifeAttackResult.effect, " effect"));
}
else {
    console.info("Attack failed");
    // Here TS knows `knifeAttackResult` is a `Knife & AttackFailed`
    // so if we to invoke `knifeAttackResult.damage` we'll get an error:
    //console.log(knifeAttackResult.damage)
}
function rollDice(sides) {
    if (sides) {
        console.log("thruthy: sides is a number");
    }
    else {
        console.log("falsy: sides is 0 (number) or undefined");
    }
}
rollDice(1);
rollDice(0);
rollDice();
function equip(leftHand, rightHand) {
    var _a;
    if (leftHand == rightHand) {
        //righthand is string
        console.log(rightHand.toLowerCase());
    }
    else {
        // rightHand could be string or undefined
        console.log((_a = rightHand === null || rightHand === void 0 ? void 0 : rightHand.toLowerCase()) !== null && _a !== void 0 ? _a : "right hand is empty");
    }
}
equip("Pickaxe"); // Output: Right hand empty
equip("Knife", "Knife"); // Output: knife
equip("Staff", "Spellbook"); // Output: speelbook
function isArrow(projectile) {
    return projectile.material != undefined;
}
function print64(projectile) {
    // Conditional with type guard
    if (isArrow(projectile)) {
        console.log("An arrow made of ".concat(projectile.material));
    }
    else {
        console.log("A ".concat(projectile.size, " fireball"));
    }
}
var arrow = { damage: 10, material: "bone" };
var fireball = { damage: 10, size: "large" };
print64(arrow);
print64(fireball);
var Projectile642 = /** @class */ (function () {
    function Projectile642(damage) {
        this.damage = damage;
    }
    Projectile642.prototype.isArrow = function () {
        return this instanceof Arrow642;
    };
    Projectile642.prototype.isFireBall = function () {
        return this instanceof FireBall642;
    };
    Projectile642.prototype.isProjectile = function () {
        return !this.isArrow() && !this.isFireBall();
    };
    return Projectile642;
}());
var Arrow642 = /** @class */ (function (_super) {
    __extends(Arrow642, _super);
    function Arrow642() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.material = "wood";
        return _this;
    }
    return Arrow642;
}(Projectile642));
var FireBall642 = /** @class */ (function (_super) {
    __extends(FireBall642, _super);
    function FireBall642() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.size = "small";
        return _this;
    }
    return FireBall642;
}(Projectile642));
function print642(p) {
    if (p.isArrow()) {
        console.log("An arrow made of ".concat(p.material));
    }
    else if (p.isFireBall()) {
        console.log("A ".concat(p.size, " fireball"));
    }
    else if (p.isProjectile()) {
        console.log("A projectile that deals ".concat(p.damage));
    }
}
print642(new Arrow642(10));
print642(new FireBall642(10));
print642(new Projectile642(10));
