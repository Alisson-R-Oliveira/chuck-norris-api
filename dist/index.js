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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var axios_1 = __importDefault(require("axios"));
var http_1 = __importDefault(require("http"));
var cors_1 = __importDefault(require("cors"));
var app = express_1.default();
var port = 3000;
var CHUCK_NORRIS_API_BASE_URL = 'https://api.chucknorris.io';
app.use(express_1.default.json());
app.use(cors_1.default());
// app.use(express.static(path.join(__dirname, '../client/build')));
app.get('/jokes/random', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var category, data, error_1, defaultStatusCode, defaultErrorMessage;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                category = req.query.category;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, axios_1.default.get(category ? CHUCK_NORRIS_API_BASE_URL + "/jokes/random?category=" + category : CHUCK_NORRIS_API_BASE_URL + "/jokes/random")];
            case 2:
                data = (_a.sent()).data;
                if (data)
                    res.send(data);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error(error_1);
                defaultStatusCode = 500;
                defaultErrorMessage = 'An unexpected error has occurred.';
                if (axios_1.default.isAxiosError(error_1)) {
                    defaultStatusCode = error_1.response.status;
                    defaultErrorMessage = error_1.response.data;
                }
                res.status(defaultStatusCode).send(new Error(defaultErrorMessage));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/jokes/categories', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_2, defaultStatusCode, defaultErrorMessage;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.get(CHUCK_NORRIS_API_BASE_URL + '/jokes/categories')];
            case 1:
                data = (_a.sent()).data;
                if (data)
                    res.send(data);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error(error_2);
                defaultStatusCode = 500;
                defaultErrorMessage = 'An unexpected error has occurred.';
                if (axios_1.default.isAxiosError(error_2)) {
                    defaultStatusCode = error_2.response.status;
                    defaultErrorMessage = error_2.response.data;
                }
                res.status(defaultStatusCode).send(new Error(defaultErrorMessage));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/jokes/search', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, data, error_3, defaultStatusCode, defaultErrorMessage;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = req.query.query;
                if (!query)
                    res.status(400).send(new Error('Missing term to filter.'));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, axios_1.default.get(CHUCK_NORRIS_API_BASE_URL + ("/jokes/search?query=" + query))];
            case 2:
                data = (_a.sent()).data;
                if (data)
                    res.send(data);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.error(error_3);
                defaultStatusCode = 500;
                defaultErrorMessage = 'An unexpected error has occurred.';
                if (axios_1.default.isAxiosError(error_3)) {
                    defaultStatusCode = error_3.response.status;
                    defaultErrorMessage = error_3.response.data;
                }
                res.status(defaultStatusCode).send(new Error(defaultErrorMessage));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
http_1.default.createServer(app).listen(port);
