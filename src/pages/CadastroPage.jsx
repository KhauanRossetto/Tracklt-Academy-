import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/authService";
import styled from "styled-components";


function CadastroPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await signUp({ email, password, name, image});
            navigate("/")
        }catch (error){
            setErrorMessage("Erro ao cadastrar. Verifique os dados e tente novamente.");
            console.error("Erro ao cadastrar:", error.response?.data || error.message);
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
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Imagem (URL)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <SubmitButton type="submit">Cadastrar</SubmitButton>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <LoginLink>Já tem uma conta? Faça login!</LoginLink>
        </form>
      </FormContainer>
    </PageContainer>
  );
}


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

const LoginLink = styled.p`
  text-align: center;
  margin-top: 15px;
  color: #1e90ff;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.p`
  color: #d32f2f;
  margin-top: 20px;
  text-align: center;
`;


export default CadastroPage;
