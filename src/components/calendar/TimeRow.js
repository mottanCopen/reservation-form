import React from "react";

import { Slot } from "./Slot";

export const TimeRow = (props) => {
  const {
    viewCalendar,
    time,
    timeIndex,
    onClickSlot,
    selectedDateTime,
    selectedUseTime,
  } = props;
  return (
    <tr>
      <th>{time}</th>
      {viewCalendar.map((dayData, dayIndex) => (
        <Slot
          key={dayIndex + "-" + time}
          status={dayData.timeSlots[timeIndex]}
          day={dayData.date}
          dayIndex={dayIndex}
          time={time}
          timeIndex={timeIndex}
          onClickSlot={onClickSlot}
          selectedDateTime={selectedDateTime}
          selectedUseTime={selectedUseTime}
        />
      ))}
    </tr>
  );
};
