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

  // 選択されたスロットのスタイルを変える
  const selected =
    selectedUseTime !== -1 &&
    ((selectedDateTime.dayIndex === dayIndex &&
      selectedDateTime.timeIndex === timeIndex) ||
      (selectedDateTime.dayIndex === dayIndex &&
        timeIndex < selectedDateTime.timeIndex + selectedUseTime &&
        timeIndex > selectedDateTime.timeIndex))
      ? "-selected"
      : "";
  // スロットの該当日付を整形(00:00:00にする)
  const slotDateForCompare = new Date(
    slotDate.getFullYear(),
    slotDate.getMonth(),
    slotDate.getDate()
  );
  const today = new Date();
  // 今日の日付から最短予約可能日を算出
  const earliestAvailableDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  // 最短予約受付可能日(0:当日、1:前日、2:2日前...)
  earliestAvailableDate.setDate(earliestAvailableDate.getDate() + 2);
  // 予約可能日か判定
  const isReservableDate = slotDateForCompare >= earliestAvailableDate;

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
