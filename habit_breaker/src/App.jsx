import { useState, useEffect } from 'react'
import GoalForm from './components/GoalForm'

function App() {
  const [goals, setGoals] = useState([])

  useEffect(() => {
    const saved=localStorage.getItem('goals')
    if (saved) {
      setGoals(JSON.parse(saved))
    }
  })

  const handleAddGoal = (text) => {
    const updated=[...goals, {text, completed: false}]
    setGoals(updated)
    localStorage.setItem('goals', JSON.stringify(updated))  
  }

  const toggleGoal=(idx)=>{
    const updated=goals.map((goal, i)=>
    i=== idx ? {...goal, completed: !goal.completed} : goal)
    setGoals(updated)
    localStorage.setItem('goals', JSON.stringify(updated))  
  }

  const deleteGoal=(idx)=>{
    const updated=goals.filter((_, i) => i !== idx)
    setGoals(updated)
    localStorage.setItem('goals', JSON.stringify(updated))
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto'}}>
      <h1>🔥 작심삼일 돌파 웹앱</h1>
      <GoalForm onAddGoal={handleAddGoal} />
      <ul style={{listStyle: 'none', paddingLeft: 0}}>
        {goals.map((goal, idx)=>(
          <li key={idx} style={{marginBottom: '0.75rem', display: 'flex', alignItems: 'center'}}>
            <label style={{cursor: 'pointer', flexGrow: 1}}>
              <input
                type="checkbox"
                checked={goal.completed}
                onChange={() => toggleGoal(idx)}
                style={{marginRight: '0.5rem'}}
                />
                <span style={{textDecoration: goal.completed ? 'line-through' : 'none'}}>
                  {goal.text}
                </span>
            </label>
            <button onClick={()=> deleteGoal(idx)} style={{marginLeft: '0.5rem'}}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App