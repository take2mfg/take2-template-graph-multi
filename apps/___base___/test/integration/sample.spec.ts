import { expect } from 'chai';
import { gql } from 'apollo-server-express';

const {apps, request} = global;

describe.skip('Sample - Integration', () => {

  it('should run a simple integration test', async () => {
    const res = await request(apps.CoreApp)
      .get('/hello')

    expect(res).to.exist;
    expect(res.text).to.equal('world');
  });

});
