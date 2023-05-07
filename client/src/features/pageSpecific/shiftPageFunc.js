export function genHeaders(shifts, allEmps){
  
  // unique employee ids from shifts:
  const uniqueEmpsIds = [...new Set(shifts.map(shift => shift.employee))];
  
  // unique employees from ids
  const uniqueEmps = uniqueEmpsIds?.map((empID)=>allEmps.find((emp)=>emp.id === empID));

  // headers for table
  return uniqueEmps.map(({id, first_name, last_name})=>({id:id, full_name:`${first_name} ${last_name}`}) );
}