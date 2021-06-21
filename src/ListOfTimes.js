import React from 'react';
import datalog from './HOS log.json';


function ListOfTimes() {
    let list = [];
    let daysPassed = 1;
    let weeklyHours = 0;

    for (let i = 0; i < 2; i++) {
        for (let k = 0; k < 32; k++) {
            weeklyHours += PushTimeToList(i, k, list, daysPassed);
            if (daysPassed % 7 === 0) {
                list.push(<ul>Hours Worked This Week: {weeklyHours.toString()}</ul>)
                weeklyHours = 0;
            }
            daysPassed++;
        }
    }

    for(let j = 0; j < 12; j++) {
        PushTimeToList(2, j, list, daysPassed);
        if (daysPassed % 7 === 0) {
            list.push(<ul>Hours Worked This Week: {weeklyHours.toString()}</ul>)
            weeklyHours = 0;
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

export default ListOfTimes;