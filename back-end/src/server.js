import expess from "express";
import bodyParser from "body-parser";
import process from "process";
import { webRoute } from "./routes/route.js";
import doten from "dotenv";
import mongoose from "mongoose";
doten.config();

let app = expess();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_DB_URI);

app.get("/", (req, res) => {
  res.send("Hello from Health Booking backend");
});

webRoute(app);

let PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Server running at port :", PORT);
});
