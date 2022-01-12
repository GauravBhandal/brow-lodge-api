import config from "../../config/environment";
import jwtMiddleware from "express-jwt";

export default jwtMiddleware({
  secret: config.TOKEN_KEY,
  algorithms: ["HS256"],
});
