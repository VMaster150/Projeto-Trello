import { useState, useEffect } from "react";
import { DragDropProvider } from "@dnd-kit/react";

import Draggable from "./components/draggable.jsx";
import Droppable from "./components/droppable.jsx";
import ListaTarefas from "./components/listaTarefas.jsx";
import "./styles/App.css"
import Navbar from "./components/navbar.jsx";

function App() {
    const [cards, setCards] = useState(() => {
        const cardsSalvos = localStorage.getItem("flow-cards");

        if (cardsSalvos) {
            return JSON.parse(cardsSalvos);
        }

         return [];


    });


    function resetarQuadro() {
        localStorage.removeItem("flow-cards");
        localStorage.removeItem("flow-colunas");

        setCards([])

        setColumns([
            { id: "todo", title: "Iniciar" },
            { id: "doing", title: "Em Andamento" },
            { id: "done", title: "Concluído" },
        ]);
    }

    // =========================
    // COLUNAS
    // =========================

    const [columns, setColumns] = useState(() => {
        const salvarColunas = localStorage.getItem("flow-colunas")

            if (salvarColunas) {
                return JSON.parse(salvarColunas)
            }

            return [
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
                ]
    });

    // =========================
    // LOCAL STORAGE DOS CARDS
    // =========================

    useEffect(() => {
        localStorage.setItem("flow-cards", JSON.stringify(cards));
    }, [cards]);

    useEffect(() => {
        localStorage.setItem("flow-colunas", JSON.stringify(columns));
    }, [columns]);

    // =========================
    // ESTADOS DOS CARDS
    // =========================

    const [newCardTitle, setNewCardTitle] = useState("");
    const [newCardDescription, setNewCardDescription] = useState("");
    const [newCardPriority, setNewCardPriority] = useState("baixa");
    const [newCardDueDate, setNewCardDueDate] = useState("");
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
            priority: newCardPriority,
            dueDate: newCardDueDate,
            column: "todo",

        };

        setCards((currentCards) => [
            ...currentCards,
            newCard,
        ]);

        setNewCardTitle("");
        setNewCardDescription("");
        setNewCardPriority("baixa");
        setNewCardDueDate("");
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
                    priority={card.priority}
                    dueDate={card.dueDate}
                    onDelete={() => deletar(card.id)}
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
            <Navbar onReset={resetarQuadro} />


            {/*div das colunas*/}
            <div className="quadro">
                {columns.map((column) => (
                    <Droppable
                        key={column.id}
                        id={column.id}
                        title={column.title}
                        quantidade={
                            cards.filter(
                                (card) => card.column === column.id
                            ).length
                        }
                    >
                        {renderCards(column.id)}

                        {/* FORMULÁRIO DE NOVO CARD */}
                        {column.id === "todo" && (
                            !isAddingCard ? (
                                <button
                                    className="botao-adicionar-card"
                                    onClick={() => setIsAddingCard(true)}

                                >
                                    + Adicionar card
                                </button>
                            ) : (
                                <div className="formulario-card">

                                    <input
                                        type="text"
                                        className="campo-card"
                                        placeholder="Título do card"
                                        value={newCardTitle}
                                        onChange={(event) =>
                                            setNewCardTitle(event.target.value)
                                        }
                                    />

                                    <input
                                        type="text"
                                        className="campo-card"
                                        placeholder="Descrição do card"
                                        value={newCardDescription}
                                        onChange={(event) =>
                                            setNewCardDescription(event.target.value)
                                        }
                                    />

                                    {/*definir a prioridade*/}
                                    <select
                                        className="campo-card"
                                        value={newCardPriority}
                                        onChange={(event) =>
                                            setNewCardPriority(event.target.value)
                                        }
                                    >
                                        <option value="baixa">Prioridade baixa</option>
                                        <option value="media">Prioridade média</option>
                                        <option value="alta">Prioridade alta</option>
                                    </select>
                                    {/*escolher a data*/}
                                    <input
                                        type="date"
                                        className="campo-card"
                                        value={newCardDueDate}
                                        onChange={(event) =>
                                            setNewCardDueDate(event.target.value)
                                        }
                                    />

                                    <div className="botoes-formulario">

                                        <button
                                            className="botao-confirmar"
                                            onClick={addCard}
                                        >
                                            Adicionar
                                        </button>

                                        <button
                                            className="botao-cancelar"
                                            onClick={() => {
                                                setIsAddingCard(false);
                                                setNewCardTitle("");
                                                setNewCardDescription("");
                                                setNewCardPriority("baixa");
                                                setNewCardDueDate("")
                                            }}
                                        >
                                            Cancelar
                                        </button>

                                    </div>

                                </div>
                            )
                        )}
                    </Droppable>
                ))}


                {/*Adicionar nova coluna*/}
                {!isAddingColumn ? (
                    <button
                        className="botao-adicionar-coluna"
                        onClick={() => setIsAddingColumn(true)}
                    >
                        + Adicionar lista
                    </button>
                ) : (
                    <div className="formulario-coluna">
                        <input
                            type="text"
                            placeholder="Nome da lista"
                            value={newColumnTitle}
                            onChange={(event) =>
                                setNewColumnTitle(event.target.value)
                            }
                        />

                        <div className="botoes-coluna">
                            <button
                                className="botao-confirmar"
                                onClick={addColumn}
                            >
                                Adicionar
                            </button>
                            <button
                                className="botao-cancelar"
                                onClick={() => {
                                    setIsAddingColumn(false);
                                    setNewColumnTitle("");
                                }}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                )}

            </div>

            <ListaTarefas
                cards={cards}
                columns={columns}
            />
        </DragDropProvider>
    );
}

export default App;