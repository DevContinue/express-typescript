"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const corsOptions_1 = require("./config/corsOptions");
const credentials_1 = require("./middleware/credentials");
const errorHandler_1 = require("./middleware/errorHandler");
const logEvents_1 = require("./middleware/logEvents");
const root_1 = __importDefault(require("./routes/root"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3500;
app.use(logEvents_1.logger);
app.use(credentials_1.credentials);
app.use((0, cors_1.default)(corsOptions_1.corsOptions));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
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
app.use(errorHandler_1.errorHandler);
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}.`);
});
