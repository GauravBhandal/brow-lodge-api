import Express from "express";

import configureExpress from "./config/express";
import config from "./config/environment";
import router from "./router";

const express = Express();
const app = configureExpress(express);

const port = 9000;

app.use((config.URL_PREFIX || "") + "/", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
