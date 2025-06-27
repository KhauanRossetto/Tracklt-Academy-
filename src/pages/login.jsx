import styled from "styled-components"
import logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { UserContext, loginUser } from "../ConectivityModule";
import { useContext, useState } from "react";
import { toast } from "react-toastify";


export default function Home() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [, setUser] = useContext(UserContext); 

    const navigator = useNavigate();

    function FormLogin(event) {
        event.preventDefault();
        
        setLoading(true);
        loginUser({email, password})
            .then( (res) => {
                toast.success("Login realizado com sucesso!")
                setUser(res.data)
                setLoading(false)
                navigator('/hoje') 
            })
            .catch( () => {
                toast.error("Usuario ou senha invalidos.")
                alert("Usuario ou senha invalidos.")
                setLoading(false);
            });
    

        
    }

    return (
       <ScHome>
            <img src={logo} alt="Track-it Logo" />

            <form onSubmit={FormLogin}>
                <h1>Login: </h1>
                    <input data-test="email-input" disabled={loading} value={email} onChange={e => setEmail(e.target.value)} type="email" required id="email" placeholder="Email"/>
                    <input data-test="password-input" disabled={loading} value={password} onChange={e => setPassword(e.target.value)} type="password" required placeholder="Senha"/>
                    <LoaderButton testStr={"login-btn"} loading={loading}>Entrar</LoaderButton>
            </form>
        
            <Link data-test="signup-link" to="/cadastro">Não tem uma conta? Cadastre-se!</Link>
       </ScHome> 
    )
}

const ScHome = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 26px;
    width: 100%;

    position: fixed;
    left: 0px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%); 


    form {
        display: flex;
        flex-direction: column;
        width: 80%;
        max-width: 400px ;
        gap: 10px;
        

        input {
            padding: 10px;
            border-radius: 5px;
            border: 2px solid #D4D4D4;
            color: #52B6FF;
        }

        input::placeholder {
            color: #d4d4d4;
        }

        input:focus {
            outline: 2px solid #52B6FF;
            border: 1px solid #52B6FF;
        }
        
        button {
            background-color: #52B6FF;
            border: none;
            border-radius: 5px;
            padding: 10px;
            color: #fff;
        }
    }

    img {
        width: 200px;
    }

    a {
        color: #52B6FF;
        font-size: 14px;
    }

`