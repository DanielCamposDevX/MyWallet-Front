import { Link } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from "axios"

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [cpass, setCpass] = useState('');

  function sgnup() {
    if (pass = cpass) {
      const promisse = axios.post(`${process.env.REACT_APP_API_URL}/signup`, {
        name: name,
        email: email,
        password: pass
      })
      .then(res => {})/// ir para inicio ///
      .catch(res => {alert(res)})
    }
    else {
      alert('As senhas devem ser iguais!')
    }
  }
  return (
    <SingUpContainer>
      <form>
        <MyWalletLogo />

        <input placeholder="Nome" type="text" required />
        <input placeholder="E-mail" type="email" required />
        <input placeholder="Senha" type="password" autocomplete="new-password" required />
        <input placeholder="Confirme a senha" type="password" autocomplete="new-password" required />
        <button>Cadastrar</button>
      </form>

      <Link>
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
