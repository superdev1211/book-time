export const getDays = (workingDays: number[]): Date[] => {
    const current = new Date();
    const numWorkingDays = workingDays.length;
    const days: Date[] = [];

    for(let i = 0; i < numWorkingDays;) {
        if (workingDays.includes(current.getDay())) {
            days[i] = new Date(current);
            i++;
        }
        current.setDate(current.getDate() + 1);
    }

    return days;
}

export const equalDate = (date1: Date, date2: Date) => {
    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
}

export const getDateString = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    tomorrow.setDate(today.getDate() + 1)
    
    if (equalDate(date, today)) {
        return "Today";
    }

    if (equalDate(date, tomorrow)) {
        return "Tomorrow";
    }

    return `${weekDays[date.getDay()]} ${date.getMonth() + 1}/${date.getDate()}`;
}

export const getTimeString = (time: Date) => {
    if (!time) {
        return "";
    }
    const hour = time.getHours();
    const minute = time.getMinutes();
    return `${hour > 12 ? hour - 12 : hour}:${minute} ${hour > 12 ? "PM" : "AM"}`;
}