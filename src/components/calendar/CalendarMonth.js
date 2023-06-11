import React from "react";

export const CalendarMonth = (props) => {
  const { viewCalendar } = props;
  const firstDate = new Date(viewCalendar[0].date);
  const lastDate = new Date(viewCalendar[6].date);
  const firstMonth = firstDate.getMonth() + 1;
  const lastMonth = lastDate.getMonth() + 1;
  // 月が跨っている場合は両月表示する
  const showMonth =
    firstMonth === lastMonth ? firstMonth : firstMonth + " - " + lastMonth;
  return <h2>{showMonth}月</h2>;
};
