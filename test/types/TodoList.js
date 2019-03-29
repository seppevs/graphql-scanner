module.exports = {
  typeDef: `
      type TodoList {
        subject: String!
        tasks: [String]
      }
    `,
  resolver: {
    tasks(todoList, arg, ctx)  {
      return Promise.resolve(['Fix a cab', 'Book a flight']);
    }
  }
};
