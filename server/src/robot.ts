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
}

export default Robot;
