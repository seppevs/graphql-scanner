module.exports = {
  typeDef: `
      type Query {
        currentUser: User
      }
    `,
  resolver: {
    currentUser(_, args, ctx) {
      const { apikey } = ctx;
      return {
        firstName: "John",
        lastName: "Do",
        apikey
      };
    }
  }
};
