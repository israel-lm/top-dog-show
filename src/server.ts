import "reflect-metadata";
import app from "./frameworks-drivers/express/app";

import { appDataSource } from "./frameworks-drivers/sql-repository/data-source";

appDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

const port = 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
