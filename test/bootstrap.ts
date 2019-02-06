import server from '../server';

import { appWithFactory as Start___Base___App } from '../apps/___base___';

const setup = async () => {

  // Setup server
  global.server = server;


  // Setup apps
  const ___Base___App = await Start___Base___App();

  global.apps = {
    ___Base___App,
  };

  // Shut it down
  after(() => {
    global.server = null;
    setImmediate(async () => {
      process.exit();
    });
  });

  // Run the tests
  run();
  // TODO: Not sure why we need setImmediate here...
  // setImmediate(async () => {
  //
  // });
};

setup();
