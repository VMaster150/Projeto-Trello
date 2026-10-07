import {useState} from "react";
import { DragDropProvider } from "@dnd-kit/react";

import Draggable from "./components/draggable.jsx";
import Droppable from "./components/droppable.jsx";

function App() {
    const [isDropped, setIsDropped] = useState(false);


    return (
        <DragDropProvider
            onDragEnd={(event) => {
                if (event.canceled) return;

                const {target} = event.operation;

                setIsDropped(target?.id === "droppable");
        }}>

            <div
                style={{
                    display: "flex",
                    gap: "50px",
                    padding: "50px",
                }}
            >
                {!isDropped && <Draggable />}

                <Droppable id="droppable">
                    {isDropped && <Draggable />}
                </Droppable>
            </div>
        </DragDropProvider>
    );
}

export default App;