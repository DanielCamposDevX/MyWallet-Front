import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { RequestContext } from "../context/RequestContext";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const { setRequest } = useContext(RequestContext);
  const userdata = localStorage.getItem("user");
  const navigate = useNavigate();

  useEffect(() => {
    const promise = axios.post(`${import.meta.env.VITE_API_URL}/signin`, userdata);
    promise
      .then((token) => {
        setRequest({ email, pass, token });
        navigate("/home");
      })
      .catch((error) => {console.log("Sem user logado") });
  }, []);

  function login(event) {
    event.preventDefault();
    const promise = axios.post(`${import.meta.env.VITE_API_URL}/signin`, {
      email: email,
      password: pass,
    });
    promise
      .then((token) => {
        setRequest({ email, pass, token });
        localStorage.setItem("user", { email, password:pass });
        navigate("/home");
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <SignInContainer>
      <form onSubmit={login}>
        <MyWalletLogo />
        <input
          placeholder="E-mail"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Senha"
          type="password"
          autoComplete="new-password"
          required
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>

      <Link to="/cadastro">Primeira vez? Cadastre-se!</Link>
    </SignInContainer>
  );
}

const SignInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;