import 'dotenv/config'; 

import fs from "fs";
import path from "path";
import { Pool } from 'pg'; 
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client'; 

// 2. Verificação de segurança (Opcional, mas recomendada)
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL não foi definida no arquivo .env');
}

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function toPascalCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function toCamelCase(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

async function insertLocationData(locations: any[]) {
  for (const location of locations) {
    const { id, country, city, state, address, postalCode, coordinates } = location;
    try {
      await prisma.$executeRaw`
        INSERT INTO "Location" ("id", "country", "city", "state", "address", "postalCode", "coordinates") 
        VALUES (${id}, ${country}, ${city}, ${state}, ${address}, ${postalCode}, ST_GeomFromText(${coordinates}, 4326));
      `;
      console.log(`Inserted location for ${city}`);
    } catch (error) {
      console.error(`Error inserting location for ${city}:`, error);
    }
  }
}

async function resetSequence(modelName: string) {
  const tableName = toPascalCase(modelName).toLowerCase() + 's'; // Convenção plural

  // Ajuste de tipagem para acessar o modelo dinamicamente
  const model = (prisma as any)[toCamelCase(modelName)];
  
  if (!model) return;

  const maxIdResult = await model.findMany({
    select: { id: true },
    orderBy: { id: "desc" },
    take: 1,
  });

  if (maxIdResult.length === 0) {
    await prisma.$executeRawUnsafe(`SELECT setval(pg_get_serial_sequence('${tableName}', 'id'), 1, false);`);
    console.log(`Reset sequence for ${modelName} to 1 (table was empty).`);
    return;
  }
  
  const nextId = maxIdResult[0].id + 1;
  
  // Usando executeRawUnsafe para o nome da tabela dinâmico (mais compatível com seed scripts)
  await prisma.$executeRawUnsafe(`SELECT setval(pg_get_serial_sequence('${tableName}', 'id'), ${nextId}, false);`);

  console.log(`Reset sequence for ${modelName} to ${nextId}`);
}

async function deleteAllData(orderedFileNames: string[]) {
  const modelNames = orderedFileNames.map((fileName) => {
    return toPascalCase(path.basename(fileName, path.extname(fileName)));
  });

  for (const modelName of modelNames.reverse()) {
    const modelNameCamel = toCamelCase(modelName);
    const model = (prisma as any)[modelNameCamel];
    if (!model) {
      console.error(`Model ${modelName} not found in Prisma client`);
      continue;
    }
    try {
      await model.deleteMany({});
      console.log(`Cleared data from ${modelName}`);
    } catch (error) {
      console.error(`Error clearing data from ${modelName}:`, error);
    }
  }
}

async function main() {
  // 4. Correção: Trocar __dirname por process.cwd() para não quebrar no ES Module
  const dataDirectory = path.join(process.cwd(), "prisma/seedData");

  const orderedFileNames = [
    "location.json",
    "manager.json",
    "property.json",
    "tenant.json",
    "lease.json",
    "application.json",
    "payment.json",
  ];

  await deleteAllData(orderedFileNames);

  for (const fileName of orderedFileNames) {
    const filePath = path.join(dataDirectory, fileName);
    
    // Verificação de segurança se o arquivo existe
    if (!fs.existsSync(filePath)) {
        console.warn(`Arquivo não encontrado: ${filePath}`);
        continue;
    }

    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const modelName = toPascalCase(path.basename(fileName, path.extname(fileName)));
    const modelNameCamel = toCamelCase(modelName);

    if (modelName === "Location") {
      await insertLocationData(jsonData);
    } else {
      const model = (prisma as any)[modelNameCamel];
      try {
        // Usar createMany é muito mais rápido que loop for, mas se precisar de hooks, mantenha o for
        for (const item of jsonData) {
          await model.create({ data: item });
        }
        console.log(`Seeded ${modelName} with data from ${fileName}`);
      } catch (error) {
        console.error(`Error seeding data for ${modelName}:`, error);
      }
    }

    await resetSequence(modelName);
    await sleep(1000);
  }
}

main()
  .catch((e) => {
      console.error(e);
      process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());