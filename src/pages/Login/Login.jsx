import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CiUser } from "react-icons/ci";
import { RiLockPasswordFill } from "react-icons/ri";
function Login() {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [User, setUser] = useState(null);
  const [nome, setNome] = useState("");

  async function Registering(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api-tasks-14gq.onrender.com/api/AuteticacaoUser/login",
        {
          EmailDoUsuario: Email,
          SenhaDoUsuario: Password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setUser(response.data.userId);
      setNome(response.data.nome);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("nome", response.data.nome);
      alert("Usuário logado com sucesso", response.data.userId);
      console.log("Usuário logado com sucesso:", response.data);
      navigate("/telaHome");
    } catch (error) {
      alert("Erro ao cadastrar usuário", error);
    }
  }

  return (
    <div className="loginPage">
      <div className="loginContainer">
        <div className="loginForm">
          <h1>Login</h1>
          <form onSubmit={Registering}>
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
