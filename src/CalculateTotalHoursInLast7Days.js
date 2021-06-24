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

export default CalculateTotalHoursInLast7Days;