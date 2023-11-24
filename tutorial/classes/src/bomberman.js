class Bomberman {
  constructor() {
    this._bombRange = 10;
  }
  get bombeRange() {
    return this._bombRange;
  }
  set bombRange(value) {
    if (value >= 0) this._bombRange = value;
    else throw new Error("Bomb range cannot be negative");
  }
  increaseBombRange(amount) {
    this.bombRange += amount;
  }
}
let bomberman = new Bomberman();
console.log(bomberman.bombeRange); //get value from getter and prints
// bomberman._bombRange = 20; // fails if no setter, or setter is private
bomberman.increaseBombRange(20); //uses public method to set the value
