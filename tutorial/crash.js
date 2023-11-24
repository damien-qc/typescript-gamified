var Crash = /** @class */ (function () {
    function Crash() {
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
    Crash.prototype.setLevelPoints = function (points, multiplier) {
        this.points = points * multiplier;
    };
    return Crash;
}());
function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}
function attack() {
    var diceValue = rollDice();
    console.log('Rolled ' + diceValue);
    if (diceValue > 3) {
        return { success: true, damageReceived: diceValue };
    }
    return { success: false };
}
var attackResult = attack();
// attackResult: AttackSuccess | AttackFailure;
if (attackResult.success) {
    console.log('You attacked and dealt ' + attackResult.damageReceived + ' damage');
}
else {
    console.log('You missed');
}
