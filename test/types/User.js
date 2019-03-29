module.exports = {
  typeDef: `
      type User {
        firstName: String!
        lastName: String
        apikey: String
        todoLists: [TodoList]
      }
    `,
  resolver: {
    todoLists(user, args, ctx) {
      return Promise.resolve([
        {
          subject: 'Holidays',
        }
      ]);
    }
  }
};
