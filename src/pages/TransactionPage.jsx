import { useState, useContext, useEffect } from "react"
import styled from "styled-components"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { RequestContext } from "../context/RequestContext";


export default function TransactionsPage() {
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const { request, setRequest } = useContext(RequestContext);
  const { tipo } = useParams();
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
        })
        .catch((error) => {
          navigate("/")
        });
    }
  }, []);


  function saveTransaction(event) {
    event.preventDefault();
    const config = {
      headers: {
        "Authorization": `Bearer ${request.token}`
      }
    };
    const data = {
      value,
      description,
      type: tipo
    }
    console.log(data);
    const promisse = axios.post(`${import.meta.env.VITE_API_URL}/transactions`, data, config);
    promisse.then(() => { navigate("/home") });
    promisse.catch((res) => { alert(res) });

  }

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={saveTransaction}>
        <input placeholder="Valor" type="text" required value={value} onChange={(e) => setValue(e.target.value)} data-test="registry-amount-input" />
        <input placeholder="Descrição" type="text" required value={description} onChange={(e) => setDescription(e.target.value)} data-test="registry-name-input" />
        <button type="submit" data-test="registry-save">Salvar TRANSAÇÃO</button>
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
