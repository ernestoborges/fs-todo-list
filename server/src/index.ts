import express from 'express'
import routes from './routes/index.ts';
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_BASE_URL,
    credentials: true
}));
app.use(cookieParser());

app.use('/api', routes);

app.listen(3000, () => {
    console.log("Server running on port 3000")
})