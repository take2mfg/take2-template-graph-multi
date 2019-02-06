/*global after, expect */
'use strict';

require('@babel/register');
require('@babel/polyfill');

import {map, values, keyBy} from 'lodash';
import { expect } from 'chai';
import Migration from '../../../../utils/sequelize/migration';

const {apps} = global;

async function dropTables(sequelize) {
  return await sequelize
    .queryInterface
    .dropAllTables();
}

async function listForeignKeys(sequelize) {
  const query = `
    SELECT tc.constraint_name,
      tc.constraint_type,
      tc.table_name,
      kcu.column_name,
      tc.is_deferrable,
      tc.initially_deferred,
      rc.match_option AS match_type,
      rc.update_rule AS on_update,
      rc.delete_rule AS on_delete,
      ccu.table_name AS references_table,
      ccu.column_name AS references_field
    FROM information_schema.table_constraints tc
    LEFT JOIN information_schema.key_column_usage kcu
      ON tc.constraint_catalog = kcu.constraint_catalog
      AND tc.constraint_schema = kcu.constraint_schema
      AND tc.constraint_name = kcu.constraint_name
    LEFT JOIN information_schema.referential_constraints rc
      ON tc.constraint_catalog = rc.constraint_catalog
      AND tc.constraint_schema = rc.constraint_schema
      AND tc.constraint_name = rc.constraint_name
    LEFT JOIN information_schema.constraint_column_usage ccu
      ON rc.unique_constraint_catalog = ccu.constraint_catalog
      AND rc.unique_constraint_schema = ccu.constraint_schema
      AND rc.unique_constraint_name = ccu.constraint_name
    WHERE lower(tc.constraint_type) in ('foreign key')
  `;

  const records = await sequelize.query(query);

  return records[0];
}

describe('Sequelize migration', function() {
  let migration;
  let sequelize;

  beforeEach(async function() {
    this.timeout(15000);

    sequelize = apps.CoreApp.db.sequelize;

    migration = new Migration({
      path: `${__dirname}/../../migrations`,
      sequelize,
    });

    // Setup the database
    await dropTables(sequelize);
  });

  after(async () => {
    // Setup the database
    await dropTables(sequelize);
  });

  it('should run migrations', async () => {
    await migration.up();
  }).timeout(30000);

  it('should run sync', async () => {
    await sequelize.sync({ force: true });
  }).timeout(30000);

  it('migrate should be equal to sync', async () => {
    const qi = sequelize.getQueryInterface();

    await dropTables(sequelize);
    await migration.up();

    const models = map(sequelize.models);
    const migratedFC = keyBy(await listForeignKeys(sequelize), 'constraint_name');

    // const migratedSchema = await readSchema();
    const migratedSchema = {};
    for (let m of models) {
      let tableName = m.getTableName();
      migratedSchema[tableName] = await qi.describeTable(tableName);
      migratedSchema[tableName].indexes = await qi.showIndex(tableName);

      for (let i of migratedSchema[tableName].indexes) {
        delete i.indkey;
      }
    }

    await dropTables(sequelize);
    await sequelize.sync({ force: true });
    // const syncedSchema = await readSchema();
    const syncedFC = keyBy(await listForeignKeys(sequelize), 'constraint_name');

    const syncedSchema = {};
    for (let m of models) {
      let tableName = m.getTableName();
      syncedSchema[tableName] = await qi.describeTable(tableName);
      syncedSchema[tableName].indexes = await qi.showIndex(tableName);

      for (let i of syncedSchema[tableName].indexes) {
        delete i.indkey;
      }
    }

    // console.log(migratedFC);

    for (let sc of values(syncedFC)) {
      const migrationString = `
      await queryInterface.addConstraint('${sc.table_name}', ['${sc.column_name}'], {
        type: '${sc.constraint_type}',
        name: '${sc.constraint_name}',
        references: { //Required field
          table: '${sc.references_table}',
          field: '${sc.references_field}'
        },
        onDelete: '${sc.on_delete}',
        onUpdate: '${sc.on_update}'
      });
      `;

      expect(migratedFC[sc.constraint_name],
        `FC: ${sc.constraint_name} missing in Migrated Schema (${migrationString})`
      ).to.exist;

      try {
        expect(sc).to.deep.equal(migratedFC[sc.constraint_name] || {});
      } catch (e) {
        e.message = `Mismatch FC: ${migrationString}`;
        e.showDiff = true;
        e.actual = sc;
        e.expected = migratedFC[sc.constraint_name];
        throw e;
      }
    }


    expect(migratedSchema).to.deep.equal(syncedSchema);
  }).timeout(30000);
});
