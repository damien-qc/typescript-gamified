class Bomberman {
    private _bombRange = 10;

    get bombeRange(): number {
        return this._bombRange;
    }

    private set bombRange(value: number) {
        if(value >= 0) this._bombRange = value;
        else throw new Error('Bomb range cannot be negative');    
    }

    increaseBombRange(amount: 10 | 20 | 50) {
        this.bombRange += amount;
    }
}

let bomberman = new Bomberman();
console.log(bomberman.bombeRange);//get value from getter and prints

// bomberman._bombRange = 20; // fails if no setter, or setter is private

bomberman.increaseBombRange(20); //uses public method to set the value

