import express from 'express'
import routes from './routes/index.ts';
import cors from "cors";

const app = express()
app.use(express.json());
app.use(cors())

app.use('/api', routes);

app.listen(3000, () => {
    console.log("Server running on port 3000")
})