import app, { robot } from '../src/index';
import request from 'supertest';
import { Direction } from '../src/types';
import '@types/jest';

describe('Robot API', () => {
  beforeEach(() => {
    robot.reset();
  });

  it('should return error for invalid placement of robot', async () => {
    const response = await request(app)
      .post('/place')
      .send({ x: -1, y: 0, direction: Direction.NORTH });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Error placing robot');
  });

  it('should place the robot on the table', async () => {
    const response = await request(app)
      .post('/place')
      .send({ x: 0, y: 0, direction: Direction.NORTH });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      'Robot is now placed at (0, 0) facing NORTH'
    );
  });

  it('should return error when moving robot before placing the robot', async () => {
    const response = await request(app).post('/move');

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Error moving robot');
  });

  it('should move the robot forward', async () => {
    await request(app).post('/place').send({
      x: 0,
      y: 0,
      direction: Direction.NORTH,
    });

    const response = await request(app).post('/move');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      'Robot has moved to (0, 1) facing NORTH'
    );
    expect(response.body.status).toStrictEqual({
      direction: 'NORTH',
      x: 0,
      y: 1,
    });
  });

  it('should return error rotating left before placing the robot', async () => {
    const response = await request(app).post('/left');

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Error rotating left');
  });

  it('should rotate the robot left', async () => {
    await request(app).post('/place').send({
      x: 0,
      y: 0,
      direction: Direction.NORTH,
    });

    const response = await request(app).post('/left');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Robot rotated left');
    expect(response.body.status.direction).toBe(Direction.WEST);
  });

  it('should return error rotating right before placing the robot', async () => {
    const response = await request(app).post('/right');

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Error rotating right');
  });

  it('should rotate the robot right', async () => {
    await request(app).post('/place').send({
      x: 0,
      y: 0,
      direction: Direction.NORTH,
    });

    const response = await request(app).post('/right');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Robot rotated right');
    expect(response.body.status.direction).toBe(Direction.EAST);
  });

  it('should return error reporting before placing the robot', async () => {
    const response = await request(app).get('/report');

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Error reporting robot');
  });

  it("should report the robot's position", async () => {
    await request(app).post('/place').send({
      x: 0,
      y: 0,
      direction: Direction.NORTH,
    });
    const response = await request(app).get('/report');
    expect(response.status).toBe(200);
    expect(response.body.status).toStrictEqual({
      x: 0,
      y: 0,
      direction: Direction.NORTH,
    });
  });

  it('Robot should not move out of bounds', async () => {
    await request(app).post('/place').send({
      x: 0,
      y: 0,
      direction: Direction.SOUTH,
    });

    const response = await request(app).post('/move');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      'Robot has moved to (0, 0) facing SOUTH'
    );
    expect(response.body.status).toStrictEqual({
      direction: 'SOUTH',
      x: 0,
      y: 0,
    });
  });
});
