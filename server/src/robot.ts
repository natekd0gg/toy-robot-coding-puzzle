import { Direction, RobotPosition } from './types';

class Robot {
  private x: number | null;
  private y: number | null;
  private direction: Direction | null;
  private tableSize: number;

  constructor(
    x?: number | null,
    y?: number | null,
    direction?: Direction | null
  ) {
    this.x = x ?? null;
    this.y = y ?? null;
    this.direction = direction ?? null;
    this.tableSize = 5;
  }

  private isValidPosition(x: number, y: number): boolean {
    return x >= 0 && x < this.tableSize && y >= 0 && y < this.tableSize;
  }

  place(x: number, y: number, direction: Direction): void {
    if (this.isValidPosition(x, y)) {
      this.x = x;
      this.y = y;
      this.direction = direction;
    } else {
      throw new Error(
        `Invalid position: (${x}, ${y}). Position must be within the ${this.tableSize}x${this.tableSize} grid.`
      );
    }
  }

  setDirection(direction: Direction): void {
    if (this.x === null || this.y === null) {
      throw new Error('Robot is not placed yet');
    }

    this.direction = direction;
  }

  move(): void {
    if (this.x === null || this.y === null || this.direction === null) {
      throw new Error('Robot must be placed on the table before it can move.');
    }
    // (0, 0) origin
    switch (this.direction) {
      case Direction.NORTH:
        if (this.y < this.tableSize - 1) this.y += 1;
        break;
      case Direction.SOUTH:
        if (this.y > 0) this.y -= 1;
        break;
      case Direction.EAST:
        if (this.x < this.tableSize - 1) this.x += 1;
      case Direction.WEST:
        if (this.x > 0) this.x -= 1;
        break;
    }
  }

  left(): void {
    if (this.x === null || this.y === null || this.direction === null) {
      throw new Error(
        'Robot must be placed on the table before it can face left.'
      );
    }

    const rotateLeft: Direction[] = [
      Direction.NORTH,
      Direction.WEST,
      Direction.SOUTH,
      Direction.EAST,
    ];

    const currentIndex = rotateLeft.indexOf(this.direction);
    this.direction = rotateLeft[(currentIndex + 1) % 4];
  }

  right(): void {
    if (this.x === null || this.y === null || this.direction === null) {
      throw new Error(
        'Robot must be placed on the table before it can face right.'
      );
    }

    const rotateRight: Direction[] = [
      Direction.NORTH,
      Direction.EAST,
      Direction.SOUTH,
      Direction.WEST,
    ];

    const currentIndex = rotateRight.indexOf(this.direction);
    this.direction = rotateRight[(currentIndex + 1) % 4];
  }

  report(): RobotPosition {
    if (this.x === null || this.y === null || this.direction === null) {
      throw new Error(
        'Robot must be placed on the table before position can be reported.'
      );
    }

    return {
      x: this.x,
      y: this.y,
      direction: this.direction,
    };
  }
}

export default Robot;
