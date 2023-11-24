const pixels: { x:number, y: number, colorHex: string}[] = [];
const palette = ['#fcffc0', '#74a33f', '#2a584f', '#6eb8a8','#c6505a', '#2f142f', '#774448', '#ee9c5d'];
const currentColor = { index: 0, hex: palette[0] };
const defaultColor = palette[0];

function createCanvas(): void {
    const canvasSize = 8;
    const canvas = document.getElementById('canvas');

    for (let i = 0; i < canvasSize; i++) {
        for (let j = 0; j < canvasSize; j++) {
            pixels.push({ x: i, y: j, colorHex: defaultColor });
            
            const pixelBtn = createPixel({ x : i, y: j, active: false});
            canvas?.append(pixelBtn);
        }
    }
    refreshCanvas();
    initializeColorBtn();
}

function createPixel(pixel: { x: number, y: number, active: boolean }): HTMLButtonElement {
    const pixelBtn = document.createElement('button');
    pixelBtn.id = `${pixel.x}-${pixel.y}`;

    pixelBtn.onclick = function() {
        updateState(pixel.x,pixel.y);
        refreshCanvas();
    };

    return pixelBtn;
}

function updateState(x: number, y: number): void {
    const pixelToUpdate = pixels.find(p => p.x === x && p.y === y);
    if(pixelToUpdate) {
        pixelToUpdate.colorHex = currentColor.hex;
    }
}

function refreshCanvas(): void {
    for (const p of pixels) {
        const pixelBtn = document.getElementById(`${p.x}-${p.y}`);
        if(pixelBtn) {
            pixelBtn.style.backgroundColor = p.colorHex;
        }
    }
}

function initializeColorBtn(): void {
    const colorBtn = document.getElementById('color');

    if (colorBtn) {
        colorBtn.style.backgroundColor = currentColor.hex;

        colorBtn.onclick = function () {
            setNextColor();
            colorBtn.style.backgroundColor = currentColor.hex;
        };
    }
}

function setNextColor(): void {
    currentColor.index = (currentColor.index + 1) % palette.length;
    currentColor.hex = palette[currentColor.index];
}

createCanvas();