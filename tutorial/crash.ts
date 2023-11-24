class Crash {
    // v2.3.45
    // v2.3.50
    // Literal String Type
    private state: 'to-do' | 'process' | 'error' | 'outdated' | 'waiting' | 'should not compile';
    private points: any;
    private name!: string;

    constructor() {
        switch (this.state) {
            case 'to-do':
                this.state = 'process';
                break;
            case 'process':
                this.state = 'error';
                break;
            case 'error':
                this.state = 'outdated';
                break;
            case 'waiting':
                this.state = 'should not compile';
        } 
    }
    // Literal Number Type
    setLevelPoints(points: number, multiplier: 1 | 2 | 5 | 10) {
        this.points = points * multiplier;
    }
}

// let crash = new Crash();
// crash.setLevelPoints(10, 1);
// not working because 4 not in Literal Number Type.
//crash.setLevelPoints(10,4);


interface AttackSuccess {
    success: true;
    damageReceived: number;
}

interface AttackFailure {
    success: false;
}

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function attack(): AttackSuccess | AttackFailure {
    const diceValue = rollDice();
    console.log('Rolled ' + diceValue);
    if (diceValue > 3) {
        return { success:true, damageReceived:diceValue };
    }
    return { success:false };
}

const attackResult = attack();
// attackResult: AttackSuccess | AttackFailure;

if(attackResult.success) {
    console.log('You attacked and dealt ' + attackResult.damageReceived + ' damage');
} else {
    console.log('You missed');
}