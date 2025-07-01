import styled from "styled-components";
import logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { useState } from "react";
import { registerNewUser } from "../ConectivityModule";
import { toast } from "react-toastify";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    image: ""
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    registerNewUser(formData)
      .then(() => {
        toast.success("Cadastro realizado com sucesso!");
        navigate("/");
      })
      .catch(() => {
        toast.error("Erro ao realizar cadastro. Tente novamente.");
        alert("Faça o login novamente!");
      })
      .finally(() => setLoading(false));
  }

  return (
    <ScSignup>
      <img src={logo} alt="Track-it Logo" />

      <form onSubmit={handleSubmit}>
        <h1>Cadastrar:</h1>

        <input
          data-test="email-input"
          disabled={loading}
          name="email"
          type="email"
          required
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          data-test="password-input"
          disabled={loading}
          name="password"
          type="password"
          required
          placeholder="Senha"
          value={formData.password}
          onChange={handleChange}
        />

        <input
          data-test="user-name-input"
          disabled={loading}
          name="name"
          type="text"
          required
          placeholder="Nome"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          data-test="user-image-input"
          disabled={loading}
          name="image"
          type="url"
          required
          placeholder="URL de foto de perfil"
          value={formData.image}
          onChange={handleChange}
        />

        <LoaderButton data-test="signup-btn" loading={loading}>
          Cadastrar
        </LoaderButton>
      </form>

      <Link data-test="login-link" to="/">
        Já tem uma conta? Faça login!
      </Link>
    </ScSignup>
  );
}


const ScSignup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 26px;
  width: 100%;

  position: fixed;
  left: 0;
  top: 50%;
  transform: translateY(-50%);

  img {
    width: 200px;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 80%;
    max-width: 400px;
    gap: 10px;

    h1 {
      font-size: 22px;
      color: #333;
      margin-bottom: 10px;
    }

    input {
      padding: 10px;
      border-radius: 5px;
      border: 2px solid #d4d4d4;
      color: #52b6ff;
      font-size: 16px;
    }

    input::placeholder {
      color: #d4d4d4;
    }

    input:focus {
      outline: 2px solid #52b6ff;
      border: 1px solid #52b6ff;
    }

    button {
      background-color: #52b6ff;
      border: none;
      border-radius: 5px;
      padding: 10px;
      color: #fff;
      font-size: 16px;
    }
  }

  a {
    color: #52b6ff;
    font-size: 14px;
    text-decoration: none;
    margin-top: 10px;
  }
`;
