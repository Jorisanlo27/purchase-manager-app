import cors from "cors";
import express from "express";
import productsRoute from "./routes/productsRoute.js";
import db from './config/db.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    return res.status(234).send("Welcome to PMA");
});

app.use("/products", productsRoute);

db.on('error', (err) => console.log(err))
db.once('open', () => console.log('Connected to Database!'))

app.listen(port, () => {
    console.log("Running on PORT: " + port);
})

export default app;