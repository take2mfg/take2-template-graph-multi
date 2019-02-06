import * as Models from './models';
import { startSequelize } from '../../../utils/sequelize/startSequelize';


const startDB = async () => {
  const db:any = await startSequelize('___BASE_____', Models);
  return db;
}

export default startDB;
