# GraphQL Scanner
Define your GraphQL types in separate files

✨ [![Build Status](http://img.shields.io/travis/seppevs/graphql-scanner.svg?style=flat)](https://travis-ci.org/seppevs/graphql-scanner) [![Coverage Status](https://coveralls.io/repos/github/seppevs/graphql-scanner/badge.svg?branch=master)](https://coveralls.io/r/seppevs/graphql-scanner) [![NPM](http://img.shields.io/npm/v/graphql-scanner.svg?style=flat)](https://www.npmjs.org/package/graphql-scanner) [![Downloads](http://img.shields.io/npm/dm/graphql-scanner.svg?style=flat)](https://www.npmjs.org/package/graphql-scanner) [![Dependencies](https://david-dm.org/seppevs/graphql-scanner.svg)](https://david-dm.org/seppevs/graphql-scanner) [![Known Vulnerabilities](https://snyk.io/test/github/seppevs/graphql-scanner/badge.svg)](https://snyk.io/test/github/seppevs/graphql-scanner) ✨

## Introduction
A GraphQL server generally needs two things: a `typeDefs` string and a `resolvers` object.

* The `typeDefs` string contains the schema definitions, 
* `resolvers` object describes how to _resolve_ certain attributes of a type.

The problem is, both the `typeDefs` and `resolvers` can get huge and/or impractical to use.

Enter GraphQL Scanner! A tiny util that allows you to define each type (and their matching resolver) in a separate file.

Tested with [Apollo Server](https://www.apollographql.com/docs/apollo-server/), but should also work with [GraphQL.js](https://graphql.org/graphql-js/) and 
[express-graphql](https://graphql.org/graphql-js/running-an-express-graphql-server/)

## Quickstart

### Install the dependency
```bash
$ npm install graphql-scanner --save
```

### Create a types directory
Create a 'types' directory in your project, and use it to store your GraphQL types.

For example:
```
├── types
|   ├── Query.js
|   └── TodoList.js
|   └── User.js
├── app.js
```

### Define your types
Each type MUST expose an object containing two attributes:
* `typeDef` (String, required): the GraphQL schema definition of your type
* `resolver` (Object, optional): an object to resolve certain attributes of the type you've defined

For example:

#### types/Query.js
```javascript
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
```

#### types/User.js
```javascript
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

```

#### types/TodoList.js
```javascript
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

```

### Use the GraphQL Scanner

You need to pass the path to your directory that contain your types.

For example:

### app.js:
```javascript
const path = require('path');
const graphqlScanner = require('graphql-scanner');

// ...

const dir = path.join(__dirname, './types');
const { typeDefs, resolvers } = graphqlScanner(dir);
const server = new GraphQLServer({ typeDefs, resolvers });

```

The `graphqlScanner(dir)` expression scans your types and returns an object containing `typeDefs` and `resolvers`.

You can then pass these `typeDefs` and `resolvers` to your favourite GraphQL server library.

## How does it work?
[Check the code](https://github.com/seppevs/graphql-scanner/blob/master/src/graphql-scanner.js), it's less than 20 lines!

It uses [require-all](https://www.npmjs.com/package/require-all) to load all modules in the `dir` you've passed as an argument

Then, it will iterate over all loaded modules and 
* append each individual `typeDef` string to a `typeDefs` variable.
* add each individual `resolver` to a `resolvers` object as an attribute. The key of each attribute is the file name (minus extension) of the type

Finally, it will return an object: `{ typeDefs, resolvers }`
