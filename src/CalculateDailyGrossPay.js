function CalculateDailyGrossPay (list, weeklyGrossHours, totalHoursToday) {
    if (weeklyGrossHours <= 40) {
        list.push(<ul>Daily Gross Pay: ${totalHoursToday * 22}</ul>)
    }
    else {
        let overtime = weeklyGrossHours - 40;

        if (overtime < totalHoursToday) {
            let normalHours = totalHoursToday - overtime;
            let totalPay = (normalHours * 22) + (overtime * 33);

            list.push(<ul>Daily Gross Pay: ${totalPay}</ul>)
        }
        else {
            list.push(<ul>Daily Gross Pay: ${totalHoursToday * 33}</ul>)
        }
    }
}

export default CalculateDailyGrossPay;