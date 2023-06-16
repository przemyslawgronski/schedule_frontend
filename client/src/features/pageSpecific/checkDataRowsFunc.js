export function groupDaysOffByDate(daysOff){
    return daysOff.reduce((acc, curr)=>{
        if(acc[curr.date]==null) acc[curr.date] = {};
        if(acc[curr.date][curr.empId]==null) acc[curr.date][curr.empId] = {};
        acc[curr.date][curr.empId] = {dayOff: curr.dayOff, id: curr.id};
        return acc;
  }, {});
}

// Function converts data from this:

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
//     ...
// ]

// to this:

// {
//     "2028-02-01": {
//         "8": {
//             "dayOff": false,
//             "id": "8-2028-02-01"
//         },
//         "11": {
//             "dayOff": false,
//             "id": "11-2028-02-01"
//         }
//     },
//     "2028-02-02": {
//         "8": {
//             "dayOff": false,
//             "id": "8-2028-02-02"
//         },
//         "11": {
//             "dayOff": false,
//             "id": "11-2028-02-02"
//         }
//     },
//     "2028-02-03": {
//         "8": {
//             "dayOff": false,
//             "id": "8-2028-02-03"
//         },
//         "11": {
//             "dayOff": false,
//             "id": "11-2028-02-03"
//         }
//     },
//     ...
// }