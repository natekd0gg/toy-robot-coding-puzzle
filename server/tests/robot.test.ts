import Robot from '../src/robot';
import { Direction } from '../src/types';

describe('Robot', () => {
  let robot: Robot;

  beforeEach(() => {
    robot = new Robot();
  });

  it('should throw an error when placing the robot at an invalid position', () => {
    expect(() => robot.place(-1, 0, Direction.NORTH)).toThrowError(
      'Invalid position: (-1, 0). Position must be within the 5x5 grid.'
    );
  });
});
