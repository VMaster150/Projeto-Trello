import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import Card from './cards.jsx'

function Column({ column, cards }) {
    const { setNodeRef } = useDroppable({ id: column.id })

    return (
        <div className="column">
            <h2>{column.title}</h2>
            <div ref={setNodeRef} className="column-cards">
                <SortableContext items={column.cardIds} strategy={verticalListSortingStrategy}>
                    {cards.map((card) => (
                        <Card key={card.id} card={card} />
                    ))}
                </SortableContext>
            </div>
        </div>
    )
}

export default Column