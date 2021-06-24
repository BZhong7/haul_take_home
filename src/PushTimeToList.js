import datalog from "./HOS log.json";

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

export default PushTimeToList;