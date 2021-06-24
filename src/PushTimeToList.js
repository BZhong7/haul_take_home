import datalog from "./HOS log.json";

function PushTimeToList(i, k, list, daysPassed) {
    let start = new Date(datalog[i].data[k].startTime);
    let end = new Date(datalog[i].data[k].endTime);

    let activeDuration = (datalog[i].data[k].dutyStatusDurations.activeDurationMs);
    let hours = Math.round(activeDuration / 36e5);

    list.push(<ul>Day: {daysPassed.toString()}</ul>)
    list.push(<ul>Start Time: {start.toString()}</ul>)
    list.push(<ul>End Time: {end.toString()}</ul>)
    list.push(<ul>Hours Worked Today: {hours}</ul>)

    return (hours)
}

export default PushTimeToList;