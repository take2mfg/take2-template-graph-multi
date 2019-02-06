import { factory as _factory, SequelizeAdapter } from 'factory-girl';
import faker from 'faker';

const loadFactory = async db => {

  const factory = new _factory.FactoryGirl();

  factory.setAdapter(new SequelizeAdapter());



  return factory;
};

export default loadFactory;
