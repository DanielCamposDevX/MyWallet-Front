import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useNavigate } from "react-router-dom";
import { RequestContext } from "../context/RequestContext";
import { useEffect, useState, useContext } from "react";
import axios from "axios";

export default function HomePage() {
  const { request } = useContext(RequestContext);
  const navigate = useNavigate();
  const [transac, setTransac] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        "authorization": `Bearer ${request.token}`
      }
    }
    const response = axios.get(`${import.meta.env.VITE_API_URL}/transactions`, config)
    response.then(() => { console.log(response) })
    response.catch(() => { alert(error) })
  }, []);

  function exit() {
    localStorage.removeItem("user");
    localStorage.removeItem("passc");
    navigate("/");
    const config = {
      headers: {
        "authorization": `Bearer ${request.token}`
      }
    }
    axios.post(`${import.meta.env.VITE_API_URL}/logoff`, {},config)
  }
  return (
    <HomeContainer>
      <Header>
        <h1>Olá, Fulano</h1>
        <BiExit onClick={exit} data-test="logout" />
      </Header>

      <TransactionsContainer>
        <ul>
          {transac && transac.map((data) => (
            <ListItemContainer>
              <div>
                <span>{data.date}</span>
                <strong>{data.description}</strong>
              </div>
              <Value color={data.type}>{data.value}</Value>
            </ListItemContainer>
          ))}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={"positivo"}>2880,00</Value>
        </article>
      </TransactionsContainer>

      <ButtonsContainer>
        <button>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "in" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`