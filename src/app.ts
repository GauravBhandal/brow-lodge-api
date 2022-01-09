import Express from "express";
import configureExpress from "./config/express";

const express = Express();
const app = configureExpress(express);

const port = 9000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
