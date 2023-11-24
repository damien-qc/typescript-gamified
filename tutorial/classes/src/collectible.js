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
var Collectible = /** @class */ (function () {
    function Collectible(points, doublePoints) {
        this._doublePoints = false;
        this._points = points;
        this._doublePoints = doublePoints;
    }
    Object.defineProperty(Collectible.prototype, "points", {
        get: function () {
            var pt = this.calculatePoints();
            return pt;
        },
        enumerable: false,
        configurable: true
    });
    Collectible.prototype.calculatePoints = function () {
        if (this._doublePoints)
            return this.duplicatePoints();
        return this._points;
    };
    Collectible.prototype.duplicatePoints = function () {
        return this._points * 2;
    };
    return Collectible;
}());
var Coin = /** @class */ (function (_super) {
    __extends(Coin, _super);
    function Coin(doublePoints) {
        if (doublePoints === void 0) { doublePoints = false; }
        return _super.call(this, 50, doublePoints) || this;
    }
    return Coin;
}(Collectible));
var coin = new Coin();
console.log(coin.points); // 50
var doubleCoin = new Coin(true);
console.log(doubleCoin.points); // 100
var RandomBonusCoin = /** @class */ (function (_super) {
    __extends(RandomBonusCoin, _super);
    function RandomBonusCoin(doublePoints) {
        if (doublePoints === void 0) { doublePoints = false; }
        return _super.call(this, 100, doublePoints) || this;
    }
    RandomBonusCoin.prototype.calculatePoints = function () {
        var points = _super.prototype.calculatePoints.call(this);
        points = points * Math.floor(Math.random() * 3 + 1);
        return points;
    };
    return RandomBonusCoin;
}(Collectible));
var randomBonusCoin = new RandomBonusCoin();
console.log(randomBonusCoin.points); // 100, 200, or 300
