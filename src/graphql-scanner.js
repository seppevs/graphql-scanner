const requireAll = require('require-all');

module.exports = (dir) => {
  const modules = requireAll(dir);
  const keys = Object.keys(modules);

  let typeDefs = '';
  const resolvers = {};

  keys.forEach((key) => {
    const value = modules[key];
    const { typeDef, resolver } = value;
    typeDefs += typeDef;
    resolvers[key] = resolver;
  });

  return { typeDefs, resolvers };
};
