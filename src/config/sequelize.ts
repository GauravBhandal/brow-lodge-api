import { Sequelize } from "sequelize";

import config from "./environment";

const sequelize = new Sequelize(
  config.DATABASE_NAME,
  config.DATABASE_USERNAME,
  config.DATABASE_PASSWORD,
  {
    host: config.DATABASE_HOST,
    dialect: "postgres",
  }
);

export default sequelize;
