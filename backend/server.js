import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import cors from "cors";
import paymentRoutes from "./routes/payment.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/payment", paymentRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
