import { nestIfUndef } from "../utils/objUtils";

const shiftMangle = (shifts) => {

        // Generate shifts table
        const mangleFull = {};
        const mangleEmpsInGroup = {};

        if (shifts){
            shifts.forEach((shift)=>{

                nestIfUndef({
                obj: mangleFull,
                keys: [shift["group"], shift["date"], shift["employee"]],
                leafInit:[],
                leafFunc: (leaf)=>{leaf.push(shift["shift_num"])}
                });

                nestIfUndef({
                obj: mangleEmpsInGroup,
                keys: [shift["group"]],
                leafInit: new Set(),
                leafFunc: (leaf)=>{leaf.add(shift["employee"])}
                });

            });

            // Convert sets to arrays
            // e.g. { 1: Set(2, 3, 5, 6), 2: Set(1, 2)} > to > { 1: [2, 3, 5, 6], 2: [1, 2]}
            for (const [key, value] of Object.entries(mangleEmpsInGroup)) {
                mangleEmpsInGroup[key] = Array.from(value).sort();
            }

        }

    return [mangleFull, mangleEmpsInGroup];
}

export default shiftMangle;