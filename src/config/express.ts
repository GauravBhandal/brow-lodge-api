import { Express } from "express";
import bodyParser from "body-parser";
import compressionMiddleware from "compression";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import sequelize from "./sequelize";
import config from "../config/environment";
import router from "../router";
import { handleErrorMiddleware, shouldReportError } from "../components/errors";
import modelsAssociations from "../components/sequelize/model.associations";
import joiErrorMiddleware from "../components/joi/middleware";
import rateLimitMiddleware from "../components/rateLimiter";
import authMiddleware from "../components/auth";

export default function (app: Express) {
  // TODO: Currently, allowing all CROS requests
  // const allowedHeaders = config.CORS_ORIGIN.split(",");
  // const corsOptions = {
  //   allowedHeaders,
  // };
  morgan.token("user-email", function (req: any, res) {
    return req?.auth?.userEmail || "";
  });
  morgan.token("company-name", function (req: any, res) {
    return req?.auth?.companyName || "";
  });
  const morganConfig = `:method :url (:response-time ms) :status :company-name :user-email`;

  // Test DB
  sequelize
    .authenticate()
    .then(() => console.log("Database connected..."))
    .catch((err) => console.log("Error: " + err));

  // RequestHandler creates a separate execution context using domains, so that every
  // transaction/span/breadcrumb is attached to its own Hub instance
  // app.use(Sentry.Handlers.requestHandler());
  // TracingHandler creates a trace for every incoming request
  // app.use(Sentry.Handlers.tracingHandler());

  app.use(rateLimitMiddleware);
  app.use(helmet());
  app.use(compressionMiddleware());
  app.use(cors()); //TODO: Currently, allowing all CROS requests
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({ type: ["json", "+json"] }));

  app.use((req, res, next) => {
    res.header("Cache-Control", "private, no-cache");
    next();
  });

  modelsAssociations.initialize();

  app.use(authMiddleware);
  app.use(morgan(morganConfig));
  app.use((config.URL_PREFIX || "") + "/", router);

  app.use(joiErrorMiddleware); // <--Always apply this before handleErrorMiddleware
  app.use(handleErrorMiddleware);

  return app;
}
