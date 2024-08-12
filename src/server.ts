import express  from 'express';
import {config} from "dotenv";
import { DB } from './config/db/db';
import { errorHandler } from './middlewares/errors-handlers';
config()

// Create an Express application
const app = express();


app.use(express.json())


// Specify the port number for the server
const port: (number | string ) =  process.env.PORT || 3000;

// database connecting
DB()

// error handler 
app.use(errorHandler);


// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});