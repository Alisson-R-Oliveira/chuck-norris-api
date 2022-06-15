"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
const port = 3000;
const CHUCK_NORRIS_API_BASE_URL = 'https://api.chucknorris.io';
app.use(express_1.default.json());
app.use(cors_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, '../client/build')));
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'client', 'build', 'index.html'));
});
app.get('/jokes/random', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.query.category;
    try {
        const { data } = yield axios_1.default.get(category ? `${CHUCK_NORRIS_API_BASE_URL}/jokes/random?category=${category}` : `${CHUCK_NORRIS_API_BASE_URL}/jokes/random`);
        if (data)
            res.send(data);
    }
    catch (error) {
        console.error(error);
        let defaultStatusCode = 500;
        let defaultErrorMessage = 'An unexpected error has occurred.';
        if (axios_1.default.isAxiosError(error)) {
            defaultStatusCode = error.response.status;
            defaultErrorMessage = error.response.data;
        }
        res.status(defaultStatusCode).send(new Error(defaultErrorMessage));
    }
}));
app.get('/jokes/categories', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield axios_1.default.get(CHUCK_NORRIS_API_BASE_URL + '/jokes/categories');
        if (data)
            res.send(data);
    }
    catch (error) {
        console.error(error);
        let defaultStatusCode = 500;
        let defaultErrorMessage = 'An unexpected error has occurred.';
        if (axios_1.default.isAxiosError(error)) {
            defaultStatusCode = error.response.status;
            defaultErrorMessage = error.response.data;
        }
        res.status(defaultStatusCode).send(new Error(defaultErrorMessage));
    }
}));
app.get('/jokes/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.query;
    if (!query)
        res.status(400).send(new Error('Missing term to filter.'));
    try {
        const { data } = yield axios_1.default.get(CHUCK_NORRIS_API_BASE_URL + `/jokes/search?query=${query}`);
        if (data)
            res.send(data);
    }
    catch (error) {
        console.error(error);
        let defaultStatusCode = 500;
        let defaultErrorMessage = 'An unexpected error has occurred.';
        if (axios_1.default.isAxiosError(error)) {
            defaultStatusCode = error.response.status;
            defaultErrorMessage = error.response.data;
        }
        res.status(defaultStatusCode).send(new Error(defaultErrorMessage));
    }
}));
app.listen(port, () => {
    console.log('Server started;');
});
exports.default = app;
//# sourceMappingURL=index.js.map