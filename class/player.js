const {Food} = require("../class/food.js");

class Player {

    constructor(name, startingRoom) {
        this.name = name;
        this.currentRoom = startingRoom;
        this.items = [];
    }

    move(direction) {

        const nextRoom = this.currentRoom.getRoomInDirection(direction);

        // If the next room is valid, set the player to be in that room
        if (nextRoom) {
            this.currentRoom = nextRoom;

            nextRoom.printRoom(this);
        } else {
            console.log("You cannot move in that direction");
        }
    }

    printInventory() {
        if (this.items.length === 0) {
            console.log(`${this.name} is not carrying anything.`);
        } else {
            console.log(`${this.name} is carrying:`);
            for (let i = 0 ; i < this.items.length ; i++) {
                console.log(`  ${this.items[i].name}`);
            }
        }
    }

    takeItem(itemName) {
        // remove from room.items
        const item = this.currentRoom.getItemByName(itemName);
        // put item in player.items
        this.items.push(item);
    }

    dropItem(itemName) {
        // remove item from player.items
        const item = this.getItemByName(itemName);
        // put item in room.items
        this.currentRoom.items.push(item);
    }

    eatItem(itemName) {
        // check if item is food
        const item = this.getItemByName(itemName);
        console.log(item instanceof Food);
        if (item instanceof Food) {
            // yes, eat
        } else {
            // no, return item to player inventory
            this.items.push(item);
        }



    }

    getItemByName(name) {
        let itemIndex;

        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            if (item.name === name) { itemIndex = i; }
        }

        const item = this.items.splice(itemIndex, 1);
        return item[0];
    }
}

module.exports = {
  Player,
};
