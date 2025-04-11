# Requirements

- A robot that is not on the table can choose to ignore the MOVE, LEFT, RIGHT and REPORT command
- PLACE will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST.
- The first valid command to the robot is a PLACE command, after that, any sequence of commands may be issued, in any order.including another PLACE command. The application should discard all commands in the sequence until a valid PLACE command has been executed.
- MOVE will move the toy robot one unit forward in the direction it is currently facing.
- LEFT and RIGHT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.
- REPORT will announce the X,Y and F of the robot. This can be in any form, but standard output is sufficient.

# Design Process

## Backend/Server

- For backend I used Node and Express with Typescript
- Backend to do all heavylifting, handle the business logic, robot operations, and API logic.
- Robot.ts will contain Robot class and encapsulate all robot operations/logic
- Index.ts will handle routes/requests from the client side
- Jest is used for testing edge cases and also covers a, b, c example input and output:
- To run unit tests, please run `npm run test` in the server folder.

## Client/Frontend

- For frontend I used React and Typescript + Vite Build Tool
- Used to call API to perform robot logic and display data from server to the client side.
- Handle user interactions and state management.
- Can also use React Testing Library to test the UI (not implemented)

## Start Application

- To run the app locally, please install dependencies using `npm install` in both client and server folder and run `npm run dev` in the terminal.

## Deployment

- For deployment, Vercel will be used to host the application.
- You can view the deployed version here: https://toy-robot-coding-puzzle-client.vercel.app/.
