import server from '../server';

import { appWithFactory as StartCoreApp } from '../apps/core';

const setup = async () => {

  // Setup server
  global.server = server;


  // Setup apps
  const CoreApp = await StartCoreApp();

  global.apps = {
    CoreApp,
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
