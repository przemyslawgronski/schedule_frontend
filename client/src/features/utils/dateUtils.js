import { numArray } from "./arrayUtils";

const monthNames = ["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"];

export const dateUtils = {
    yearsArray(radius){ return numArray(new Date().getFullYear()-radius, new Date().getFullYear()+radius)},
    nextMonth(){ return new Date().getMonth() === 11 ? 0 : new Date().getMonth()+1 },
    nextMonthsYear(){ return new Date().getMonth() === 11 ? new Date().getFullYear()+1 : new Date().getFullYear() },
    monthArray: numArray(0,11),
    monthName(num){ return monthNames[num] },
    daysInMonth(year, month){ return new Date(year, month+1, 0).getDate() },
    datesArray(year, month){
        return Array.from(
            Array(dateUtils.daysInMonth(year, month-1)).keys()).map(
                (day)=>`${year}-${month.toString().padStart(2,'0')}-${(day+1).toString().padStart(2,'0')}`
            )
        }
}

// date = {"year": 2023, "month": 2},
// yearsMonths = {"2023": [6,5,4,3,2]}
export const dateExists = (date, yearsMonths) => {
    const stringYear = String(date.year);
    if(!Object.keys(yearsMonths).includes(stringYear)) return false;
    const shiftsMonths = yearsMonths[stringYear];

    // shiftsMonths - 0 based array of months with saved shifts
    // date.month+1 - 1 based month number
    return shiftsMonths.includes(date.month+1)
  }
