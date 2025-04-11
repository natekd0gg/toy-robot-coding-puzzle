import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import Robot from './robot';
import cors from 'cors';
import { Direction } from './types';

const app = express();
const port = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(cors());

interface PlaceRequestBody {
  x: number;
  y: number;
  direction: Direction;
}

interface UpdateDirectionRequestBody {
  direction: Direction;
}

export const robot = new Robot();

app.post('/place', (req: Request<{}, {}, PlaceRequestBody>, res: Response) => {
  const { x, y, direction } = req.body;

  try {
    robot.place(x, y, direction);
    res.status(200).send({
      message: `Robot is now placed at (${x}, ${y}) facing ${direction}`,
    });
  } catch (error) {
    res.status(400).send({ message: 'Error placing robot' });
  }
});

app.post(
  '/updateDirection',
  (req: Request<{}, {}, UpdateDirectionRequestBody>, res: Response) => {
    const { direction } = req.body;

    try {
      robot.setDirection(direction);
      const updateDirection = robot.report();

      res.status(200).send({
        message: `Robot direction updated to ${direction}`,
        status: updateDirection,
      });
    } catch (error) {
      res.status(400).send({ message: 'Error updating direction' });
    }
  }
);

app.post('/move', (req: Request, res: Response) => {
  try {
    robot.move();
    const robotPosition = robot.report();

    res.status(200).send({
      message: `Robot has moved to (${robotPosition.x}, ${robotPosition.y}) facing ${robotPosition.direction}`,
      status: robotPosition,
    });
  } catch (error) {
    res.status(400).send({ message: 'Error moving robot' });
  }
});

app.post('/left', (req: Request, res: Response) => {
  try {
    robot.left();
    const updatedDirection = robot.report();
    res
      .status(200)
      .send({ message: 'Robot rotated left', status: updatedDirection });
  } catch (error) {
    res.status(400).send({ message: 'Error rotating left' });
  }
});

app.post('/right', (req: Request, res: Response) => {
  try {
    robot.right();
    const updatedDirection = robot.report();
    res
      .status(200)
      .send({ message: 'Robot rotated right', status: updatedDirection });
  } catch (error) {
    res.status(400).send({ message: 'Error rotating right' });
  }
});

app.get('/report', (req: Request, res: Response) => {
  try {
    const status = robot.report();

    res.status(200).send({ status });
  } catch (error) {
    res.status(400).send({ message: 'Error reporting robot' });
  }
});

/*Test*/
app.get('/', (req: Request, res: Response) => {
  res.send('This is live on production');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
