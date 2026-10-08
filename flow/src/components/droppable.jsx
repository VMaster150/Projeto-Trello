import { useDroppable } from "@dnd-kit/react";

import "../styles/droppable.css";

function Droppable({ id, title, children }) {
    const { ref } = useDroppable({ id });

    return (
        <div
            ref={ref}
            className="coluna"
        >
            <h2 className="titulo-coluna">
                {title}
            </h2>

            <div className="conteudo-coluna">
                {children || "Solte aqui"}
            </div>
        </div>
    );
}

export default Droppable;