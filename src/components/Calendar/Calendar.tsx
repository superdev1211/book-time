import { useState, useEffect } from "react";

import { GetAvailability, BookTime } from "../../services";
import { MEETING_TIME } from "../../constant/globalConstant";
import { getDays, getDateString, getTimeString, equalDate } from "../helper/globalHelper";
import DateItem from "../DateItem";
import TimeItem from "../TimeItem";

const Calendar = () => {
    const days = getDays([1, 2, 3, 4, 5]);
    
    const [curDate, setCurDate] = useState(days[0]);
    const [curTime, setCurTime] = useState<Date | null>(null);
    const [availabilities, setAvailabilities] = useState([] as Date[]);

    useEffect(() => {
        const fetchAvailability = async () => {
            const nextDate = new Date(curDate);
            nextDate.setDate(curDate.getDate() + 1);
            const availabilities = await GetAvailability(curDate, nextDate);
            const startTime = availabilities.workingHours[0].startTime;
            const endTime = availabilities.workingHours[0].endTime;

            const checkAvailability = (date: Date) => {
                return !availabilities.busy.some((element: any) => new Date(element.start) <= date && new Date(element.end) >= date);
            }

            const realAvailabilities = [];
            let curTime = startTime;
            while (curTime < endTime) {
                const startDate = new Date(curDate);
                const endDate = new Date(curDate);

                startDate.setHours(curTime / 60 - 5);
                startDate.setMinutes(curTime % 60);
                startDate.setSeconds(0);

                endDate.setHours((curTime + MEETING_TIME) / 60 - 5);
                endDate.setMinutes((curTime + MEETING_TIME) % 60);
                endDate.setSeconds(0);

                if (checkAvailability(startDate) && checkAvailability(endDate)) {
                    realAvailabilities.push(startDate);
                }
                curTime += MEETING_TIME;
            }

            setAvailabilities(realAvailabilities);
        }

        fetchAvailability();
    }, [curDate]);    

    const bookTime = async () => {
        if (curTime) {
            const endTime = new Date(curTime);
            endTime.setMinutes(curTime.getMinutes() + MEETING_TIME);
            const response = await BookTime(curTime, endTime);
            if (response.status === "ACCEPTED") {
                alert("Successfully book the time.");
            } else {
                alert("Failed to book the time.");
            }
        }
    }

    return (
        <div>
        <div className="calendar">
            <div className="date-list">
                {
                    days.map((day) => (
                        <DateItem classData={`${equalDate(curDate, day) ? "item-select" : ""} item`} date={getDateString(day)} handleClick={() => setCurDate(day)}/>
                    ))
                }
            </div>
            <div className="time-list">
                {
                    availabilities.map((time: Date) => (
                        <TimeItem classData={`${time === curTime ? "item-select" : ""} item`} time={getTimeString(time)} handleClick={() => setCurTime(time)}/>
                    ))
                }
            </div>
        </div>
        <button className="book-time-button" onClick={bookTime}>Select {getDateString(curDate)} {getTimeString(curTime!)}</button>
        </div>
    )
}

export default Calendar;