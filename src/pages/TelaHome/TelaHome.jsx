import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TelaHome.css";
import { IoIosAddCircle } from "react-icons/io";
import { IoTrashBinOutline } from "react-icons/io5";

function TelaHome() {
  const [novaTarefa, setNovaTarefa] = useState("");
  const [tarefas, setTarefas] = useState([]);
  const [DataTarefa, setDataTarefa] = useState("");
  const [Tarefa, setTarefa] = useState("");
  const [rotina, setRotina] = useState({});
  const nome = localStorage.getItem("nome");
  const userId = localStorage.getItem("userId");

  async function criarTarefa() {
    if (!novaTarefa.trim()) {
      alert("Digite uma tarefa!");
      return;
    }

    try {
      await axios.post("http://localhost:5164/api/Tasks/CriarTask", {
        id: userId,
        task: novaTarefa,
      });

      alert("Tarefa criada com sucesso!");
      setNovaTarefa("");
      BuscaTarefa();
    } catch (error) {
      alert("Erro ao criar tarefa. Por favor, tente novamente." + error);
    }
  }

  async function BuscaTarefa() {
    try {
      const response = await axios.get(
        `http://localhost:5164/api/Tasks/ListarTask/${userId}`
      );
      setTarefas(response.data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  }

  useEffect(() => {
    BuscaTarefa();
    GetRotinas();
  }, []);

  async function DeleteTask(id) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta tarefa?"
    );
    if (!confirmar) return;

    try {
      await axios.delete(`http://localhost:5164/api/Tasks/DeletarTask/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      BuscaTarefa();
      
    } catch (error) {
      
      console.error("Erro ao deletar tarefa:", error);
    }
  }
  async function DeleteRoutine(id) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir essa rotina?"
    );
    if (!confirmar) return;

    try {
      await axios.delete(`http://localhost:5164/api/Tasks/DeletarRotina/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      BuscaTarefa();
    } catch (error) {
      
      console.error("Erro ao deletar tarefa:", error);
    }
  } 

  async function CreatingRoutine() {
    if (!Tarefa.trim() || !DataTarefa.trim()) {
      alert("Preencha todos os campos!");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:5164/api/Tasks/CompletarTask/${userId}`,
        {
          NameTask: Tarefa,
          DateTask: DataTarefa,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Rotina criada com sucesso!");
      setDataTarefa("");
      setTarefa("");
      GetRotinas();
    } catch (error) {
      alert("Erro ao criar rotina. Por favor, tente novamente.");
      console.error("Erro ao criar rotina:", error);
    }
  }
  

  async function GetRotinas() {
    try {
      const response = await axios.get(
        `http://localhost:5164/api/Tasks/ListarRotina/${userId}`
      );

      const agrupado = {};
      response.data.forEach((item) => {
        const data = new Date(item.dateTask);
        const diaSemana = data.toLocaleDateString("pt-BR", {
          weekday: "long",  
        });

        if (!agrupado[diaSemana]) {
          agrupado[diaSemana] = [];
        }
        agrupado[diaSemana].push(item.nameTask);
      });

      setRotina(agrupado);
      
    } catch (error) {
      console.error("Erro ao buscar rotinas:", error);
    }
  }

  function HoraDodia() {
    const data = new Date();
    const hora = data.getHours();
    if (hora >= 0 && hora < 12) return "🌅 Bom dia";
    if (hora >= 12 && hora < 18) return "🌇 Boa tarde";
    return "🌙 Boa noite";
  }

  return (
    <div className="TelaHome">
      <nav>
        <p>
          {HoraDodia()} {nome}, planeje seu dia
        </p>
      </nav>

      <section>
        <div className="TaskList">
          <p className="Title">Adicione suas tarefas diárias</p>

          <div className="TaskItem">
            {tarefas.map((tarefa, index) => (
              <div className="Task" key={index}>
                <p>{tarefa.task}</p>
                <button onClick={() => DeleteTask(tarefa.id)}>
                  <IoTrashBinOutline size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="AddingTask">
            <input
              type="text"
              placeholder="Digite sua tarefa"
              value={novaTarefa}
              onChange={(e) => setNovaTarefa(e.target.value)}
            />
            <button onClick={criarTarefa}>
              <IoIosAddCircle size={24} />
            </button>
          </div>
        </div>

        <div className="CreateTask">
          <p className="Title">Crie sua Rotina Aqui</p>
          <div className="Options">
            <input
              type="date"
              value={DataTarefa}
              onChange={(e) => setDataTarefa(e.target.value)}
            />
            <select value={Tarefa} onChange={(e) => setTarefa(e.target.value)}>
              <option value="">Selecione</option>
              {tarefas.map((tarefa, index) => (
                <option key={index} value={tarefa.task}>
                  {tarefa.task}
                </option>
              ))}
            </select>
          </div>
          <button onClick={CreatingRoutine}>Criar</button>
        </div>

        <div className="completeTask">
          <p className="Title">Suas Rotinas</p>

          <div className="taskHistory">
            {Object.entries(rotina).map(([dia, tarefasDoDia], index) => (
              <div className="checklist-container" key={index}>
                
                <div className="checklist-title">
                  {dia.charAt(0).toUpperCase() + dia.slice(1)}
                </div>
                {tarefasDoDia.map((tarefa, idx) => (
                  <div className="checklist-item" key={idx}>
                    <input
                      type="checkbox"
                      id={`rotina-${index}-${idx}`}
                      className="checklist-checkbox"
                    />
                    <label
                      htmlFor={`rotina-${index}-${idx}`}
                      className="checklist-label"
                    >
                      {tarefa}
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default TelaHome;
