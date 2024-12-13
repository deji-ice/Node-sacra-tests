import express from "express";
import dbConnection from "./db/conn.js";
import userRoute from "./routes/userRoutes.js";
import cors from "cors";

const app = express();
const port = 4000;

dbConnection() // connect to the database
app.use(cors())
app.use(express.json()); // parse json request body
app.use("/api/v1/users", userRoute); // use user router

app.get("/", (req, res) => {
  res.send("hello welcome to my personal api server");
});

app.listen(port, () => {
  console.log(`server is listening on port http://localhost:${port}`);
});
