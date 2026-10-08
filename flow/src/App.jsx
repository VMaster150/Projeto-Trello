import { useState, useEffect } from "react";
import { DragDropProvider } from "@dnd-kit/react";

import Draggable from "./components/draggable.jsx";
import Droppable from "./components/droppable.jsx";

import "./styles/App.css"

function App() {
    const [cards, setCards] = useState(() => {
        const cardsSalvos = localStorage.getItem("flow-cards");

        if (cardsSalvos) {
            return JSON.parse(cardsSalvos);
        }

        return [
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
        ];
    });

    // =========================
    // COLUNAS
    // =========================

    const [columns, setColumns] = useState([
        {
            id: "todo",
            title: "Iniciar",
        },
        {
            id: "doing",
            title: "Em Andamento",
        },
        {
            id: "done",
            title: "Concluído",
        },
    ]);

    // =========================
    // LOCAL STORAGE DOS CARDS
    // =========================

    useEffect(() => {
        localStorage.setItem("flow-cards", JSON.stringify(cards));
    }, [cards]);

    // =========================
    // ESTADOS DOS CARDS
    // =========================

    const [newCardTitle, setNewCardTitle] = useState("");
    const [newCardDescription, setNewCardDescription] = useState("");
    const [isAddingCard, setIsAddingCard] = useState(false);

    // =========================
    // ESTADOS DAS COLUNAS
    // =========================

    const [newColumnTitle, setNewColumnTitle] = useState("");
    const [isAddingColumn, setIsAddingColumn] = useState(false);

    // =========================
    // ADICIONAR CARD
    // =========================

    function addCard() {
        if (!newCardTitle.trim()) return;

        const newCard = {
            id: `card-${Date.now()}`,
            title: newCardTitle,
            description: newCardDescription,
            column: "todo",
        };

        setCards((currentCards) => [
            ...currentCards,
            newCard,
        ]);

        setNewCardTitle("");
        setNewCardDescription("");
        setIsAddingCard(false);
    }

    // =========================
    // ADICIONAR COLUNA
    // =========================

    function addColumn() {
        if (!newColumnTitle.trim()) return;

        const newColumn = {
            id: `column-${Date.now()}`,
            title: newColumnTitle,
        };

        setColumns((currentColumns) => [
            ...currentColumns,
            newColumn,
        ]);

        setNewColumnTitle("");
        setIsAddingColumn(false);
    }

    // =========================
    // DELETAR CARD
    // =========================

    function deletar(cardId) {
        setCards((currentCards) =>
            currentCards.filter((card) => card.id !== cardId)
        );
    }

    // =========================
    // RENDERIZAR CARDS
    // =========================

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

    // =========================
    // INTERFACE
    // =========================

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
            {/*div das colunas*/}
            <div className="quadro">

                {/*parte das coluna*/}

                {columns.map((column) => (
                    <Droppable
                        key={column.id}
                        id={column.id}
                        title={column.title}
                    >
                        {renderCards(column.id)}

                        {/* FORMULÁRIO DE NOVO CARD */}
                        {column.id === "todo" && (
                            !isAddingCard ? (
                                <button
                                    onClick={() => setIsAddingCard(true)}
                                    style={{
                                        width: "100%",
                                        padding: "12px",
                                        marginTop: "15px",
                                        border: "none",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                    }}
                                >
                                    + Adicionar card
                                </button>
                            ) : (
                                <div style={{ marginTop: "15px" }}>

                                    <input
                                        type="text"
                                        placeholder="Título do card"
                                        value={newCardTitle}
                                        onChange={(event) =>
                                            setNewCardTitle(event.target.value)
                                        }
                                        style={{
                                            width: "100%",
                                            padding: "10px",
                                            boxSizing: "border-box",
                                            marginBottom: "8px",
                                        }}
                                    />

                                    <input
                                        type="text"
                                        placeholder="Descrição do card"
                                        value={newCardDescription}
                                        onChange={(event) =>
                                            setNewCardDescription(
                                                event.target.value
                                            )
                                        }
                                        style={{
                                            width: "100%",
                                            padding: "10px",
                                            boxSizing: "border-box",
                                            marginBottom: "8px",
                                        }}
                                    />

                                    <button onClick={addCard}>
                                        Adicionar
                                    </button>

                                    <button
                                        onClick={() => {
                                            setIsAddingCard(false);
                                            setNewCardTitle("");
                                            setNewCardDescription("");
                                        }}
                                    >
                                        Cancelar
                                    </button>

                                </div>
                            )
                        )}
                    </Droppable>
                ))}


                {/*Adicionar nova coluna*/}
                {!isAddingColumn ? (
                    <button
                        onClick={() => setIsAddingColumn(true)}
                        style={{
                            minWidth: "150px",
                            height: "60px",
                            border: "none",
                            borderRadius: "10px",
                            cursor: "pointer",
                        }}
                    >
                        + Adicionar lista
                    </button>
                ) : (
                    <div>
                        <input
                            type="text"
                            placeholder="Nome da lista"
                            value={newColumnTitle}
                            onChange={(event) =>
                                setNewColumnTitle(event.target.value)
                            }
                        />

                        <button onClick={addColumn}>
                            Adicionar
                        </button>

                        <button
                            onClick={() => {
                                setIsAddingColumn(false);
                                setNewColumnTitle("");
                            }}
                        >
                            Cancelar
                        </button>
                    </div>
                )}

            </div>
        </DragDropProvider>
    );
}

export default App;