import Sequelize from 'sequelize';
import { get, each, keys } from 'lodash';
import { operatorsAliases } from './operatorsAliases';
import { getDBConfig } from './getDBConfig';


export const startSequelize = async (appKey, Models) => {
  try {

    // Get the .env config
    // either APPKEY__ or APPKEY__TEST_
    const {
      database,
      username,
      password,
      dialect,
      host,
      port,
      logging,
      ssl,
    } = getDBConfig(appKey);


    const options = {
      dialect,
      host,
      port,
      logging,
      dialectOptions: { ssl },
      operatorsAliases,
    };

    const sequelize = new Sequelize(database, username, password, options);


    const db = {};

    // Load the models
    each(Models, ({ name, define }) => {
      const model = sequelize['import'](name, define);
      db[name] = model;
    });


    // Associate them
    each(keys(db), model => {
      const associate = get(db[model], 'options.classMethods.associate');
      if (associate) {
        associate(db);
      }
    });


    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    let syncOptions = {};
    if (process.env.NODE_ENV === 'test') {
      syncOptions.force = true;
    }


    await db.sequelize.sync({ force: true });


    return db;

  } catch (e) {
    throw new Error(e);
    process.exit();
  }

};
