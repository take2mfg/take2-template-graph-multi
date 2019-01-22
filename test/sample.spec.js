import { get } from 'lodash';

describe('Sample', () => {
  it('should run a test with es7 features', () => {
    const a = { foo: 'bar' };
    const b = { ...a, bar: 'baz' };

    const { foo, bar } = b;

    expect(foo).to.equal('bar');
    expect(get(b, 'bar')).to.equal('baz');
  });
});
