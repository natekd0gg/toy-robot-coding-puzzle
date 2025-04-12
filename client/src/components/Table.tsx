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

  console.log('location', location);
  console.log('direction', direction);

  return (
    <div className="table">
      {table.map((row, rowIndex) => (
        <div key={rowIndex} className="table-row">
          {row.map((square) => (
            <div
              key={`table-cell-${square.col}-${square.row}`}
              className="table-cell"
              onClick={() => {
                console.log('clicked');
                if (direction) {
                  placeRobot(square.col, square.row, direction);
                }
              }}
            >
              {robotPlaced &&
              square.col === location.x &&
              square.row === location.y ? (
                <div className="robot-wrapper">
                  <img src="/assets/robot.png" alt="" className="robot-img" />
                </div>
              ) : (
                <p>
                  ({square.col}, {square.row})
                </p>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Table;
