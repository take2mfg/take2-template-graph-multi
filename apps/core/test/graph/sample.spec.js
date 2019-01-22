import schema from '../../src/graphql/schema';

describe('Sample - Graph', () => {

  let type;

  before(() => {
    type = schema._typeMap['Sample'];
  });

  it('should have the right fields', () => {
    expect(type.getFields()).to.have.property('id');

    // Relationships
    console.log(Object.keys(type.getFields()).join('\n'));
  });

});
