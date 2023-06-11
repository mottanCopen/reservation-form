import React from "react";

export const Slot = (props) => {
  const { status, day, dayIndex, time, timeIndex, onClickSlot } = props;
  // 表示内容を設定
  const statusArray = ["◯", "×"];
  // 予約可否を設定
  const availableArray = [true, false];
  // class名を設定
  const classNameArray = ["slot-open", "slot-closed"];
  // 日付を取得
  const slotDate = new Date(day);

  return (
    <td
      className={classNameArray[status]}
      onClick={() =>
        availableArray[status] &&
        onClickSlot(slotDate, time, dayIndex, timeIndex)
      }
    >
      {statusArray[status]}
    </td>
  );
};
