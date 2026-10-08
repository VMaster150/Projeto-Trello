import { useDroppable } from "@dnd-kit/react";

import "../styles/droppable.css";

function Droppable({ id, title, children, quantidade }) {
    const { ref } = useDroppable({ id });

    return (
        <div
            ref={ref}
            className="coluna"
        >
            <h2 className="titulo-coluna">
                <span>{title}</span>
                <span className="quantidade">{quantidade}</span>
            </h2>

            <div className="conteudo-coluna">
                {children || "Solte aqui"}
            </div>
        </div>
    );
}

export default Droppable;