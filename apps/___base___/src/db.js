import * as Models from './models';
import { startSequelize } from '../../../utils/sequelize/startSequelize';


const startDB = async () => {
  const db = await startSequelize('___BASE____', Models);
  return db;
}

export default startDB;
