import datalog from "./HOS log.json";

function CalculateWeeklyGrossPay(i, k, list, weeklyGrossHours) {
    let endDay = new Date(datalog[i].data[k].endTime);
    let isSunday = endDay.getDay();
    let overtime = 0;

    if (isSunday === 0) {
        if(weeklyGrossHours > 40) {
            overtime = weeklyGrossHours - 40;
            weeklyGrossHours = 40;
        }
        let weeklyGrossPay = (weeklyGrossHours * 22) + (overtime * 33);
        list.push(<ul>Weekly Gross Pay: ${weeklyGrossPay}</ul>)
        weeklyGrossHours = 0;
    }

    return weeklyGrossHours
}

export default CalculateWeeklyGrossPay;