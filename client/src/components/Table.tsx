import React from 'react';
import { Grid, TableProps } from '../types/tabletypes';
import './Table.css';

const Table: React.FC<TableProps> = ({
  placeRobot,
  direction,
  robotPlaced,
  location,
}) => {
  const table: Grid = Array.from({ length: 5 }, (_, y) =>
    Array.from({ length: 5 }, (_, x) => ({ row: 4 - y, col: x }))
  );

  const directionToAngle = {
    NORTH: 0,
    EAST: 90,
    SOUTH: 180,
    WEST: 270,
  };

  return (
    <div className="table">
      {table.map((row, rowIndex) => (
        <div key={rowIndex} className="table-row">
          {row.map((square) => (
            <div
              key={`table-cell-${square.col}-${square.row}`}
              onClick={() => {
                if (robotPlaced) return;
                if (direction) {
                  placeRobot(square.col, square.row, direction);
                }
              }}
              className={`table-cell ${robotPlaced ? 'disabled-cell' : ''}`}
            >
              {robotPlaced &&
              square.col === location?.x &&
              square.row === location?.y ? (
                <div className="robot-wrapper">
                  <img
                    src="/assets/robot.png"
                    alt="robot"
                    className="robot-img"
                    style={{
                      transform: direction
                        ? `rotate(${directionToAngle[direction]}deg)`
                        : undefined,
                    }}
                  />
                </div>
              ) : (
                <span className="cell-text">
                  ({square.col}, {square.row})
                </span>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Table;
