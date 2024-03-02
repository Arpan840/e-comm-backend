import mongoose from "mongoose";
import dotEnv from "dotenv";
dotEnv.config();
const db = process.env.Mongo_dv_url || "";

const db_Connection = mongoose
  .connect(db)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error: any) => {
    console.log(error);
  });

export default db_Connection;
