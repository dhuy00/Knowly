const express = require("express");
const prisma = require("./prisma.js");
require("dotenv").config();

const app = express();

app.use(express.json());

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();

  res.json(users);
});

app.post("/users", async (req, res) => {
  const { name, email } = req.body;

  const user = await prisma.user.create({
    data: {
      name,
      email,
    },
  });

  res.json(user);
});

app.listen(3000, () => {
  console.log(process.env.DATABASE_URL);
  console.log("Server running");
});