import { useDraggable } from "@dnd-kit/react";

function Draggable({ id, title, description }) {
    const { ref, transform } = useDraggable({
        id,
    });

    const style = {
        width: "220px",
        backgroundColor: "white",
        color: "#222",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "15px",
        cursor: "grab",
        textAlign: "left",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",

        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
    };

    return (
        <button ref={ref} style={style}>
            <strong
                style={{
                    display: "block",
                    fontSize: "16px",
                    marginBottom: "8px",
                }}
            >
                {title}
            </strong>

            <span
                style={{
                    display: "block",
                    fontSize: "13px",
                    color: "#666",
                }}
            >
                {description}
            </span>
        </button>
    );
}

export default Draggable;