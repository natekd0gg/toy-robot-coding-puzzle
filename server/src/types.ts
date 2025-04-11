export enum Direction {
  NORTH = 'NORTH',
  EAST = 'EAST',
  SOUTH = 'SOUTH',
  WEST = 'WEST',
}

export type RobotPosition = {
  x: number | null;
  y: number | null;
  direction: string | null;
};
