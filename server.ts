import express from "express";
import db_Connection from "./db";
import AuthRouter from "./Controllers/Auth.Controller";
import dotEnv from "dotenv";
import cors from "cors";
import session from 'express-session';
const MongoDBStore = require("connect-mongodb-session")(session);
dotEnv.config();
const app = express();

app.use(express.json());
const store = new MongoDBStore({
  uri: process.env.Mongo_dv_url,
  collection: "mySessions",
});
app.use(
  session({
    secret: process.env.secret || "",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
const port = Number(process.env.PORT);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/auth", AuthRouter);

app.listen(port, () => {
  console.log(`app running on  http://localhost:${port}`);
  db_Connection;
});
