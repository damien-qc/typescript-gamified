// Knight.ts
var Knight = /** @class */ (function () {
    function Knight() {
        this.hp = 100;
    }
    Knight.prototype.takeDamage = function (damage) {
        this.hp = this.hp - damage;
    };
    return Knight;
}());
