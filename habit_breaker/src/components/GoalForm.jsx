import { useState } from 'react'

export default function GoalForm({ onAddGoal }) {
  const [goalText, setGoalText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (goalText.trim()) {
      onAddGoal(goalText.trim())
      setGoalText('')
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="목표를 입력하세요 (예: 하루 10분 독서)"
        value={goalText}
        onChange={(e) => setGoalText(e.target.value)}
        style={{
          padding: '0.5rem',
          fontSize: '1rem',
          width: '70%',
          marginRight: '0.5rem',
        }}
      />
      <button type="submit" style={{ padding: '0.5rem 1rem' }}>
        등록
      </button>
    </form>
  )
}