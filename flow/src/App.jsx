import { useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";

import Draggable from "./components/draggable.jsx";
import Droppable from "./components/droppable.jsx";

function App() {
    const [cards, setCards] = useState([
        {
            id: "card-1",
            title: "Estudar React",
            description: "Aprender os conceitos básicos do React.",
            column: "todo",
        },
        {
            id: "card-2",
            title: "Aprender CSS",
            description: "Praticar Flexbox, Grid e estilização.",
            column: "todo",
        },
        {
            id: "card-3",
            title: "Criar layout",
            description: "Criar a interface inicial do projeto.",
            column: "doing",
        },
        {
            id: "card-4",
            title: "Finalizar projeto",
            description: "Revisar e finalizar o FlowBoard.",
            column: "done",
        },
    ]);

    function renderCards(columnId) {
        return cards
            .filter((card) => card.column === columnId)
            .map((card) => (
                <Draggable
                    key={card.id}
                    id={card.id}
                    title={card.title}
                    description={card.description}
                />
            ));
    }

    return (
        <DragDropProvider
            onDragEnd={(event) => {
                if (event.canceled) return;

                const { source, target } = event.operation;

                if (!target) return;

                setCards((currentCards) =>
                    currentCards.map((card) =>
                        card.id === source.id
                            ? {
                                ...card,
                                column: target.id,
                            }
                            : card
                    )
                );
            }}
        >
            <div
                style={{
                    display: "flex",
                    gap: "30px",
                    padding: "50px",
                    justifyContent: "center",
                    alignItems: "flex-start",
                }}
            >
                <Droppable
                    id="todo"
                    title="A FAZER"
                >
                    {renderCards("todo")}
                </Droppable>

                <Droppable
                    id="doing"
                    title="EM ANDAMENTO"
                >
                    {renderCards("doing")}
                </Droppable>

                <Droppable
                    id="done"
                    title="CONCLUÍDO"
                >
                    {renderCards("done")}
                </Droppable>
            </div>
        </DragDropProvider>
    );
}

export default App;