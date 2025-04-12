import { Direction } from './types';

export interface TableProps {
  placeRobot: (x: number, y: number, direction: Direction) => void;
  direction?: Direction | null;
  robotPlaced: boolean;
  location: any;
}

export interface GridCell {
  row: number;
  col: number;
}

export type Grid = GridCell[][];
