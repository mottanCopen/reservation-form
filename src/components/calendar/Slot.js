import React from "react";

export const Slot = (props) => {
  const {
    status,
    day,
    dayIndex,
    time,
    timeIndex,
    onClickSlot,
    selectedDateTime,
    selectedUseTime,
  } = props;
  // 表示内容を設定
  const statusArray = ["◯", "×"];
  // 予約可否を設定
  const availableArray = [true, false];
  // class名を設定
  const classNameArray = ["slot-open", "slot-closed"];
  // 日付を取得
  const slotDate = new Date(day);
  // 選択されたスロット
  const selected =
    selectedUseTime !== -1 &&
    ((selectedDateTime.dayIndex === dayIndex &&
      selectedDateTime.timeIndex === timeIndex) ||
      (selectedDateTime.dayIndex === dayIndex &&
        timeIndex < selectedDateTime.timeIndex + selectedUseTime &&
        timeIndex > selectedDateTime.timeIndex))
      ? "-selected"
      : "";
  // 予約可能日か判定
  const today = new Date();
  // 最短予約受付可能日(0:当日、1:前日、2:2日前...)
  today.setDate(today.getDate() + 2);
  const isReservableDate =
    slotDate.getFullYear() >= today.getFullYear() &&
    slotDate.getMonth() >= today.getMonth() &&
    slotDate.getDate() >= today.getDate();
  return (
    <td
      className={
        isReservableDate ? classNameArray[status] + selected : "slot-outside"
      }
      onClick={() =>
        availableArray[status] &&
        isReservableDate &&
        onClickSlot(slotDate, time, dayIndex, timeIndex)
      }
    >
      {isReservableDate ? statusArray[status] : "-"}
    </td>
  );
};
