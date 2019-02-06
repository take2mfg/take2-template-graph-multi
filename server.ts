import express from 'express';
import winston from 'winston';
import expressWinston from 'express-winston';
import GraphQLPlayground from 'graphql-playground-middleware-express';

// Services
import Logger from './services/logger';

// Apps
import ___Base___App from './apps/___base___';

const server = express();
const port = process.env.PORT || 3344;

// Request Logging
server.use(expressWinston.logger({
  winstonInstance: Logger,
  transports: [
    new winston.transports.Console()
  ],
  level: () => process.env.LOG_LEVEL || 'verbose',
  // meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  // msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  // ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
}));

// Error Logging
server.use(expressWinston.errorLogger({
  winstonInstance: Logger,
  transports: [
    new winston.transports.Console(),
  ],
}));

if (process.env.NODE_ENV !== 'production') {
  server.use('/playground', GraphQLPlayground({
    tabs: [
      { query: '{}', endpoint: '/___base___/graphql' },
    ]
  }))
}

export const startServer = async () => {

  // Start apps
  server.use('/___base___', await ___Base___App());

  // Listen
  server.listen(port, () => {
    console.log(`App running at port ${port}`);
  });
}

export default server;
