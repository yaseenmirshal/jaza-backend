import morgan, { StreamOptions } from "morgan";
import logger from "./logger.js"; 

const morganFormat = ":method :url :status :response-time ms";

const stream: StreamOptions = {
  write: (message: string) => {
    const [method, url, status, responseTime] = message.trim().split(" ");
    const logObject = {
      method,
      url,
      status,
      responseTime,
    };
    logger.info(JSON.stringify(logObject));
  },
};

const morganMiddleware = morgan(morganFormat, { stream });

export default morganMiddleware;
