# Template GraphQL Server

#### Basics

The bulk of the functional code can be found in...
```
/apps/core
```

A basic rundown of directorys & structure
```
/apps
  /core
    index.js             - Entry point for the "core" app
    /migrations          - Sample migrations for standing up PostGres / Sequelize
    /src
      /graphql           - GraphQL Schema Definitions (see schema.js for the entry point)
      /models            - Sequelize model example files (see order.js for a more complete example)
      /resolvers         - The Stub, Sequelize, and Context resolvers
    /test
      /graph             - Type tests on the Graph schema
      /integration       - Examples of what integration tests might look like
      /model             - Model & Validation tests for Sequelize models
      /resolvers         - A place to put resolver tests (not much there yet)
      /unit              - A place to put unit tests on functional helpers (not much there yet)
```

### Running the app

Once you've cloned, install your dependencies...
```
$ npm install
```

Next, ensure you have PostGres installed on your machine.  Once you have that installed, you'll need to create a new database in your root installation...
```
$ createdb <dbname>
```

Next, you'll need to create a `.env` file in your `root (/)` directory.  You can see an example at `/sample.env`

<em>Note: It's ok if your `CORE__TEST` and `CORE__` credentials are the same, just be AWARE that your setup will be torn down **any time you run tests**</em>.  We generally view this as a good thing for CI / CD.

### Starting the App

```
$ npm run dev          - Runs app against Sequelize Resolver
```
App starts on port 3344;

### GraphQL Playground

The app ships with a graphql playground, which is useful for developing schemas.  You can access the playground at:

```
http://localhost:3344/playground
```

### Running Tests

```
$ npm test                         --> runs app tests
$ npm run test-graph               --> runs graph tests and "ugly" logs fields
$ npm run test-migrations          --> tests migrations for schema sync
$ npm run test-all                 --> run all tests, including migrations
```
