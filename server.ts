import * as dotenv from "dotenv";
dotenv.config();
import { dbConnection } from "./db/connections";
import app from "./app";

const port = process.env.PORT || 3002;
(async function server() {
  await dbConnection();
  app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
  });
})();
