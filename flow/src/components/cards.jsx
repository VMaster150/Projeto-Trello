import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function cards({ card }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: card.id,
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div ref={setNodeRef} style={style} className="card" {...attributes} {...listeners}>
            {card.text}
        </div>
    )
}

export default cards