import cors from "cors";
import express, { Application } from "express";
import router from './routes/index';
const app: Application = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1',router);



export default app;
