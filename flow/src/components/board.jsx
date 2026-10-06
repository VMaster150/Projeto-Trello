import { DndContext } from '@dnd-kit/core'
import Column from './colunas.jsx'

function Board({ board, setBoard }) {
    function handleDragEnd(event) {
        console.log('arrastou:', event.active.id, '-> soltou em:', event.over?.id)
    }

    return (
        <DndContext onDragEnd={handleDragEnd}>
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