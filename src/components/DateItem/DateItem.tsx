import { DateItemProps } from "./DateItem.type"

const DateItem = ({date, handleClick, classData}: DateItemProps) => {
    return (
        <div className={`${classData}`} onClick={handleClick}>{date}</div>
    )
}

export default DateItem;