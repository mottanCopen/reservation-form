import React from "react";
import { TimeRow } from "./TimeRow";

export const Calendar = (props) => {
  const { viewCalendar, timeTable, week, onClickSlot } = props;
  return (
    <div className="calendar-table-area">
      <div className="calendar-table-header">
        <table>
          <thead>
            <tr>
              <th className="day"></th>
              {viewCalendar.map((dateList, headerIndex) => {
                const headerDate = new Date(dateList.date);
                return (
                  <th key={headerIndex} className="day">
                    <div className="day-pc">{headerDate.getDate()}日</div>
                    <span>({week[headerDate.getDay()]})</span>
                  </th>
                );
              })}
            </tr>
          </thead>
        </table>
      </div>
      <div className="calendar-table-body">
        <table>
          <tbody>
            {timeTable.map((time, timeIndex) => {
              return (
                <TimeRow
                  key={timeIndex}
                  viewCalendar={viewCalendar}
                  time={time}
                  timeIndex={timeIndex}
                  onClickSlot={onClickSlot}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
