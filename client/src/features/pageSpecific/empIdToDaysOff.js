// daysOff: {  '2023-11-01' => {27 => true, 7 => false},
//            '2023-11-02' => {27 => false, 7 => true},
//            '2023-11-03' => {27 => true, 7 => false},
//            ... }

const empIdToDaysOff = (daysOff) => {

    const mapIdToDaysOff = new Map();

    daysOff.forEach((empIdToDayOff, date) => {
      // e.g.:
      // date: "2023-11-01"
      // empIdToDayOff: Map { 27 => true, 7 => false }
      
      empIdToDayOff.forEach((dayOff, empId) => {
        // e.g.:
        // empId: 27
        // dayOff: true

        if(!dayOff) return; // If dayOff is false, skip it

        // If empId (e.g.:27) is not in mapIdToDaysOff keys, add it
        if(!mapIdToDaysOff.has(empId)) mapIdToDaysOff.set(empId, []);

        // push day-of-the-month (e.g.: "01") to mapIdToDaysOff
        mapIdToDaysOff.get(empId).push(new Date(date).getDate());
      })
    })

    console.log('mapIdToDaysOff: ', mapIdToDaysOff);

    // return e.g.: {27 => [1, 3], 7 => [2]}
    return mapIdToDaysOff;

}

export default empIdToDaysOff;