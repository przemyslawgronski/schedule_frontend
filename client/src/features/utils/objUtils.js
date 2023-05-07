// Work with arrays too
export function invertAtPos(arrOrObj, pos, orgArr){
    // Inner function changes arr (original array)
    // arr - boolean (nested) array or object
    // pos - array of numbers or keys indicating position of boolean value to change
    if(pos.length===1){
        arrOrObj[pos[0]] = !arrOrObj[pos[0]];
        return orgArr || arrOrObj;
    }
    return invertAtPos(arrOrObj[pos[0]], pos.slice(1), orgArr || arrOrObj);
}

// examples:
// const array = [
//     [[false,false],[false,false]],
//     [[false,false],[false,false]],
//     [[false,false],[false,false]],
//     [[false,false],[false,false]]
// ]
// let result = invertAtPos(array, [3,0,1]);
// c onsole.log({array, result});

// const obj = {"foo":{"bar":false, "bar2":false}, "foo2":{"baz":false, "baz2":false}};
// let result = invertAtPos(obj, ["foo2","baz2"]);
// c onsole.log(obj);

export function safeInvertAtPos(arrOrObj, pos){
// Makes deep copy, so arr argument is not changed
const arrCopy = JSON.parse(JSON.stringify(arrOrObj));
return invertAtPos(arrCopy, pos);
}