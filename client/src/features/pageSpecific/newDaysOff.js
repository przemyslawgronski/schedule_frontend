import { dateUtils } from '../../features/utils/dateUtils'

// TODO: Add comments

const newDaysOff = (empsInGroup, date) => {

    const dates = dateUtils.datesArray(date.year, date.month);

    const daysOff = new Map();

    dates.forEach( (date) => {
        daysOff.set(date, new Map());
        empsInGroup.forEach( (emp) => {
        daysOff.get(date).set(emp.id, false);
      })
    });

    return daysOff;
}

export default newDaysOff;