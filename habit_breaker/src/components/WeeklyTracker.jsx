export default function WeeklyTracker({goal, onUpdate}){
    const days=['일', '월', '화', '수', '목', '금', '토'];

    const toggleDay=(index)=>{
        const updatedProgress = [...goal.progress];
        updatedProgress[index]=!updatedProgress[index];
        onUpdate(goal.id, updatedProgress);
    };

    const completed=goal.progress.filter(Boolean).length;

    return (
        <div>
            <h3>{goal.name}</h3>
            <p>목표: {goal.weeklyTarget}회/완료: {completed}회</p>
            <div style={{display: 'flex', gap: "8px"}}>
                {days.map((day, i)=> (
                    <button
                        key={day}
                        onClick={()=>toggleDay(i)}
                        style={{
                            background: goal.progress[i] ? '#4caf50' : '#ccc',
                            color: 'white',
                            padding: '6px',
                        }}
                    >
                        {day}
                    </button>
                ))}
            </div>
        </div>
    );
}