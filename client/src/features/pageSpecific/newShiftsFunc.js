import { findIndexes } from "../utils/arrayUtils";

// generate result object: keys: employee ids, values: days indexes
//
// daysOffArr - truthy values if day off [rows - days indexes][columns - employees]
// keysArr - ids of employees
// convDict - Object: keys - index of colum, values - id of employee
export function workDaysByEmpID(keysArr, daysOffArr, convDict){
    if (!keysArr || !daysOffArr || !convDict) return {};
    if (keysArr.length === 0 || daysOffArr.length === 0 || Object.keys(convDict).length === 0) return {};

    // Initialize result e.g. {1: [], 2: [], 3: [], 5: [], 6: []}
    const result = {};
    keysArr.forEach((id)=>{result[id]=[]});

    // get indexes of truthy values
    const indxArr = findIndexes(daysOffArr, x=>x);

    // convDict[item[1]] - Changes number of column to id of employee
    // item[0] - index of row
    // generate result object: keys: employee ids, values: day indexes
    indxArr.forEach((item)=>result[convDict[item[1]]].push(item[0]));
    
    return result;
}

export function mapEmpIdToFreeDays(employees, daysOff){

    if (!employees || !daysOff) return {};
    
    const keysArr = employees.map(({id})=>id);
    const empIndxToVal = Object.fromEntries(employees.map(({ id }, index) => [index, id]))

    // generate object: keys: employee ids, values: days indexes
    return workDaysByEmpID(keysArr, daysOff, empIndxToVal);
}