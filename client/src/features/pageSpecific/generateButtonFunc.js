export function convertDaysOff(daysOff){
    const newDaysOff = {};
  
    daysOff.forEach( ({empId, date, dayOff}) => {
  
      if(!newDaysOff[empId]) newDaysOff[empId] = [];
      
      if(dayOff) {
        // full date to day index
        // example: 2023-04-30 -> 29
        const dayIndex = new Date(date).getDate()-1;
        newDaysOff[empId].push(dayIndex);
      }
  
    })
    return newDaysOff;
  }