// Knight.ts
class Knight {
    public hp = 100;

    public takeDamage(damage: number) {
        this.hp = this.hp - damage;
    }
}

