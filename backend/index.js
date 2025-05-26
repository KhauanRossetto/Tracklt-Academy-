const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // substitui o body-parser

// Banco de dados temporário em memória
const users = [];
const habits = [];

// Rota de cadastro
app.post("/auth/sign-up", (req, res) => {
  const { email, password } = req.body;
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(409).send({ message: "Usuário já existe." });
  }
  users.push({ email, password });
  res.status(201).send({ message: "Usuário cadastrado com sucesso!" });
});

// Rota de login
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).send({ message: "Credenciais inválidas." });
  }
  const token = "fake-token-" + email;
  res.send({ token, email });
});

// Listar hábitos
app.get("/habits", (req, res) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send({ message: "Token não fornecido." });

  res.send(habits);
});

// Criar hábito
app.post("/habits", (req, res) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send({ message: "Token não fornecido." });

  const habit = { ...req.body, id: Date.now() };
  habits.push(habit);
  res.status(201).send(habit);
});

app.listen(5000, () => {
  console.log("🚀 Servidor rodando em http://localhost:5000");
});
