import './bootstrap';
import express from 'express';
import Youch from 'youch';
import 'express-async-errors';
import * as Sentry from '@sentry/node';
import path from 'path';
import routes from './routes';
import './database';
import sentryConfig from './config/sentry';

class App {
  constructor() {
    this.server = express();
    Sentry.init(sentryConfig);
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'temp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (
        process.env.NODE_ENV === 'development' ||
        process.env.NODE_ENV === 'test'
      ) {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }
      return res
        .status(500)
        .json({ error: 'Erro interno. Por favor, tente novamente.' });
    });
  }
}

export default new App().server;
