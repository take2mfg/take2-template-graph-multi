import Umzug from 'umzug';
import Sequelize from 'sequelize';

class Migration {
  umzug:Umzug;

  constructor(options:any = {}) {
    if (!options.path) {
      throw new Error('No path defined for migrations');
    }

    if (!options.sequelize) {
      throw new Error('No sequelize instance provided');
    }

    const { path, sequelize } = options;

    this.umzug = new Umzug({
      storage: 'sequelize',
      storageOptions: {
        sequelize,
      },
      migrations: {
        params: [sequelize.queryInterface, Sequelize],
        path,
      },
      logging: options.logging || false,
    });
  }

  async up(options) {
    return this.umzug.up(options);
  }

  async down(options) {
    return this.umzug.down(options);
  }
}

export default Migration;
