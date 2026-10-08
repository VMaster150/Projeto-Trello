import { useDraggable } from "@dnd-kit/react";

import "../styles/draggable.css";

function Draggable({
                       id,
                       title,
                       description,
                       priority,
                        dueDate,
                       onDelete,
                   }) {
    const { ref, transform } = useDraggable({
        id,
    });

    return (
        <div
            ref={ref}
            className="card"
            style={{
                transform: transform
                    ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
                    : undefined,
            }}
        >
            <div className="destaque-card" />

            <strong className="titulo-card">
                {title}
            </strong>

            <span className="descricao-card">
                {description}
            </span>

            <div className="informacoes-card">

                <span className={`prioridade-card prioridade-${priority}`}>
                    {priority === "alta" && "🔴 Alta"}
                    {priority === "media" && "🟡 Média"}
                    {priority === "baixa" && "🟢 Baixa"}
                </span>

                {dueDate && (
                    <span className="prazo-card">
                        📅 {dueDate}
                    </span>
                )}

            </div>




            {onDelete && (
                <button
                    className="deletar-card"
                    onClick={(event) => {
                        event.stopPropagation();
                        onDelete();
                    }}
                    title="Excluir card"
                >
                    🗑️
                </button>
            )}
        </div>
    );
}

export default Draggable;