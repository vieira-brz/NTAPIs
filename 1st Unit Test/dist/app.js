"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.routes();
    }
    config() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true })); // Url se tiver espaço vai entender também
    }
    listen(port) {
        this.app.listen(port, () => console.log('Server is running...'));
    }
    routes() {
        this.app.use('/', (req, res) => {
            return res.json({ message: 'ok' });
        });
    }
}
exports.App = App;
