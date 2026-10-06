import { useState } from 'react'
import Board from './components/board.jsx'
import './App.css'

function App() {
  const [board, setBoard] = useState({
    columns: [
      { id: 'col-1', title: 'A fazer', cardIds: ['card-1', 'card-2'] },
      { id: 'col-2', title: 'Em andamento', cardIds: [] },
      { id: 'col-3', title: 'Concluído', cardIds: [] },
    ],
    cards: {
      'card-1': { id: 'card-1', text: 'Primeira tarefa' },
      'card-2': { id: 'card-2', text: 'Segunda tarefa' },
    },
  })

  return (
      <div className="app">
        <h1>Quadro de Tarefas</h1>
        <Board board={board} setBoard={setBoard} />
      </div>
  )
}

export default App