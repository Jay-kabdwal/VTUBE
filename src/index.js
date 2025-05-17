import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

const X_PORT = process.env.PORT || 8000;
connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERROR", error);
      throw error;
    });
    app.listen(X_PORT, () => {
      console.log(` SERVER IS RUNNING ON PORT ${X_PORT} `);
    });
  })
  .catch((err) => {
    console.log("MONGODB CONNECTION FAILED!!!", err);
  });
