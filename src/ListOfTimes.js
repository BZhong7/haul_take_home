import React from 'react';
import datalog from './HOS log.json';


function ListOfTimes() {
    let list = [];
    let daysPassed = 1;
    let weeklyGrossHours = 0;
    let totalHoursIn7Days = 0;
    let totalHoursToday = 0;
    let hoursOfOldestDay = 0;

    for (let i = 0; i < 2; i++) {
        for (let k = 0; k < 32; k++) {
            totalHoursToday = PushTimeToList(i, k, list, daysPassed);
            weeklyGrossHours += totalHoursToday;
            weeklyGrossHours = CalculateGrossPay(i, k, list, weeklyGrossHours);
            if (totalHoursIn7Days >= 56) {
                list.push(<ul>WARNING: TOTAL HOURS WORKED IN THE LAST 7 DAYS IS WITHIN 80% OF 70 HOURS</ul>)
            }
            daysPassed++;
        }
    }

    for(let j = 0; j < 12; j++) {
        totalHoursToday = PushTimeToList(2, j, list, daysPassed);
        weeklyGrossHours += totalHoursToday;
        weeklyGrossHours = CalculateGrossPay(2, j, list, weeklyGrossHours);
        if (totalHoursIn7Days >= 56) {
            list.push(<ul>WARNING: TOTAL HOURS WORKED THIS WEEK IS WITHIN 80% OF 70 HOURS</ul>)
        }
        daysPassed++;
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
    if (isSunday === 0) {
        list.push(<ul>Total Hours Worked This Week: {weeklyGrossHours.toString()}</ul>)
        weeklyGrossHours = 0;
    }
    else {
        list.push(<ul>Total Hours Worked So Far: {weeklyGrossHours.toString()}</ul>)
    }

    return weeklyGrossHours
}

function CalculateTotalHoursInLast7Days(totalHoursIn7Days, totalHoursToday, hoursOfOldestDay, daysPassed) {
    if (daysPassed > 7) {
        totalHoursIn7Days -= hoursOfOldestDay;
        totalHoursIn7Days += totalHoursToday;
    }
    else {
        totalHoursIn7Days += totalHoursToday;
    }

    return totalHoursIn7Days
}

export default ListOfTimes;