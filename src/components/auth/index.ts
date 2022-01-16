import config from "../../config/environment";
import jwtMiddleware from "express-jwt";

export default jwtMiddleware({
  secret: config.TOKEN_KEY,
  algorithms: ["HS256"],
  requestProperty: "auth",
}).unless({
  path: [
    `${config.URL_PREFIX}/user/login`,
    `${config.URL_PREFIX}/user/register`,
  ],
});
