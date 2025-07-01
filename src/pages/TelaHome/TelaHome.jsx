import React from "react";
import "./TelaHome.css";
import { IoIosAddCircle } from "react-icons/io";
import { IoTrashBinOutline } from "react-icons/io5";
function TelaHome() {
  return (
    <>
      <div className="TelaHome">
        <nav>
          <p>Boa noite Fellype,Planeje seu dia</p>
        </nav>
        <section>
          <div className="TaskList">
            <p className="Title">Adicione suas tarefas Diarias</p>
            <div className="TaskItem">
              <div className="Task">
                <p>Academia</p>
                <button>
                  <IoTrashBinOutline size={20} />
                </button>
              </div>
              <div className="Task">
                <p>Estudar</p>
                <button>
                  <IoTrashBinOutline size={20} />
                </button>
              </div>
              <div className="Task">
                <p>Ingles</p>
                <button>
                  <IoTrashBinOutline size={20} />
                </button>
              </div>
            </div>
            <div className="AddingTask">
              <input type="text" />
              <button>
                <IoIosAddCircle size={20} />
              </button>
            </div>
          </div>
          <div className="CreateTask">
            <p className="Title">Crie Sua Tarefa Aqui</p>
            <button>Criar</button>
          </div>
        </section>
      </div>
    </>
  );
}

export default TelaHome;
