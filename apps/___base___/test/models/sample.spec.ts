import { expect } from 'chai';
const {apps} = global;

describe.skip('Sample - Model', () => {

  it('should create', async () => {
    const record = await apps.CoreApp.factory.create('Sample', { name: 'New Sample' });
    expect((await apps.CoreApp.db.Sample.findByPk(record.id)).name).to.equal('New Sample');
  });

  describe('Validations', () => {

  });

  describe('Associations', () => {

  });

  describe('Lifecycle', () => {

  });

});
