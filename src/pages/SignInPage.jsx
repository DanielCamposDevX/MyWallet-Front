import styled from "styled-components"
import { Link } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState, useEffect } from "react"
import axios from "axios"



export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');


  function login() {
    const promisse = axios.post(`${process.env.REACT_APP_API_URL}/signin`,{
      email:email,
      password:pass
    });
    promisse.then((token) => { const token = token });//Utilizar ContextAPI, e go to home//
    promisse.catch((error) => { alert(error) });// Colocar erro// 
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
