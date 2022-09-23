import express from "express";
import dotenv from "dotenv";
import { connect } from "./db";
import authr from "./routes/auth";

dotenv.config();
const app = express();
app.use(express.json());
app.use("/auth", authr);

app.listen(3030, async () => {
  await connect();
  console.log("Server running at http://localhost:3030");
});
