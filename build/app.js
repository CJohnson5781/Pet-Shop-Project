"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const petRoutes_1 = __importDefault(require("./routes/petRoutes"));
const models_1 = require("./models");
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, '../src/public')));
app.set('view engine', 'hbs');
app.set('views', path_1.default.join(__dirname, "../src/views"));
app.set('view options', { layout: 'layout' });
app.use('/pet', petRoutes_1.default);
app.use('/', petRoutes_1.default);
app.use((req, res, next) => {
    res.status(404).render('error', {
        message: "That is not a valid URL."
    });
});
models_1.db.sync().then(() => {
    console.info("The circle is complete!");
});
app.listen(3000);
