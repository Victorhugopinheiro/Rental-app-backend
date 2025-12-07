"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("@prisma/client");
// 1. Configura a conexão com o banco usando o driver nativo 'pg'
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new pg_1.Pool({ connectionString });
// 2. Configura o adaptador do Prisma para usar esse driver
const adapter = new adapter_pg_1.PrismaPg(pool);
// 3. Mecanismo para não travar o banco no modo "dev" (Hot Reload)
// Isso evita o erro "Too many connections" quando você salva arquivos
const globalForPrisma = global;
exports.prisma = globalForPrisma.prisma || new client_1.PrismaClient({ adapter });
if (process.env.NODE_ENV !== 'production')
    globalForPrisma.prisma = exports.prisma;
//# sourceMappingURL=prisma.js.map