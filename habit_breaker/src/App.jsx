import { useState, useEffect } from 'react';
import GoalForm from './components/GoalForm';
import WeeklyTracker from './components/WeeklyTracker';

function App() {
  const [goals, setGoals] = useState([]);
  const [trackers, setTrackers] = useState([]);

  useEffect(() => {
    const savedGoals=localStorage.getItem('goals');
    const savedTrackers=localStorage.getItem('trackers');
    if (savedGoals) setGoals(JSON.parse(savedGoals));
    if (savedTrackers) setTrackers(JSON.parse(savedTrackers));
  }, []);

  const handleAddGoal = (text) => {
    const updated=[...goals, {text, completed: false}];
    setGoals(updated);
    localStorage.setItem('goals', JSON.stringify(updated));
  };

  const toggleGoal=(idx)=>{
    const updated=goals.map((goal, i)=>
    i=== idx ? {...goal, completed: !goal.completed} : goal
  );
  setGoals(updated);
  localStorage.setItem('goals', JSON.stringify(updated));
  };

  // 주간 트래커용 핸들러
  const handleAddTracker=(newTracker)=>{
    const updated=[...trackers, newTracker];
    setTrackers(updated);
    localStorage.setItem('trackers', JSON.stringify(updated));
  };

  const updateTrackerProgress=(id, newProgress)=>{
    const update=trackers.map((tracker)=>
      tracker.id===id? {...tracker, progress: newProgress}: tracker
    );
    setTrackers(updated);
    localStorage.setItem('trackers', JSON.stringify(updated));
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: 'auto'}}>
      <h1>🔥 작심삼일 돌파 웹앱</h1>

      {/* 기존 기능: 체크리스트 습관 */}
      <h2>📝 할 일 기반 습관</h2>
      <goalForm onAddGoal={handleAddGoal} />
      <ul style={{listStyle: 'none', paddingLeft: 0}}>
        {goals.map((goal, idx) => (
          <li key={idx} style={{marginBottom: '0.75rem', display: 'flex', alignItems: 'center'}}>
            <label style={{cursor: 'pointer', flexGrow: 1}}>
              <input
                type="checkbox"
                checked={goal.completed}
                onChange={()=> toggleGoal(idx)}
                style={{marginRight: '0.5rem'}}
                />
              <span style={{textDecoration: goal.completed ? 'line-through' : 'none'}}>
                {goal.text}
              </span>
            </label>
            <button onClick={()=> deleteGoal(idx)} style={{marginLeft: '0.5rem'}}>
              ❌
            </button>
          </li>
        ))}
      </ul>

      {/* 새 기능: 주간 목표 트래커 */}
      <h2>📅 주간 목표 습관</h2>
      <GoalForm onAddGoal={handleAddTracker} useWeeklyTarget />
      {trackers.map((goal) => (
        <WeeklyTracker
          key={goal.id}
          goal={goal}
          onUpdate={updateTrackerProgress}
        />
      ))}
      </div>
  );
}

export default App;