import { parseISO, format } from 'date-fns'

// export default function Date({ dateString }) {
//     const date = parseISO(dateString)
//     return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
// }

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
        let weekOption = {value: i, label: i}
        weekOptions.push(weekOption);
    }
    return weekOptions;
}

export const yearListOption = () => {
    const yearOptions = [
        {
            value: 2017,
            label: 2017
        }, {
            value: 2018,
            label: 2018
        }, {
            value: 2019,
            label: 2019
        }, {
            value: 2020,
            label: 2020
        },
    ]
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