const RenderSolution = ({employees, solution, saveSolution}) => (
    <>
        {Object.keys(solution)?.map((dayIndex)=>
          <p key={dayIndex}>
          {parseInt(dayIndex)+1} : 
          {employees?.map((emp)=>
              <span key={emp.id}>
              | {emp.id}:{solution[dayIndex][emp.id] ?? "X"} |
              </span>
          )}
          </p>
        )}
        {solution && <button onClick={saveSolution}>Zapisz</button>}
    </>
  )

export default RenderSolution