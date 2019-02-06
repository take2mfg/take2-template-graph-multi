// Server entry point
require('@babel/register');
require('./services/env');
require('./server').startServer();
