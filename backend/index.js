import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import productsRoute from "./routes/productsRoute.js";

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS POLICY
app.use(cors());
// app.use(cors({
//     origin: "http://localhost:2727",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"]
// }));

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send("Welcome to PMA");
});

//Products Routes
app.use("/products", productsRoute);

//Database Connection
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("DB Connection established!");
        app.listen(PORT, () => {
            console.log("Running on PORT: " + PORT);
        })
    }).catch(() => {

    });

export default app;