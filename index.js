import express from "express";

const app = express();
const port = 419;
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@email.com",
    age: 25,
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane@email.com",
    age: 30,
  },
  {
    id: 3,
    name: "Jorja Smith",
    email: "jorja@email.com",
    age: 35,  
  },
]

app.get("/", (req, res) => {
  res.send("hello welcome to my personal api server");
});

app.get("/users", (req, res) => {
  res.json(users);
});


app.listen(port, () => {
  console.log(`server is running on port http://localhost:${port}`);
});
