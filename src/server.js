import dotenv from "dotenv";
dotenv.config({ path: "./.env.local" });

import app from "./app.js";
import connectDB  from "./db/index.js";

const PORT = process.env.PORT|| 8001;

connectDB()
.then(() => {

      app.on("error", (err) => {
        console.error("ERROR on app: ", err);
         throw err;
      })

      app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
      })

}).catch((error) => {
  console.log("DB connection Failed: ", error);
})