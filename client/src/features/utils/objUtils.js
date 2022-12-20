// - Create object inside same object as keys indicate
// but only if there is no key (undefined)
// - Changes oryginal object
// - Creates new empty object if none is supplied

// examples:
// const a = {b:{c:{d:{}}}};
// c onsole.log(nestIfUndef({obj:a, keys:['b', 'c', 'd', 'e','f','g'], leafInit: "end"}));
// c onsole.log(newObj = nestIfUndef({keys:['b', 'c', 'x', 'y', 'z'], leafInit: "newObj"}));
// c onsole.log(nestIfUndef({obj:newObj, keys:['b', 'c', 'x', 'AA', 'BB'], leafInit: "newObj_second"}));
// c onsole.log(a);
// c onsole.log(newObj);
// c onsole.log(nestIfUndef({leafInit:"elo"}));
// c onsole.log(nestIfUndef({keys:[1],leafInit:"elo2"}));

export function nestIfUndef({obj={}, keys = [], leafInit=[], leafFunc}={}, orgObj) {

    if (keys.length === 0) {
      return orgObj || leafInit;
    } else {
  
      if( obj[keys[0]] === undefined ){
          if(keys.length === 1){
              obj[keys[0]] = leafInit;
              if(leafFunc instanceof Function){ 
                  leafFunc(obj[keys[0]]);
              }
          } else {
              obj[keys[0]] = {};
          }
      } else {
          //run leaf function
          if(keys.length === 1){
              if(leafFunc instanceof Function){
                  leafFunc(obj[keys[0]]);
              }
          }
      }
  
      return nestIfUndef({obj:obj[keys[0]], keys:keys.slice(1), leafInit:leafInit, leafFunc:leafFunc}, orgObj || obj);
    }
  }


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