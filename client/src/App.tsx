import { useState } from 'react';
import axios from 'axios';
import { RobotPosition, Direction } from './types/types';
import './App.css';

const App = () => {
  // import.meta.env.VITE_API_BASE_URL_PROD
  // import.meta.env.VITE_API_BASE_URL_DEV;
  const [robotPosition, setRobotPosition] = useState<RobotPosition>({
    x: null,
    y: null,
    direction: null,
  });
  const [report, setReport] = useState<string>('');
  const [robotPlaced, setRobotPlaced] = useState<boolean>(false);

  const placeRobot = async (
    x: number,
    y: number,
    direction: Direction
  ): Promise<void> => {
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

  const updateRobotDirection = async (
    newDirection: Direction
  ): Promise<void> => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL_DEV}/updateDirection`,
        {
          direction: newDirection,
        }
      );
      setRobotPosition((prevState) => ({
        ...prevState,
        direction: newDirection,
      }));
    } catch (error) {
      console.error(error);
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

  return <></>;
};

export default App;
