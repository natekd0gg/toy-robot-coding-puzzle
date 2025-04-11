Requirements

- A robot that is not on the table can choose to ignore the MOVE, LEFT, RIGHT and REPORT command

- PLACE will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST.
- The origin (0,0) can be considered to be the SOUTH WEST most corner.
- The first valid command to the robot is a PLACE command, after that, any sequence of commands may be issued, in any order, including another PLACE command. The application should discard all commands in the sequence until a valid PLACE command has been executed.
- MOVE will move the toy robot one unit forward in the direction it is currently facing.
- LEFT and RIGHT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.
- REPORT will announce the X,Y and F of the robot. This can be in any form, but standard output is sufficient.

  Input can be from a file, or from standard input, as the developer chooses.
  Provide test data to exercise the application.

# server

Use node.js with express and typescript

Robot.ts will contain Robot class and hold all robot operations/logic
Index.ts will handle API logic (Handles routes/requests)

Testing

# client

Use vite build tool for react frontend
