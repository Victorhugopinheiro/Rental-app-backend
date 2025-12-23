"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config"); // Carrega variáveis de ambiente imediatamente
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const adapter_pg_1 = require("@prisma/adapter-pg");
const tenantRoutes_1 = __importDefault(require("./routes/tenantRoutes"));
const managerRoutes_1 = __importDefault(require("./routes/managerRoutes"));
const propetiesRoutes_1 = __importDefault(require("./routes/propetiesRoutes"));
const authMiddleware_1 = require("./middlewere/authMiddleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('common'));
const adapter = new adapter_pg_1.PrismaPg({ connectionString: process.env.DATABASE_URL });
app.use("/tenants", (0, authMiddleware_1.authMiddleware)(['tenant']), tenantRoutes_1.default);
app.use("/managers", (0, authMiddleware_1.authMiddleware)(['manager']), managerRoutes_1.default);
app.use("/properties", propetiesRoutes_1.default);
const PORT = process.env.PORT || 3002;
const databaseUrl = process.env.DATABASE_URL || 'No database url';
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}, ${databaseUrl}`);
});
//# sourceMappingURL=index.js.map