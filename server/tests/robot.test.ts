import Robot from '../src/robot';
import { Direction } from '../src/types';

describe('Robot', () => {
  let robot: Robot;

  beforeEach(() => {
    robot = new Robot();
  });

  it('should throw an error when placing the robot at an invalid position', () => {
    expect(() => robot.place(-1, 0, Direction.NORTH)).toThrow(
      'Invalid position: (-1, 0). Position must be within the 5x5 grid.'
    );
  });

  it('should initialize robot with valid position and direction', () => {
    const robot = new Robot(0, 0, Direction.NORTH);
    robot.place(0, 0, Direction.NORTH);
    expect(robot.report()).toEqual({ x: 0, y: 0, direction: Direction.NORTH });
  });

  it('should throw an error moving the robot if robot is not placed', () => {
    expect(() => {
      robot.move();
    }).toThrow('Robot must be placed on the table before it can move.');
  });

  it('should move the robot forward', () => {
    robot.place(0, 0, Direction.NORTH);
    robot.move();
    robot.report();
    expect(robot.report()).toStrictEqual({
      x: 0,
      y: 1,
      direction: Direction.NORTH,
    });
  });

  it('should move the robot west when direction is WEST', () => {
    robot.place(1, 1, Direction.WEST);
    robot.move();
    expect(robot.report()).toStrictEqual({
      x: 0,
      y: 1,
      direction: Direction.WEST,
    });
  });

  it('should throw an error for LEFT command if robot is not placed', () => {
    expect(() => {
      robot.left();
    }).toThrow('Robot must be placed on the table before it can face left.');
  });

  it('should rotate the robot left', () => {
    robot.place(0, 0, Direction.NORTH);
    robot.left();
    expect(robot.report()).toStrictEqual({
      x: 0,
      y: 0,
      direction: Direction.WEST,
    });
  });

  it('should throw an error for RIGHT command if robot is not placed', () => {
    expect(() => {
      robot.right();
    }).toThrow('Robot must be placed on the table before it can face right.');
  });

  it('should rotate the robot right', () => {
    robot.place(0, 0, Direction.NORTH);
    robot.right();
    expect(robot.report()).toStrictEqual({
      x: 0,
      y: 0,
      direction: Direction.EAST,
    });
  });

  it('should throw an error for REPORT command if robot is not placed', () => {
    expect(() => {
      robot.report();
    }).toThrow(
      'Robot must be placed on the table before position can be reported.'
    );
  });

  it('should move the robot according to the given commands and report the correct position', () => {
    robot.place(1, 2, Direction.EAST);
    robot.move();
    robot.move();
    robot.left();
    robot.move();
    expect(robot.report()).toStrictEqual({
      x: 3,
      y: 3,
      direction: Direction.NORTH,
    });
  });

  it('should not allow the robot to move out of bounds', () => {
    robot.place(0, 0, Direction.WEST);
    robot.move();
    expect(robot.report()).toStrictEqual({
      x: 0,
      y: 0,
      direction: Direction.WEST,
    });

    robot.place(4, 0, Direction.EAST);
    robot.move();
    expect(robot.report()).toStrictEqual({
      x: 4,
      y: 0,
      direction: Direction.EAST,
    });

    robot.place(0, 0, Direction.NORTH);
    robot.move();
    robot.move();
    robot.move();
    robot.move();
    robot.move();
    expect(robot.report()).toStrictEqual({
      x: 0,
      y: 4,
      direction: Direction.NORTH,
    });

    robot.place(0, 4, Direction.SOUTH);
    robot.move();
    expect(robot.report()).toStrictEqual({
      x: 0,
      y: 3,
      direction: Direction.SOUTH,
    });
  });
});
