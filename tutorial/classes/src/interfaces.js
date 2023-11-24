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
var RestorationPotion = /** @class */ (function () {
    function RestorationPotion() {
        this.name = 'Restoration Potion';
        this.price = 10;
        this.restorePoints = 10;
    }
    return RestorationPotion;
}());
//class Sword implements InventoryItem, Weapon {
var Sword = /** @class */ (function () {
    function Sword() {
        this.name = 'Sword';
        this.price = 20;
        this.damage = 5;
        this.durability = 85;
    }
    Sword.prototype.attack = function (target) {
        target.hp -= this.damage;
    };
    return Sword;
}());
var Player = /** @class */ (function () {
    function Player() {
        this.inventory = [];
        this.weaponInventory = [];
        this.equipedWeapon = null;
        this.hp = 100;
        this.coins = 0;
        this.inventory = [];
    }
    Player.prototype.sell = function (itemIndex) {
        var _a, _b, _c;
        var item = this.inventory[itemIndex] =
            this.inventory.splice(itemIndex, 1)[0];
        // this.coins += item.price; // won't work as item can be undefined
        this.coins += (_a = item === null || item === void 0 ? void 0 : item.price) !== null && _a !== void 0 ? _a : 0;
        console.log("Sold ".concat((_b = item === null || item === void 0 ? void 0 : item.name) !== null && _b !== void 0 ? _b : 'nothing', " for ").concat((_c = item === null || item === void 0 ? void 0 : item.price) !== null && _c !== void 0 ? _c : 0, " coins."));
    };
    Player.prototype.equipWeapon = function (index) {
        var weapon = this.weaponInventory[index];
        this.equipedWeapon = weapon;
    };
    return Player;
}());
var player = new Player();
player.inventory.push(new RestorationPotion());
player.inventory.push(new Sword());
player.sell(0);
player.sell(0);
player.sell(2);
var MapMarker = /** @class */ (function () {
    function MapMarker(name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
    }
    MapMarker.prototype.onClick = function () {
        console.log("Clicked on ".concat(this.name, " at (").concat(this.x, ", ").concat(this.y, ")"));
    };
    return MapMarker;
}());
var Cave = /** @class */ (function (_super) {
    __extends(Cave, _super);
    function Cave(name, x, y, ennemyCount) {
        var _this = _super.call(this, name, x, y) || this;
        _this.ennemyCount = ennemyCount;
        return _this;
    }
    return Cave;
}(MapMarker));
var SiteOfGrace = /** @class */ (function (_super) {
    __extends(SiteOfGrace, _super);
    function SiteOfGrace(name, x, y, npcCount) {
        var _this = _super.call(this, name, x, y) || this;
        _this.npcCount = npcCount;
        return _this;
    }
    return SiteOfGrace;
}(MapMarker));
var cave = new Cave('Muddywater Cave', 10, 20, 30);
var grace = new SiteOfGrace('First Step', 11, 22, 33);
cave.onClick();
grace.onClick();
