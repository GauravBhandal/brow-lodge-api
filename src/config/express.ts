import { Express } from "express";
import bodyParser from "body-parser";
import compressionMiddleware from "compression";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import config from "./environment";
import sequelize from "./sequelize";

export default function (app: Express) {
  const allowedHeaders = config.CORS_ORIGIN.split(",");
  const corsOptions = {
    allowedHeaders,
  };
  const morganConfig = `:method :url (:response-time ms) :status`;

  // Test DB
  sequelize
    .authenticate()
    .then(() => console.log("Database connected..."))
    .catch((err) => console.log("Error: " + err));

  app.use(helmet());
  app.use(morgan(morganConfig));
  app.use(compressionMiddleware());
  app.use(cors(corsOptions));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({ type: ["json", "+json"] }));

  app.use((req, res, next) => {
    res.header("Cache-Control", "private, no-cache");
    next();
  });

  return app;
}
