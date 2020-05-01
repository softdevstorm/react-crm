import { parseISO, format } from 'date-fns'

// export default function Date({ dateString }) {
//     const date = parseISO(dateString)
//     return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
// }

export const getCurrentDate = () => {
    const date = new Date();
    return formatDate(date);
}

export const getWeekNumber = () => {
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

export const getYear = () => {
    return new Date().getFullYear();
}

export const weekListOption = () => {
    const currentWeek = getWeekNumber();
    let weekOptions = []
    for (var i=1; i<=currentWeek; i++) {
        let weekOption = { value: i, label: 'Week = ' + String(i) }
        weekOptions.push(weekOption);
    }
    return weekOptions;
}

export const yearListOption = () => {
    const currentYear = getYear();
    let yearOptions = [];
    for (var i=2017; i<=currentYear; i++) {
        let yearOption = { value: i, label: 'Year = ' + String(i) }
        yearOptions.push(yearOption);
    }
    
    return yearOptions;
}

export const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

export const getStartDateOfISOWeek = (w, y) => {
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return formatDate(ISOweekStart);
}
