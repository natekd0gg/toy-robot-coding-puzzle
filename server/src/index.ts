import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req: Request, res: Response) => {
  res.send('Express Typescript on Vercel');
});

app.get('/ping', (req: Request, res: Response) => {
  res.send('pong 🏓');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
