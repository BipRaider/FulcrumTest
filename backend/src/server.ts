'use strick';

//app server
import express from 'express';
import logger from 'morgan';

// Security
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

//DataBase
import connectMongoDB from './database/mongoDB';

//Config
import env from './config/env.keys';

//Router
import router from './router';

//Error handler
import errorHandler from './middleware/errorHandler';

export default class Server {
  private server: express.Application;
  constructor() {
    this.server = null;
  }

  public start() {
    this.initServer();
    this.initLogger();
    this.initMiddlewares();
    this.initRoutes();
    this.initDB();
    return this.startListening();
  }

  private initServer() {
    // Create express server
    this.server = express();
  }

  private initLogger() {
    // If development mode in console is not writing messages about logs
    if (env.NODE_ENV === 'dev') {
      this.server.use(logger('dev'));
    }
  }

  private initMiddlewares() {
    //Express body parser
    this.server.use(express.urlencoded());
    this.server.use(express.json());
    this.server.disable('x-powered-by');

    this.server.use(cors({ origin: '*' }));

    //For data protection
    this.server.use(mongoSanitize());
    this.server.use(helmet());

    // Used for limit repeated requests
    this.server.use(
      rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 500, // limit each IP to 100 requests per windowMs
      }),
    );
  }

  //Adding routers to express server
  private initRoutes() {
    router(this.server);
    //Middleware  for handling errors
    this.server.use(errorHandler);
  }
  //Connect dataBase
  private initDB() {
    try {
      connectMongoDB();
    } catch (error) {
      process.exit(1);
    }
  }
  private startListening() {
    try {
      //Start server
      return this.server.listen(env.PORT || 5000, (): void => {
        console.log(`Server started on port : ${env.PORT || 5000}`);
      });
    } catch (error) {
      // Close server & exit process
      process.on('unhandledRejection', (err: Error) => {
        console.log(`Error: ${err.message}`);

        this.start().close(() => process.exit(1));
      });
    }
  }
}
