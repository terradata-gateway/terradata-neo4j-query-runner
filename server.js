const QueryRunner = require('./server/query-runner');
const server = new QueryRunner();
const Log = require('./lib/logger');
const constants = require('./lib/constants');
const dotenv = require('dotenv');

// Load config 
dotenv.config({ path: './config/config.env'});

/* ===================================================================================
    Terradata MQ Server Listener
=====================================================================================*/

Log.info(`query.runner.server.online`);

server.listen(constants.EVENTS_QUEUE);

/* ===================================================================================
   Unhandled Process Exception
=====================================================================================*/

// Handle unhandled rejections
process.on('unhandledRejection', (err, promise) => {
    Log.error(`process.unhandled.rejection ${err.message}`);
    // Close server and exit process
    server.close();
    process.exit(1);
});

