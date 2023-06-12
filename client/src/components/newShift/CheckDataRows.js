import { CheckBox } from "../form/Inputs"


const CheckDataRows = ({daysOff2, handleDaysOff2, headers}) => {

    // daysOff2:
  //   [
  //     {
  //         "id": "8-2023-05-01",
  //         "fullName": "nowy nowy2",
  //         "date": "2023-05-01",
  //         "dayOff": false
  //     },
  //     {
  //         "id": "11-2023-05-01",
  //         "fullName": "AAAAAAA 999",
  //         "date": "2023-05-01",
  //         "dayOff": false
  //     },
  //     {
  //         "id": "8-2023-05-02",
  //         "fullName": "nowy nowy2",
  //         "date": "2023-05-02",
  //         "dayOff": false
  //     },
  //     {
  //         "id": "11-2023-05-02",
  //         "fullName": "AAAAAAA 999",
  //         "date": "2023-05-02",
  //         "dayOff": false
  //     },
  //     {
  //         "id": "8-2023-05-03",
  //         "fullName": "nowy nowy2",
  //         "date": "2023-05-03",
  //         "dayOff": false
  //     },
  //     {
  //         "id": "11-2023-05-03",
  //         "fullName": "AAAAAAA 999",
  //         "date": "2023-05-03",
  //         "dayOff": false
  //     },
  //     {
  //         "id": "8-2023-05-04",
  //         "fullName": "nowy nowy2",
  //         "date": "2023-05-04",
  //         "dayOff": false
  //     },
  //     ...
  // ]

  // Group daysOff2 by date

  const daysOff2ByDate = daysOff2.reduce((acc, curr)=>{
    if(acc[curr.date]==null) acc[curr.date] = {};
    if(acc[curr.date][curr.empId]==null) acc[curr.date][curr.empId] = {};
    acc[curr.date][curr.empId] = {dayOff: curr.dayOff, id: curr.id};
    return acc;
  }, {});

  return (
    <tbody>
    {
      Object.keys(daysOff2ByDate).map(day=>(
        <tr key={day}>
          <td>{day}</td>
          {
            headers.map(emp=>(
              <td key={emp.id}>
                <CheckBox
                  isChecked={daysOff2ByDate[day][emp.id].dayOff}
                  changeFunc={()=>handleDaysOff2(daysOff2ByDate[day][emp.id].id)}
                />
              </td>
            ))
          }
        </tr>
      ))
    }

    </tbody>
  )
}
export default CheckDataRows

//   {shifts.map((shift)=>(
//     // Each row (date) must be unique
//     <tr key={shift.date}>
//         <td>{shift.date}</td>
//         {headers.map((emp)=>(
//             <td key={emp.id}>{emp.id===shift.employee && unArr(shift.shift_num)}</td>
//         ))}
//     </tr>
//   ) )}


        /* {daysOff?.map((isCheckedByDay, dayIndex)=>(
        <div key={dayIndex}>
          {dayIndex+1}
          {isCheckedByDay?.map( (isCheckedByShift, shiftIndex)=> (
          
          <CheckBox
            key={shiftIndex}
            isChecked={isCheckedByShift}
            changeFunc={()=>handleDaysOff2()}
          />
          
          ) )}
        </div>
    )
    )} */