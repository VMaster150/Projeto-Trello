import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import Card from './cards.jsx'

function colunas({ column, cards }) {
    return (
        <div className="column">
            <h2>{column.title}</h2>
            <div className="column-cards">
                <SortableContext items={column.cardIds} strategy={verticalListSortingStrategy}>
                    {cards.map((card) => (
                        <Card key={card.id} card={card} />
                    ))}
                </SortableContext>
            </div>
        </div>
    )
}

export default colunas