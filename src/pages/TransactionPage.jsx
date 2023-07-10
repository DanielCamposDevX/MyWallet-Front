import { useState } from "react"
import styled from "styled-components"
import axios from "axios";


export default function TransactionsPage() {
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState(''); //// Arrumar um jeito de descobrir o tipo
  const { request } = useContext(RequestContext);

  function saveTransaction() {
    const config = {
      headers: {
        "Authorization": `Bearer ${request.token}`
      },
      body: {
        value,
        description,
        type
      }
    };
    const promisse = axios.post(`${import.meta.env.VITE_API_URL}/transactions`, config);
    promisse.then({});//// Fazer algo ao postar
    promisse.catch((res) => { alert(error) });

  }

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form>
        <input placeholder="Valor" type="text" />
        <input placeholder="Descrição" type="text" />
        <button onClick={saveTransaction}>Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
