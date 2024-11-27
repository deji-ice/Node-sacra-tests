import http from "http";

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1 style='color:red'> Hello World!</h1>");
    res.end();
    console.log(`request url is ${req.url}`);
  })
  .listen(4000, () => {
    console.log(`server is running on port http://localhost:${port}`);
  });

// import fs from "fs";
// //sync read file
// const data = fs.readFileSync("./input.txt", "utf-8");

// console.log("sync", data);

// console.log("program ended");

// //async read file
// fs.readFile("./input.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log("async", data);
// });

// console.log("program ended");




// const port = 4000;
// //create an array of objects
// const users = [
//   { name: "John", age: 25 },
//   { name: "Jane", age: 24 },
//   { name: "Jim", age: 30 },
// ];

