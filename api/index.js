import express from "express";
import dotenv from "dotenv";
import queryRoutes from "./routes/user.js";
import cors from 'cors'


dotenv.config();
const app = express();

app.use(cors());

const PORT = process.env.PORT || 8800

app.use(express.json());
app.use("/api/v1", queryRoutes);


app.listen(PORT, () => {
  console.log("Connected");
});
