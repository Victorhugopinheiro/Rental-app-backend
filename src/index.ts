import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'
import router from "./routes/tenantRoutes";
import {authMiddleware} from "./middlewere/authMiddleware"

const app = express();
dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('common'));

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })



app.get('/', (req, res) => {
    res.send('Rental App Server is running');
})
app.use("/tenats", authMiddleware, router)


const PORT = process.env.PORT || 3002;
const databaseUrl = process.env.DATABASE_URL || 'No database url';

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}, ${databaseUrl}`);
})