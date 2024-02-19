export function isDateToday(date: string) {
    const checkDate = new Date(date)
    const currentDate = new Date();

    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const checkDay = checkDate.getDate();
    const checkMonth = checkDate.getMonth() + 1;
    const checkYear = checkDate.getFullYear();

    if (currentDay === checkDay && currentMonth === checkMonth && currentYear === checkYear) {
        const formattedTime = formatTime(checkDate)
        return {
            isToday: true,
            time: formattedTime
        };
    } else {
        const formatYear = formatTimeyear(checkDate)
        return {
            isToday: false,
            time: formatYear
        };
    }
};

function formatTime(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedHours}:${formattedMinutes}`;
}

function formatTimeyear(date) {
    const currentYear = new Date().getFullYear();
    const year = date.getFullYear();
    const month = date.getMonth() ?? 0
    const day = date.getDate();
    const monthStr = months[month]
    if (year === currentYear) {
        return formatDayAndTime(date, `${day} ${monthStr}`);
    } else {
        return `${day} ${monthStr} ${year}`;
    }
}
const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

function formatDayAndTime(date, otherOutput) {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    if (date >= sevenDaysAgo && date <= now) {
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        const formattedTime = formatTime(date)
        return `${formattedTime} ${dayName}`;
    } else {
        return otherOutput;
    }
}