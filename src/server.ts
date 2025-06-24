import app from "./frameworks-drivers/express/app";
import "reflect-metadata";

const port = 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
