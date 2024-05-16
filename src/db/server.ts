import express from "express";
import router from "../routes/index";
import { connectDB } from "./db";
import config from "config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", router);
const port = config.get("localhost.port");

connectDB()
     .then(() => {
          app.listen(port, () => {
               console.log("db connected!!");
               console.log(`Server is running on port ${port}`);
          });
     })
     .catch((error) => {
          console.log("error connecting to database", error.message);
     });
