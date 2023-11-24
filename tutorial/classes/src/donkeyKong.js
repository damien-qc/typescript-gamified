var DonkeyKong = /** @class */ (function () {
    function DonkeyKong() {
        this.name = "Donkey Kong";
    }
    DonkeyKong.getInstance = function () {
        if (!DonkeyKong.instance) {
            DonkeyKong.instance = new DonkeyKong();
        }
        return DonkeyKong.instance;
    };
    return DonkeyKong;
}());
var dk = DonkeyKong.getInstance();
dk.name = 'Hello';
var dk2 = DonkeyKong.getInstance();
console.log(dk.name);
console.log(dk2.name);
