import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from "axios"
import { useState } from "react"

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [cpass, setCpass] = useState('');
  const navigate = useNavigate();

  function sgnup(event) {
    if (pass == cpass) {
      event.preventDefault();
      const promisse = axios.post(`${import.meta.env.VITE_API_URL}/signup`, {
        name: name,
        email: email,
        password: pass
      });
      promisse.then(() => { navigate("/"); });
      promisse.catch((res) => { alert(res) });
      
    }
    else {
      alert('As senhas devem ser iguais!')
    }
  }
  return (
    <SingUpContainer>
      <form onSubmit={sgnup}>
        <MyWalletLogo />

        <input placeholder="Nome" type="text" required value={name} onChange={(e) => setName(e.target.value)} data-test="name" />
        <input placeholder="E-mail" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} data-test="email" />
        <input placeholder="Senha" type="password" required value={pass} onChange={(e) => setPass(e.target.value)} data-test="password" />
        <input placeholder="Confirme a senha" type="password" required value={cpass} onChange={(e) => setCpass(e.target.value)} data-test="conf-password" />
        <button type="submit" data-test="sign-up-submit" >Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
