class Collectible {
    private _points: number;
    private _doublePoints: boolean = false;

    constructor(points: number, doublePoints: boolean) {
        this._points = points;
        this._doublePoints = doublePoints;
    }

    public get points() { // Accessible everywhere
        let pt = this.calculatePoints();
        return pt;
    }

    protected calculatePoints(): number { // accessible from derived classes
        if(this._doublePoints)
            return this.duplicatePoints();
        return this._points;
    }

    private duplicatePoints() { // Accessible only in this class
        return this._points * 2;
    }
}

class Coin extends Collectible {
    constructor(doublePoints: boolean = false) {
        super(50, doublePoints);
    }
}

const coin = new Coin();
console.log(coin.points); // 50

const doubleCoin = new Coin(true);
console.log(doubleCoin.points); // 100

class RandomBonusCoin extends Collectible {
    constructor(doublePoints: boolean = false){
        super(100, doublePoints);
    }

    protected override calculatePoints(): number {
        let points = super.calculatePoints();

        points = points * Math.floor(Math.random() * 3 + 1);

        return points;
    }
}

const randomBonusCoin = new RandomBonusCoin();
console.log(randomBonusCoin.points); // 100, 200, or 300