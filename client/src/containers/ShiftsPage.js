import { Link } from 'react-router-dom'
import useGetAndChange from '../features/customHooks/useGetAndChange'
import ErrorList from '../components/ErrorList'

const ShiftsPage = () => {

  const [yearsMonths] = useGetAndChange({url: 'api/schedule/years-months-with-shifts'})

  if (yearsMonths?.error) return <ErrorList errors={[yearsMonths.error.message]} />
  
  return (
    <>
    <div>ShiftsPage</div>
    <Link to="new">Dodaj nowe zmiany</Link>

    <h4>Zapisane zmiany:</h4>

    {yearsMonths.data && Object.keys(yearsMonths.data).sort(function(a, b){return b-a}).map((year)=>(
      <div key={year}><p>{year}</p>
        {yearsMonths.data[year].map((month)=>
          <span key={month}>
            <Link to={`/shifts/${year}/${month}`}>{month}</Link>, &nbsp;
          </span>
        )}
      </div>    
    ))}
    </> 
  )
}

export default ShiftsPage