import { Express } from "express";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

import config from "../../config/environment";

export function initialiseSentry(app: Express) {
  Sentry.init({
    environment: config.APP_ENV, // "localhost", "dev", "staging", "production"
    dsn: config.SENTRY_DNS,
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Tracing.Integrations.Express({ app }),
    ],

    enabled: config.APP_ENV !== "localhost",
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
  return Sentry;
}
