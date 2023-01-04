import { numArray } from "./arrayUtils";

export const dateUtils = {
    currYear: new Date().getFullYear(),
    // Lepiej używać pełnych słów w nazwach,
    // nawet nazw opisowych, żeby nie trzeba było się domyślać, o co może chodzić.
    yearsArr: () => numArray(new Date().getFullYear()-5, new Date().getFullYear()+5),
    // Nie lepiej, żeby to wszystko jednak były funkcje?
    // Obliczenie tych wartości może dokonać się tylko raz, przy odpaleniu aplikacji.
    // Jeśli zrobię to minutę przed północą, ostatniego dnia miesiąca, to za chwilę
    // mogę otrzymać błęde dane.
    currMonth: new Date().getMonth(),
    nextMonth: new Date().getMonth() === 11 ? 0 : new Date().getMonth()+1,
    nextMonthsYear: new Date().getMonth() === 11 ? new Date().getFullYear()+1 : new Date().getFullYear(),
    monthArr: () => numArray(0,11),
    monthName: (num)=>{
        // monthNames redeklarowane przy każdym odpaleniu funkcji. Wyjąć z funkcji.
        const monthNames = ["1. Styczeń","2. Luty","3. Marzec","4. Kwiecień","5. Maj","6. Czerwiec","7. Lipiec","8. Sierpień","9. Wrzesień","10. Październik","11. Listopad","12. Grudzień"];
        return monthNames[num];
    },
    daysInMonth: (year, month) => new Date(year, month+1, 0).getDate(),
    datesArr: (year, month) => Array.from(Array(dateUtils.daysInMonth(year, month-1)).keys()).map(
            (day)=>`${year}-${month.toString().padStart(2,'0')}-${(day+1).toString().padStart(2,'0')}`
            )
}