// Toggle boolean value of a dayOff

// params:
//   "date": "2023-11-01",
//   "empId": 27,
//   "prev": {'2023-11-01' => {27 => false, 7 => false},
//            '2023-11-02' => {27 => false, 7 => false},
//            ...
//            '2023-11-30' => {27 => false, 7 => false} }

// return:
// "newDaysOff": {  '2023-11-01' => {27 => true, 7 => false},
//                  '2023-11-02' => {27 => false, 7 => false},
//                   ...
//                  '2023-11-30' => {27 => false, 7 => false} }

const toggleDayOff = (date, empId, setDaysOff)=>setDaysOff( prev=> {

    // deep copy
    const newDaysOff = structuredClone(prev);

    // toToggle: e.g. false from '2023-11-01' => {27 => false, ...}
    const toToggle = newDaysOff.get(date).get(empId);

    // Toggle
    newDaysOff.get(date).set(empId, !toToggle);

    return newDaysOff;
  });

export default toggleDayOff;