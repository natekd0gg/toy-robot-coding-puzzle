"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
class Robot {
    constructor(x, y, direction) {
        this.x = x !== null && x !== void 0 ? x : null;
        this.y = y !== null && y !== void 0 ? y : null;
        this.direction = direction !== null && direction !== void 0 ? direction : null;
        this.tableSize = 5;
    }
    isValidPosition(x, y) {
        return x >= 0 && x < this.tableSize && y >= 0 && y < this.tableSize;
    }
    place(x, y, direction) {
        if (this.isValidPosition(x, y)) {
            this.x = x;
            this.y = y;
            this.direction = direction;
        }
        else {
            throw new Error(`Invalid position: (${x}, ${y}). Position must be within the ${this.tableSize}x${this.tableSize} grid.`);
        }
    }
    move() {
        if (this.x === null || this.y === null || this.direction === null) {
            throw new Error('Robot must be placed on the table before it can move.');
        }
        // (0, 0) origin
        switch (this.direction) {
            case types_1.Direction.NORTH:
                if (this.y < this.tableSize - 1)
                    this.y += 1;
                break;
            case types_1.Direction.SOUTH:
                if (this.y > 0)
                    this.y -= 1;
                break;
            case types_1.Direction.EAST:
                if (this.x < this.tableSize - 1)
                    this.x += 1;
                break;
            case types_1.Direction.WEST:
                if (this.x > 0)
                    this.x -= 1;
                break;
        }
    }
    left() {
        if (this.x === null || this.y === null || this.direction === null) {
            throw new Error('Robot must be placed on the table before it can face left.');
        }
        const rotateLeft = [
            types_1.Direction.NORTH,
            types_1.Direction.WEST,
            types_1.Direction.SOUTH,
            types_1.Direction.EAST,
        ];
        const currentIndex = rotateLeft.indexOf(this.direction);
        this.direction = rotateLeft[(currentIndex + 1) % 4];
    }
    right() {
        if (this.x === null || this.y === null || this.direction === null) {
            throw new Error('Robot must be placed on the table before it can face right.');
        }
        const rotateRight = [
            types_1.Direction.NORTH,
            types_1.Direction.EAST,
            types_1.Direction.SOUTH,
            types_1.Direction.WEST,
        ];
        const currentIndex = rotateRight.indexOf(this.direction);
        this.direction = rotateRight[(currentIndex + 1) % 4];
    }
    report() {
        if (this.x === null || this.y === null || this.direction === null) {
            throw new Error('Robot must be placed on the table before position can be reported.');
        }
        return {
            x: this.x,
            y: this.y,
            direction: this.direction,
        };
    }
    reset() {
        this.x = null;
        this.y = null;
        this.direction = null;
    }
}
exports.default = Robot;
//# sourceMappingURL=robot.js.map