export function groupDaysOffByDate(daysOff){
  return daysOff.reduce((acc, curr)=>{

    if(!acc.has(curr.date)) acc.set(curr.date, new Map());
    acc.get(curr.date).set(curr.empId, curr.dayOff);
    
    return acc;
  }, new Map());
}

// Function converts data from this:

// [
//   {
//       "id": "12-2023-10-01",
//       "empId": 12,
//       "date": "2023-10-01",
//       "dayOff": false
//   },
//   {
//       "id": "8-2023-10-01",
//       "empId": 8,
//       "date": "2023-10-01",
//       "dayOff": false
//   },
//   {
//       "id": "12-2023-10-02",
//       "empId": 12,
//       "date": "2023-10-02",
//       "dayOff": false
//   },
//   {
//       "id": "8-2023-10-02",
//       "empId": 8,
//       "date": "2023-10-02",
//       "dayOff": false
//   },

// to this:

// Map {
//   "2023-10-01" => Map {
//     12 => false,
//     8 => false
//   },
//   "2023-10-02" => Map {
//     12 => false,
//     8 => false
//   },