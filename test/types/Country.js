module.exports = {
  typeDef: `
      type Country {
        code: String!
      }
    `,
};

// This type has no resolver, that should work because it's optional to define a 'resolver'
