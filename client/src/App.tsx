import { useState } from 'react';
import axios from 'axios';
import Table from './components/Table';
import { RobotPosition, Direction } from './types/types';
import './App.css';

const App = () => {
  // import.meta.env.VITE_API_BASE_URL_PROD
  // import.meta.env.VITE_API_BASE_URL_DEV;
  const [robotPosition, setRobotPosition] = useState<RobotPosition | null>(
    null
  );
  const [selectedDirection, setSelectedDirection] = useState<Direction>(
    Direction.NORTH
  );
  const [robotPlaced, setRobotPlaced] = useState<boolean>(false);
  const [report, setReport] = useState<string>('');

  const placeRobot = async (
    x: number,
    y: number,
    direction: Direction
  ): Promise<void> => {
    console.log(`${x}, ${y}, direction: ${direction}`);
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL_DEV}/place`, {
        x,
        y,
        direction,
      });
      setRobotPosition({ x, y, direction });
    } catch (error) {
      console.error('Error placing robot:', error);
    }
  };

  const moveRobot = async (): Promise<void> => {
    setReport('');
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL_DEV}/move`
      );

      const { robotPosition } = response.data;
      setRobotPosition(robotPosition);
    } catch (error) {
      console.error(error);
    }
  };

  const left = async (): Promise<void> => {
    setReport('');
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL_DEV}/left`
      );
      setRobotPosition(response.data.status);
    } catch (error) {
      console.error(error);
    }
  };

  const right = async (): Promise<void> => {
    setReport('');
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL_DEV}/right`
      );
      setRobotPosition(response.data.status);
    } catch (error) {
      console.log(error);
    }
  };

  const reportRobot = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL_DEV}/report`
      );
      const { x, y, direction } = response.data.status;
      setReport(
        `Robot is at position (${x}, ${y}) and direction ${direction}.`
      );
    } catch (error) {
      console.error(error);
      setReport('Error reporting robot');
    }
  };

  return (
    <div className="container">
      <h1>Toy Robot Coding Puzzle</h1>
      <Table
        placeRobot={(x, y, direction) => {
          setRobotPlaced(true);
          placeRobot(x, y, direction);
        }}
        direction={selectedDirection}
        robotPlaced={robotPlaced}
        location={robotPosition}
      />
      {!robotPlaced && (
        <div className="direction-select">
          <label htmlFor="direction">Direction:</label>
          <select
            id="direction"
            className="direction-dropdown"
            value={selectedDirection}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              setSelectedDirection(event.target.value as Direction)
            }
          >
            <option value={Direction.NORTH}>NORTH</option>
            <option value={Direction.EAST}>EAST</option>
            <option value={Direction.SOUTH}>SOUTH</option>
            <option value={Direction.WEST}>WEST</option>
          </select>
        </div>
      )}
      <div className="button-container">
        {robotPlaced && (
          <button
            onClick={() => {
              setRobotPlaced(false);
              setReport('');
            }}
          >
            PLACE
          </button>
        )}
        <button
          onClick={moveRobot}
          disabled={!robotPlaced}
          className="command-btn move-btn"
        >
          MOVE
        </button>
        <button
          onClick={left}
          disabled={!robotPlaced}
          className="command-btn left-btn"
        >
          LEFT
        </button>
        <button
          onClick={right}
          disabled={!robotPlaced}
          className="command-btn right-btn"
        >
          RIGHT
        </button>
        <button
          onClick={reportRobot}
          disabled={!robotPlaced}
          className="command-btn report-btn"
        >
          REPORT
        </button>
      </div>
      {report && <p className="report-message">{report}</p>}
    </div>
  );
};

export default App;
