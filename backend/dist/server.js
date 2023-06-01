"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const mejl_routes_1 = __importDefault(require("./routes/mejl.routes"));
const korisnik_routes_1 = __importDefault(require("./routes/korisnik.routes"));
const klijent_routes_1 = __importDefault(require("./routes/klijent.routes"));
const agencija_routes_1 = __importDefault(require("./routes/agencija.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const objekat_routes_1 = __importDefault(require("./routes/objekat.routes"));
const skica_routes_1 = __importDefault(require("./routes/skica.routes"));
const recenzija_routes_1 = __importDefault(require("./routes/recenzija.routes"));
const posao_routes_1 = __importDefault(require("./routes/posao.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
mongoose_1.default.connect('mongodb://127.0.0.1:27017/DomIzSnovaDB');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('db connected');
});
const router = express_1.default.Router();
router.use('/mejl', mejl_routes_1.default);
router.use('/korisnik', korisnik_routes_1.default);
router.use('/klijent', klijent_routes_1.default);
router.use('/agencija', agencija_routes_1.default);
router.use('/admin', admin_routes_1.default);
router.use('/objekat', objekat_routes_1.default);
router.use('/skica', skica_routes_1.default);
router.use('/recenzije', recenzija_routes_1.default);
router.use('/posao', posao_routes_1.default);
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map