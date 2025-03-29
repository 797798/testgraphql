const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();

// Step 3: Define GraphQL Schema
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// Step 4: Define Resolvers
const root = {
  hello: () => "Hello, GraphQL!",
};

// Step 5: Set Up GraphQL Endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // Enables GraphiQL UI
  })
);

// Step 6: Start the Server
app.listen(4000, () =>
  console.log("Server running on http://localhost:4000/graphql")
);
