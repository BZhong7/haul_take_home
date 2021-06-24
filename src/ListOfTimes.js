import React from 'react';

import datalog from './HOS log.json';

import Queue from './Queue'
import PushTimeToList from "./PushTimeToList";
import CalculateTotalHoursInLast7Days from "./CalculateTotalHoursInLast7Days";
import CalculateWeeklyGrossPay from "./CalculateWeeklyGrossPay";
import CalculateDailyGrossPay from "./CalculateDailyGrossPay";


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
            CalculateDailyGrossPay(list, weeklyGrossHours, totalHoursToday);
            weeklyGrossHours = CalculateWeeklyGrossPay(i, k, list, weeklyGrossHours);

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

export default ListOfTimes;