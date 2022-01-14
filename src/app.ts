import Express from "express";

import configureExpress from "./config/express";
import config from "./config/environment";
import router from "./router";
import { handleErrorMiddleware } from "./components/errors";
import modelsAssociations from "./components/sequelize/model.associations";

const express = Express();
const app = configureExpress(express);

modelsAssociations.initialize();

const port = 9000;

app.use((config.URL_PREFIX || "") + "/", router);

app.use(handleErrorMiddleware);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
