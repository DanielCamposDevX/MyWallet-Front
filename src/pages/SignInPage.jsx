import styled from "styled-components"
import { Link } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { RequestContext } from "../context/RequestContext"



export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const { request, setRequest } = useContext(RequestContext);


  function login() {
    () => {
      const promisse = axios.post(`${import.meta.env.VITE_API_URL}/signin`, {
        email: email,
        password: pass
      });
      promisse.then((token) => { console.log(token) });//Utilizar ContextAPI, e go to home//
      promisse.catch((error) => { alert(error) });// Colocar erro// 
    }
  }

  return (
    <SingInContainer>
      <form onSubmit={login()}>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" required value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Senha" type="password" autocomplete="new-password" required value={pass} onChange={e => setPass(e.target.value)} />
        <button type="submit">Entrar</button>
      </form>

      <Link>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
