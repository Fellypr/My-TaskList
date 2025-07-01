import React from "react";
import "../Login/Login.css";
import { Link } from "react-router-dom";

import { CiUser } from "react-icons/ci";
import { RiLockPasswordFill } from "react-icons/ri";
function Cadastro() {
  return (
    <div className="loginPage">
      <div className="loginContainer">
        <div className="loginForm">
          <h1>Cadastro</h1>
          <form>
            <div className="loginInput">
              <label htmlFor="nome">Seu Nome</label>
              <input type="email" name="nome" id="nome" />
              <CiUser className="InputIcon" size={20}/>
            </div>
            <div className="loginInput">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" />
              <CiUser className="InputIcon" size={20}/>
            </div>
            <div className="loginInput">
              <label htmlFor="password">Senha</label>
              <input type="password" name="password" id="password" />
              <RiLockPasswordFill className="InputIcon" size={20}/>
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
