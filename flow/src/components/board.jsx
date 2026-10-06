import { DndContext } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './colunas.jsx'

function Board({ board, setBoard }) {
    function findColumnOfCard(cardId) {
        return board.columns.find((col) => col.cardIds.includes(cardId))
    }

    function handleDragOver(event) {
        const { active, over } = event
        if (!over) return

        const activeId = active.id
        const overId = over.id

        const sourceColumn = findColumnOfCard(activeId)
        if (!sourceColumn) return

        // "over" pode ser outro cartão ou a própria coluna (se ela estiver vazia)
        const destColumn =
            board.columns.find((col) => col.id === overId) || findColumnOfCard(overId)

        if (!destColumn || sourceColumn.id === destColumn.id) return

        setBoard((prev) => {
            const source = prev.columns.find((col) => col.id === sourceColumn.id)
            const dest = prev.columns.find((col) => col.id === destColumn.id)

            const sourceCardIds = source.cardIds.filter((id) => id !== activeId)
            const overIndex = dest.cardIds.indexOf(overId)
            const insertIndex = overIndex >= 0 ? overIndex : dest.cardIds.length
            const destCardIds = [...dest.cardIds]
            destCardIds.splice(insertIndex, 0, activeId)

            return {
                ...prev,
                columns: prev.columns.map((col) => {
                    if (col.id === source.id) return { ...col, cardIds: sourceCardIds }
                    if (col.id === dest.id) return { ...col, cardIds: destCardIds }
                    return col
                }),
            }
        })
    }

    function handleDragEnd(event) {
        const { active, over } = event
        if (!over) return

        const activeId = active.id
        const overId = over.id
        if (activeId === overId) return

        const column = findColumnOfCard(activeId)
        if (!column) return

        const oldIndex = column.cardIds.indexOf(activeId)
        const newIndex = column.cardIds.indexOf(overId)
        if (oldIndex === -1 || newIndex === -1) return

        setBoard((prev) => ({
            ...prev,
            columns: prev.columns.map((col) =>
                col.id === column.id
                    ? { ...col, cardIds: arrayMove(col.cardIds, oldIndex, newIndex) }
                    : col
            ),
        }))
    }

    return (
        <DndContext onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
            <div className="board">
                {board.columns.map((column) => (
                    <Column
                        key={column.id}
                        column={column}
                        cards={column.cardIds.map((id) => board.cards[id])}
                    />
                ))}
            </div>
        </DndContext>
    )
}

export default Board