import React from "react";

export const TimeSelector = (props) => {
  const { register, selectableTime } = props;
  return (
    <select
      id="useTime"
      className="input-use-time"
      {...register("useTime", {
        validate: (value) => {
          return value !== "unselect" || "利用時間を選択してください";
        },
      })}
    >
      <option value="unselect">--選択--</option>
      {selectableTime.map((time, timeIndex) => {
        return (
          <option key={time} value={timeIndex}>
            {time}
          </option>
        );
      })}
    </select>
  );
};
