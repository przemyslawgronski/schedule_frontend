import { CheckBox } from "../form/Inputs"


const CheckDataRows = ({daysOff, handleDaysOff, headers}) => {

    // daysOff:
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

  // Group daysOff by date
  // TODO: move function to utils (outside of component)
  const daysOffByDate = daysOff.reduce((acc, curr)=>{
    if(acc[curr.date]==null) acc[curr.date] = {};
    if(acc[curr.date][curr.empId]==null) acc[curr.date][curr.empId] = {};
    acc[curr.date][curr.empId] = {dayOff: curr.dayOff, id: curr.id};
    return acc;
  }, {});

  return (
    <tbody>
    {
      Object.keys(daysOffByDate).map(day=>(
        <tr key={day}>
          <td>{day}</td>
          {
            headers.map(emp=>(
              <td key={emp.id}>
                <CheckBox
                  isChecked={daysOffByDate[day][emp.id].dayOff}
                  changeFunc={()=>handleDaysOff(daysOffByDate[day][emp.id].id)}
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