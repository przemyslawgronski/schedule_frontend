export function numArray(from,to){
    // Renders array of numbers form "from" to "to" both inclusive
    if(from>to) return [];
    return Array.from(Array(to+1-from).keys()).map((i)=>i+from);
  }



export function create2dArr(rows=0, columns=0, init=false){
/**
 * Create two-dimensional array
 * @param {number} rows - Number of rows (how many smaller arrays).
 * @param {number} columns - Number of columns (how many elements in single array).
 * @param {*} init - Initial value of every element in array.
 * @returns {Array} - 2d Array
 */
    if(!Number.isInteger(rows) || !Number.isInteger(columns) || rows<0 || columns<0){
        return [];
    }
    return [...Array(rows)].map(()=>Array(columns).fill(init))
  }

//test

// Example for func = () => x:x===1:
// arr = [0,1,0,[1,0,0],[0,[1],1]] => result = [[1],[3,0],[4,1,0],[4,2]]
// Which means that arr[4][1][0] equals 1
// Antother egzample: findIndexes([0, 1, 0, 0, 7, -2, 8], n => n > 0) returns: [[1],[4],[6]]

export function findIndexes(arr, func){
    const curr_indexes=[]; // Keep track of current nested indexes
    const result = [];
  
    function findRecursivly(arr, func){
        
        arr.forEach((value, index)=>{
            if(Array.isArray(value)){
                curr_indexes.push(index);
                findRecursivly(value, func);
            } else {
                if(func(value)){
                    curr_indexes.push(index);
                    result.push([...curr_indexes]);
                    curr_indexes.pop(); // Remove just added index to stay at the same nested level
                }
            }
  
            if(index === arr.length-1){
                    // end of array - remove most nested index - go up
                    curr_indexes.pop();
            }
        })
    }
  
    findRecursivly(arr, func);
  
    return result;
  }


// Adds element to array if it's not there or removes it if it's there
// do not modifys original array, returns new one
export const addOrRemove = (array, item) => {
    if (array.includes(item)) {
      return array.filter((el) => el !== item);
    } else {
      return [...array, item];
    }
}

// If item is not an array returns it
// If item is array with one element returns that element
// If item is array with more than one element returns string with elements separated by ', '
export const unArr = (item) => {
  if(!Array.isArray(item)) return item;
  if(item.length === 1) return item[0];
  return item.join(', ');
}


// input:
// [   { "date": "2023-09-01", "employee": 8, "shift_num": [ 1 ] },
//     { "date": "2023-09-01", "employee": 12, "shift_num": [ 0 ] },
//     { "date": "2023-09-02", "employee": 8, "shift_num": [ 1 ] },
//     { "date": "2023-09-02", "employee": 12, "shift_num": [ 0 ] },
//     { "date": "2023-09-03", "employee": 8, "shift_num": [ 1 ] },
//     { "date": "2023-09-03", "employee": 12, "shift_num": [ 0 ] },
//     ...

// result:
//  Map{
//    "2023-09-01" => Map{ 8 => [ 1 ], 12 => [ 0 ] },
//    "2023-09-02" => Map{ 8 => [ 1 ], 12 => [ 0 ] },
//    "2023-09-03" => Map{ 8 => [ 1 ], 12 => [ 0 ]  },
//     ...

export const convertShifts = (shifts) => {

  return shifts.reduce((acc, curr) => {
      
      const {date, employee, shift_num} = curr;

      // If date is not in map add it
      if(!acc.has(date)) acc.set(date, new Map());

      // eg.: '2023-09-01' => Map{ 8 => [ 1 ], 12 => [ 0 ] }
      //       date        =>  {employee => shift_num, ...}
      acc.get(date).set(employee, shift_num);
  
      return acc;
  }, new Map());

}