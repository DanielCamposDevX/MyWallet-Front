import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { RequestContext } from "../context/RequestContext";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const { request, setRequest } = useContext(RequestContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedPass = localStorage.getItem("passc");

    if (storedUser && storedPass) {
      const promise = axios.post(`${import.meta.env.VITE_API_URL}/signin`, {
        email: storedUser,
        password: storedPass,
      });
      promise
        .then((response) => {
          const token = response.data;
          setRequest({ token });
          navigate("/home");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  async function login(event) {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/signin`,
        {
          email: email,
          password: pass,
        }
      );
      const token = response.data.token;
      setRequest({ token });
      const username = response.data.name
      localStorage.setItem("user", email);
      localStorage.setItem("passc", pass);
      localStorage.setItem("name", username);
      navigate("/home");
    } catch (error) {
      alert(error);
    }
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
          data-test="email"
        />
        <input
          placeholder="Senha"
          type="password"
          autoComplete="new-password"
          required
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          data-test="password"
        />
        <button type="submit" data-test="sign-in-submit">Entrar</button>
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