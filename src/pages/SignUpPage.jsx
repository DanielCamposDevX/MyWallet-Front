import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from "axios"

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [cpass, setCpass] = useState('');
  const navigate = useNavigate();

  function sgnup() {
    if (pass == cpass) {
      const promisse = axios.post(`${process.env.REACT_APP_API_URL}/signup`, {
        name: name,
        email: email,
        password: pass
      })
      promisse.then(res => { navigate("/") })
        .catch(res => { alert(res) })
    }
    else {
      alert('As senhas devem ser iguais!')
    }
  }
  return (
    <SingUpContainer>
      <form onSubmit={sgnup}>
        <MyWalletLogo />

        <input placeholder="Nome" type="text" required value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="E-mail" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Senha" type="password" autocomplete="new-password" required value={pass} onChange={(e) => setPass(e.target.value)} />
        <input placeholder="Confirme a senha" type="password" autocomplete="new-password" required value={cpass} onChange={(e) => setCpass(e.target.value)} />
        <button type="submit">Cadastrar</button>
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
