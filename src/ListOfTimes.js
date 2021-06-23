import React from 'react';
import datalog from './HOS log.json';
import Queue from './Queue'


function ListOfTimes() {
    let list = [];
    let daysPassed = 1;
    let weeklyGrossHours = 0;
    let totalHoursInLast7Days = 0;
    let totalHoursToday = 0;
    let queueOfDailyHours = new Queue();

    for (const i of Object.keys(datalog)) {
        for (let k = 0; k < datalog[i].data.length; k++) {
            totalHoursToday = PushTimeToList(i, k, list, daysPassed);

            weeklyGrossHours += totalHoursToday;
            weeklyGrossHours = CalculateGrossPay(i, k, list, weeklyGrossHours);

            totalHoursInLast7Days = CalculateTotalHoursInLast7Days(totalHoursInLast7Days, totalHoursToday, queueOfDailyHours)

            if (daysPassed % 7 === 0) {
                list.push(queueOfDailyHours.weeklySummary(totalHoursInLast7Days))
            }

            list.push(<ul>Total Hours in Last 7 Days: {totalHoursInLast7Days}</ul>)

            if (totalHoursInLast7Days >= 56) {
                list.push(<ul>WARNING: TOTAL HOURS WORKED IN THE LAST 7 DAYS IS WITHIN 80% OF 70 HOURS</ul>)
            }
            daysPassed++;
        }
    }

    return (<div>{list}</div>)
}

function PushTimeToList(i, k, list, daysPassed) {
    let start = new Date(datalog[i].data[k].startTime);
    let end = new Date(datalog[i].data[k].endTime);
    let diff = end.getHours() - start.getHours();

    list.push(<ul>Day: {daysPassed.toString()}</ul>)
    list.push(<ul>Start Time: {start.toString()}</ul>)
    list.push(<ul>End Time: {end.toString()}</ul>)
    list.push(<ul>Hours Worked Today: {diff.toString()}</ul>)

    return (diff)
}

function CalculateGrossPay(i, k, list, weeklyGrossHours) {
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

function CalculateTotalHoursInLast7Days(totalHoursInLast7Days, totalHoursToday, queueOfDailyHours) {
    if (queueOfDailyHours.length() === 7) {
        totalHoursInLast7Days -= queueOfDailyHours.peek();
        totalHoursInLast7Days += totalHoursToday;

        queueOfDailyHours.pop();
        queueOfDailyHours.push(totalHoursToday);
    }
    else {
        totalHoursInLast7Days += totalHoursToday;

        queueOfDailyHours.push(totalHoursToday);
    }

    return totalHoursInLast7Days
}

export default ListOfTimes;