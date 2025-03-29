# TestGraphQL

This repository demonstrates how GraphQL works, step by step.

## Table of Contents

1. [Setup Instructions](#setup-instructions)
2. [API Usage](#api-usage)
3. [Steps to Run the Project](#steps-to-run-the-project)

---

## Setup Instructions

### Step 1: Create a `.gitignore` file

Create a `.gitignore` file to ensure that sensitive files (like configuration files or API keys) are not tracked by Git.

**.gitignore Example:**

node_modules/ .env

### Step 2: Initialize a Node.js project and install required packages

Run the following commands in your terminal:

```bash
# Initialize a Node.js project
npm init -y

# Install necessary packages
npm install express graphql express-graphql
```

### Step 3: Create the Server

Create an index.js file in the root directory to set up the basic GraphQL server with Express and GraphQL.

### API Usage
GraphQL API follows a similar structure to a REST API. However, there are differences in the way the queries and mutations are structured.

####Step 1: Query (GET)
In GraphQL, Query represents the equivalent of a GET request in REST.

For example, to get the information of a table by its id, you can send the following query:

graphql

{
  table(id: "1") {
    name
    age
  }
}
####Step 2: Mutation (PUT, UPDATE, DELETE)
In GraphQL, Mutation represents the equivalent of PUT, UPDATE, and DELETE requests in REST.

For example, to update a user's information, you would send a mutation like this:

mutation {
  updateUser(id: "2", name: "Bob Updated", age: 31) {
    id
    name
    age
  }
}


### Steps to Run the Project
    Step 1: Run the server
    Once the index.js file is created and your code is ready, run the server using the following command:
    node index.js
    Step 2: Access GraphiQL UI
    If you've set up the GraphQL server correctly, you can access the GraphiQL UI to test your queries and mutations at:

http://localhost:4000/graphql

