import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { RiLockPasswordFill } from "react-icons/ri";
function Login() {
  return (
    <div className="loginPage">
      <div className="loginContainer">
        <div className="loginForm">
          <h1>Login</h1>
          <form>
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
          <h2>Bem vindo De Volta!!!</h2>
          <img
            src="img/grammar correction-rafiki.png"
            alt="Imagem De Login"
            width={300}
            height={300}
          />
          <p>
            Não tem Cadastro ? <Link to="/cadastro">Cadastre-se</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
