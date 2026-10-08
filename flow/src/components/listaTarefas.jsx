import { useState} from "react";
import "../styles/listaTarefas.css";

function ListaTarefas({ cards, columns }) {
    const [filtroSituacao, setFiltroSituacao] = useState("todas");

    function encontrarColuna(columnId) {
        const coluna = columns.find(
            (column) => column.id === columnId
        );

        return coluna ? coluna.title : "Sem coluna";
    }

    const tarefasFiltradas = cards.filter((card) => {
        if (filtroSituacao === "todas") {
            return true;
        }

        return card.column === filtroSituacao;
    });

    return (
        <section className="lista-tarefas">
            <div className="cabecalho-lista-tarefas">
                <h2>Todas as tarefas</h2>

                <select
                    className="filtro-situacao"
                    value={filtroSituacao}
                    onChange={(event) =>
                        setFiltroSituacao(event.target.value)
                    }
                >
                    <option value="todas">Todas</option>

                    {columns.map((column) => (
                        <option
                            key={column.id}
                            value={column.id}
                        >
                            {column.title}
                        </option>
                    ))}
                </select>
            </div>

            <div className="tarefas-tabela">
                {tarefasFiltradas.map((card) => (
                    <div
                        className="tarefa-item"
                        key={card.id}
                    >
                        <span className="tarefa-titulo">
                            {card.title}
                        </span>

                        <span className="tarefa-prioridade">
                            {card.priority}
                        </span>

                        <span className="tarefa-prazo">
                            {card.dueDate || "Sem prazo"}
                        </span>

                        <span className="tarefa-status">
                            {encontrarColuna(card.column)}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ListaTarefas;