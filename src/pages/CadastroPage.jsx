import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signUp } from "../services/authService";
import styled from "styled-components";

function CadastroPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      email,
      name,
      image,
      password,
    };

    try {
      await signUp(body);
      navigate("/login"); // redireciona para login após cadastro bem-sucedido
    } catch (error) {
      const msg = error.response?.data?.message || "Erro ao cadastrar.";
      setErrorMessage(msg);
      console.error("Erro ao cadastrar:", error);
    }
  };

  return (
    <PageContainer>
      <FormContainer>
        <Logo>TrackIt</Logo>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            type="url"
            placeholder="URL da imagem"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
          <SubmitButton type="submit">Cadastrar</SubmitButton>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <LoginLink to="/login">Já tem uma conta? Faça login!</LoginLink>
        </form>
      </FormContainer>
    </PageContainer>
  );
}

export default CadastroPage;

// Styled Components
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
`;

const FormContainer = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 350px;
`;

const Logo = styled.h1`
  font-family: 'Pacifico', cursive;
  font-size: 2.5rem;
  color: #1e90ff;
  text-align: center;
  margin-bottom: 30px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #1e90ff;
    box-shadow: 0 0 5px rgba(30, 144, 255, 0.3);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #1e90ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #4169e1;
  }
`;

const LoginLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 15px;
  color: #1e90ff;
  font-size: 0.9rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.p`
  color: #d32f2f;
  margin-top: 20px;
  text-align: center;
`;
