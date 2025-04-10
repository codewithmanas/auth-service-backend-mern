import dotenv from "dotenv";

// path property is mandatory because of no default .env , it is .env.local
dotenv.config({ path: "./.env.local" });

import app from "./app.js";
import connectDB from "./db/index.js";

const PORT = process.env.PORT || 8001;

connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.error("ERROR on app: ", err);
      throw err;
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("DB connection Failed: ", error);
  });
