import express  from 'express';
import {config} from "dotenv";
import { DB } from './config/db/db';
import  errorHandler  from './middlewares/errors-handlers';
import user_router from "./routers/users-route"
import staff_router from './routers/staff-route';
import { limiter } from './middlewares/rate-limi';

config()


// Create an Express application
const app = express();

// body parser
app.use(express.json())


// End points

app.use("/api/users", limiter, user_router);
app.use("/api/staff",  staff_router);

// error handler 
app.use(errorHandler);

// database connecting
DB()

// Specify the port number for the server
const port: (number | string ) =  process.env.PORT || 3000;


// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});