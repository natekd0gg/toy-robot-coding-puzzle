export enum Direction {
  NORTH = 'NORTH',
  EAST = 'EAST',
  SOUTH = 'SOUTH',
  WEST = 'WEST',
}

export interface RobotPosition {
  x: number | null;
  y: number | null;
  direction: Direction | null;
}
