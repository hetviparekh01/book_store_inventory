import express from "express";
import router from "./src/routes/index";
import { connectDB } from "./src/db/db";
import config from "config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", router);
const port = config.get("port") || 8000;

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
