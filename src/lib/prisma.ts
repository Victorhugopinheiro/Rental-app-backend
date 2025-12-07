import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

// 1. Configura a conexão com o banco usando o driver nativo 'pg'
const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })

// 2. Configura o adaptador do Prisma para usar esse driver
const adapter = new PrismaPg(pool)

// 3. Mecanismo para não travar o banco no modo "dev" (Hot Reload)
// Isso evita o erro "Too many connections" quando você salva arquivos
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma