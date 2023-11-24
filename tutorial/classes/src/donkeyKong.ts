class DonkeyKong {
    private static instance: DonkeyKong;

    public name: string = "Donkey Kong";

    private constructor() {}

    public static getInstance(): DonkeyKong {
        if (!DonkeyKong.instance) {
            DonkeyKong.instance = new DonkeyKong();
        }
        return DonkeyKong.instance;

    }
}

const dk = DonkeyKong.getInstance();
dk.name = 'Hello';
const dk2 = DonkeyKong.getInstance();
console.log(dk.name);
console.log(dk2.name);