const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express(); // ✅ สร้างแอป Express

// ✅ Step 1: กำหนด GraphQL Schema
// เป็นการกำหนดโครงสร้างของข้อมูลที่ GraphQL API จะสามารถจัดการได้
// ในที่นี้เราจะสร้าง Schema สำหรับ User ที่มี id, name และ age
// และ Table ที่มี id, name และ age เช่นกัน
// นอกจากนี้ยังมี Query และ Mutation สำหรับการดึงข้อมูลและแก้ไขข้อมูล
// Query จะใช้สำหรับดึงข้อมูลจาก Server
// Mutation จะใช้สำหรับการสร้าง, แก้ไข และลบข้อมูล
// โดยจะมีการกำหนด Type ของข้อมูลที่ส่งกลับมาในแต่ละ Query และ Mutation
// ในที่นี้เราจะใช้ GraphQL Schema Definition Language (SDL) เพื่อกำหนด Schema
const schema = buildSchema(`
    type User {
      id: ID!
      name: String!
      age: Int!
    }
    type Table{
      id: ID!
      name: String!
      age: Int!
    }  
    type Query {
      hello: String
      user(id: ID!): User
      table(id: ID!): Table
    }
    type Mutation {
      createUser(id: ID!, name: String!, age: Int!): User
      updateUser(id: ID!, name: String, age: Int): User
      deleteUser(id: ID!): String
      createTable(id: ID!, name: String!, age: Int!): Table
      updateTable(id: ID!, name: String, age: Int): Table
      deleteTable(id: ID!): String
    }
  `);

// ✅ Step 2: จำลองฐานข้อมูล (Array ของ Users)
const tables = [
  { id: "1", name: "Alice", age: 25 },
  { id: "2", name: "Bob", age: 30 },
];
const users = [
  { id: "1", name: "Alice", age: 25 },
  { id: "2", name: "Bob", age: 30 },
];

// ✅ Step 3: กำหนด Resolvers (ฟังก์ชันที่ใช้ตอบสนอง Query)
// Resolvers จะทำหน้าที่จัดการกับข้อมูลที่ถูกเรียกจาก Client
// ในที่นี้เราจะสร้าง Resolver สำหรับ Query ที่กำหนดไว้ใน Schema
// โดยใช้ฟังก์ชันที่คืนค่า Object ที่มีข้อมูลตามที่ต้องการ
// โดยใช้ข้อมูลจาก Array ที่เราจำลองไว้ใน Step 2
// Query จะใช้สำหรับดึงข้อมูลจาก Server
// Mutation จะใช้สำหรับการสร้าง, แก้ไข และลบข้อมูล
// โดยจะมีการกำหนด Type ของข้อมูลที่ส่งกลับมาในแต่ละ Query และ Mutation
// ในที่นี้เราจะใช้ GraphQL Schema Definition Language (SDL) เพื่อกำหนด Schema
// โดยจะมีการกำหนด Type ของข้อมูลที่ส่งกลับมาในแต่ละ Query และ Mutation
const root = {
  hello: () => "Hello, GraphQL!",
  user: ({ id }) => users.find((user) => user.id === id),
  table: ({ id }) => tables.find((table) => table.id === id),

  // Mutations สำหรับ User
  createUser: ({ id, name, age }) => {
    const newUser = { id, name, age };
    users.push(newUser);
    return newUser;
  },
  updateUser: ({ id, name, age }) => {
    let user = users.find((user) => user.id === id);
    if (user) {
      if (name) user.name = name;
      if (age) user.age = age;
    }
    return user;
  },
  deleteUser: ({ id }) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      users.splice(index, 1);
      return "User deleted successfully";
    }
    return "User not found";
  },
  // Mutations สำหรับ Table
  createTable: ({ id, name, age }) => {
    const newTable = { id, name, age };
    tables.push(newTable);
    return newTable;
  },
  updateTable: ({ id, name, age }) => {
    let table = tables.find((table) => table.id === id);
    if (table) {
      if (name) table.name = name;
      if (age) table.age = age;
    }
    return table;
  },
  deleteTable: ({ id }) => {
    const index = tables.findIndex((table) => table.id === id);
    if (index !== -1) {
      tables.splice(index, 1);
      return "Table deleted successfully";
    }
    return "Table not found";
  },
};

// ✅ Step 4: ตั้งค่า GraphQL Endpoint ใน Express
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema, // ใช้ Schema ที่สร้างไว้
    rootValue: root, // ใช้ Resolver ที่กำหนดไว้
    graphiql: true, // เปิด GraphiQL UI (สำหรับทดสอบ API)
  })
);

// ✅ Step 5: เริ่มต้น Server ที่ Port 4000
app.listen(4000, () =>
  console.log("🚀 Server running at http://localhost:4000/graphql")
);
