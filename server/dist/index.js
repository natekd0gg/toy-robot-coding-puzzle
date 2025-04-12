"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.robot = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const robot_1 = __importDefault(require("./robot"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
exports.robot = new robot_1.default();
app.post('/place', (req, res) => {
    const { x, y, direction } = req.body;
    try {
        exports.robot.place(x, y, direction);
        res.status(200).send({
            message: `Robot is now placed at (${x}, ${y}) facing ${direction}`,
        });
    }
    catch (error) {
        res.status(400).send({ message: 'Error placing robot' });
    }
});
app.post('/move', (req, res) => {
    try {
        exports.robot.move();
        const robotPosition = exports.robot.report();
        res.status(200).send({
            message: `Robot has moved to (${robotPosition.x}, ${robotPosition.y}) facing ${robotPosition.direction}`,
            status: robotPosition,
        });
    }
    catch (error) {
        res.status(400).send({ message: 'Error moving robot' });
    }
});
app.post('/left', (req, res) => {
    try {
        exports.robot.left();
        const updatedDirection = exports.robot.report();
        res
            .status(200)
            .send({ message: 'Robot rotated left', status: updatedDirection });
    }
    catch (error) {
        res.status(400).send({ message: 'Error rotating left' });
    }
});
app.post('/right', (req, res) => {
    try {
        exports.robot.right();
        const updatedDirection = exports.robot.report();
        res
            .status(200)
            .send({ message: 'Robot rotated right', status: updatedDirection });
    }
    catch (error) {
        res.status(400).send({ message: 'Error rotating right' });
    }
});
app.get('/report', (req, res) => {
    try {
        const status = exports.robot.report();
        res.status(200).send({ status });
    }
    catch (error) {
        res.status(400).send({ message: 'Error reporting robot' });
    }
});
/*Test*/
app.get('/', (req, res) => {
    res.send('This is another test');
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map