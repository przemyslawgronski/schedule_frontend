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


// Pushes element to array if it's not there or removes it if it's there
// do not modifys original array, returns new one
export function pushOrFilter(arr, item){
    const copy_arr = [...arr];
    if(!copy_arr.includes(item)){
        copy_arr.push(item);
    } else {
        copy_arr.filter((el)=>el!==item);
    }
    return copy_arr;
}