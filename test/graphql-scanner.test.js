const path = require('path');
const graphqlScanner = require('../src/graphql-scanner');

describe('graphql-scanner', () => {
  it('should work', () => {
    const dir = path.join(__dirname, './types');
    const result = graphqlScanner(dir);
    expect(result.typeDefs).toMatchSnapshot();
    expect(result.resolvers).toMatchSnapshot();
  });
});
