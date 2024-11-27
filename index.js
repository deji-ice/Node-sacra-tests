import express from "express";

const app = express();
const port = 419;

const users = [
  { name: "John", age: 25 },
  { name: "Jane", age: 24 },
  { name: "Jim", age: 30 },
];

app.get("/", (req, res) => {
  res.send("<h1 style='color:red'> Hello deji!</h1>");
});

app.get("/about", (req, res) => {
  res.send("about page");
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.get("/ab?cd", (req, res) => {
  res.send("ab?cd");
});

app.get("/users/:age", (req, res) => {
  const { age } = req.params;
  console.log(typeof age);
  const data = users.filter((user) => user.age === parseInt(age));
  console.log(data)
  res.send(data);
});

app.listen(port, () => {
  console.log(`server is running on port http://localhost:${port}`);
});
