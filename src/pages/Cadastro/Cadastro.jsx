import { useState } from "react";
import axios from "axios";
import "../Login/Login.css";
import { Link, useNavigate } from "react-router-dom";

import { CiUser } from "react-icons/ci";
import { RiLockPasswordFill } from "react-icons/ri";
function Cadastro() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [User, setUser] = useState("");
  const navigate = useNavigate();
  async function RegisterUser(e) {
    e.preventDefault();
    try {
      if (Email === "" || Password === "" || User === "") {
        alert("Preencha todos os campos");
        return;
      }
      const response = await axios.post(
        "https://my-task-list-ten.vercel.app/api/AuteticacaoUser/register",
        {
          email: Email,
          password: Password,
          nameUser: User,
          
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Usuário cadastrado com sucesso");
      console.log("Usuário cadastrado com sucesso:", response.data);
      navigate("/");
    } catch (error) {
      alert("Erro ao cadastrar usuário");
      console.error("Erro ao cadastrar usuário:", error);
    }
  }
  return (
    <div className="loginPage">
      <div className="loginContainer">
        <div className="loginForm">
          <h1>Cadastro</h1>
          <form onSubmit={RegisterUser}>
            <div className="loginInput">
              <label htmlFor="nome">Seu Nome</label>
              <input
                type="text"
                name="nome"
                id="nome"
                onChange={(e) => setUser(e.target.value)}
              />
              <CiUser className="InputIcon" size={20} />
            </div>
            <div className="loginInput">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <CiUser className="InputIcon" size={20} />
            </div>
            <div className="loginInput">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <RiLockPasswordFill className="InputIcon" size={20} />
            </div>
            <button>Entrar</button>
          </form>
        </div>
        <div className="LoginMensagem">
          <h2>Liste Suas Tarefas</h2>
          <img
            src="img/Consent-rafiki.png"
            alt="Imagem De Login"
            width={300}
            height={300}
          />
          <p>
            Ja tem Cadastro ? <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
