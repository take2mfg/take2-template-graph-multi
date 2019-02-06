import keys from 'lodash/keys';
import find from 'lodash/find';
import { resolver as gsResolver } from 'graphql-sequelize';

/*
  NOTE:  This resolver resolves a Graph Query to a mapped Sequelize model
  for pulling data.  Would be similar using any ORM layer / library
*/
export const resolver = modelName => (parent, args, ctx, info) => {
  const key = modelName.toLowerCase();
  const modelKeys = keys(ctx.db);

  // TODO: This is pretty hacky... would like a harder pattern here.
  const modelKey = find(modelKeys, k => {
    const lower = k.toLowerCase();
    return lower === key || lower === key.replace(/s$/gi, '') || lower === key.replace(/es$/gi, '');
  });

  if (!modelKey) {
    throw new Error('Model not found.');
  }

  return gsResolver(ctx.db[modelKey])(parent, args, ctx, info)
};
