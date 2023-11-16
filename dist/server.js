"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const logEvents_1 = require("./middleware/logEvents");
const root_1 = __importDefault(require("./routes/root"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3500;
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(logEvents_1.logger);
app.use('/', express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use('/', root_1.default);
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path_1.default.join(__dirname, '../src', 'views', '404.html'));
    }
    else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    }
    else {
        res.type('txt').send("404 Not Found");
    }
});
app.listen(port, () => {
    console.log(`server is running on ${port}.`);
});
