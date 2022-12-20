// Reduce 'objects array' to 'array of values' by keys
// e. g. ObjsArr = [{"id": 2,},{"id": 1,}], key = 'id' -> return [2,1]
export function toValuesArr(ObjsArr, key){

    //if ObjsArr is null, undefined or empty array return empty array
    if(!ObjsArr || ObjsArr.length === 0) return [];

    return ObjsArr.reduce((total, curr)=>{
            total.push(curr[key]);
            return total;
        }, []);
}

// Reduce 'objects array' to 'object with {index:obj value by key}' pairs
// e.g. ObjsArr = [{"id": 2,},{"id": 1,}], key = 'id' -> return {"0": 2, "1": 1}
export function indexToVal(ObjsArr, key){

    if(!ObjsArr || ObjsArr.length === 0) return [];

    return ObjsArr.reduce((total, curr, curr_index)=>{
        total[curr_index] = curr[key];
        return total;
      },{});
}