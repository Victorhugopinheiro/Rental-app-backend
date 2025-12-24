import "dotenv/config"; // Carrega variáveis de ambiente imediatamente
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';



import { PrismaPg } from '@prisma/adapter-pg'
import tenantRouter from "./routes/tenantRoutes";
import managerRouter from "./routes/managerRoutes";
import propetiesRouter from "./routes/propetiesRoutes";
import {authMiddleware} from "./middlewere/authMiddleware"
import applicationRoutes from "./routes/applicationRoutes";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('common'));

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })





app.use("/tenants", authMiddleware(['tenant']), tenantRouter)
app.use("/managers", authMiddleware(['manager']), managerRouter)
app.use("/properties", propetiesRouter)
app.use("/applications", applicationRoutes)


const PORT = process.env.PORT || 3002;
const databaseUrl = process.env.DATABASE_URL || 'No database url';

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}, ${databaseUrl}`);
})