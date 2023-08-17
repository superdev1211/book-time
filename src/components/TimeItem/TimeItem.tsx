import { TimeItemProps } from "./TimeItem.type"

const TimeItem = ({time, handleClick, classData}: TimeItemProps) => {
    return (
        <div className={classData} onClick={handleClick}>{time}</div>
    )
}

export default TimeItem;