import { useState, useContext } from "react";
import { login } from "../services/api";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    login(form)
      .then((res) => {
        setUser(res.data);
        navigate("/hoje");
      })
      .catch(() => {
        alert("Erro ao fazer login! Verifique seus dados.");
        setLoading(false);
      });
  }

  return (
    <Container>
      <h1>TrackIt</h1>
      <Form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="E-mail" value={form.email} onChange={handleChange} disabled={loading} required />
        <input type="password" name="password" placeholder="Senha" value={form.password} onChange={handleChange} disabled={loading} required />
        <button type="submit" disabled={loading}>
          {loading ? <ThreeDots color="#FFF" height={20} /> : "Entrar"}
        </button>
      </Form>
      <p onClick={() => navigate("/cadastro")}>Não tem conta? Cadastre-se!</p>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  input {
    padding: 10px;
    font-size: 16px;
  }

  button {
    background-color: #52b6ff;
    color: white;
    font-size: 16px;
    padding: 10px;
    border: none;
    cursor: pointer;
  }
`;
