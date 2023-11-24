type Item = {}
interface Inventory {}
function add(item: Item): void {}

let inventory: Inventory;
function logInventory(): void {}

export {
    Item,
    Inventory, 
    add
}