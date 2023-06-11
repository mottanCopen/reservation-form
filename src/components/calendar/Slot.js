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
    (selectedDateTime.dayIndex === dayIndex &&
      selectedDateTime.timeIndex === timeIndex) ||
    (selectedDateTime.dayIndex === dayIndex &&
      timeIndex < selectedDateTime.timeIndex + selectedUseTime &&
      timeIndex > selectedDateTime.timeIndex)
      ? "-selected"
      : "";
  return (
    <td
      className={classNameArray[status] + selected}
      onClick={() =>
        availableArray[status] &&
        onClickSlot(slotDate, time, dayIndex, timeIndex)
      }
    >
      {statusArray[status]}
    </td>
  );
};
