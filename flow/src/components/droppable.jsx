import { useDroppable } from "@dnd-kit/react";

function Droppable({ id,titulo, children }) {
    const { ref } = useDroppable({
        id,
    });

    return (
        <div
            ref={ref}
            style={{
                width: "300px",
                height: "300px",
                border: "3px #888",
                backgroundColor: "#f0f0f0",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <h2
                style={{
                    color: "#222",
                    marginTop: 0,
                    textAlign: "center",
                }}
            >
                {titulo}
            </h2>

            <div
                style={{minHeight: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",}}
                >
                {children || "Solte aqui"}

            </div>
        </div>
    );
}

export default Droppable;