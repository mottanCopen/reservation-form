import React from "react";

export const TimeSelector = (props) => {
  const { register, selectableTime, onChange } = props;
  return (
    <select
      id="useTime"
      className="input-use-time"
      {...register("useTime", {
        validate: (value) => {
          return value !== "0" || "利用時間を選択してください";
        },
      })}
      onChange={onChange}
    >
      <option value="0">--選択--</option>
      {selectableTime.map((time, timeIndex) => {
        return (
          <option key={time} value={timeIndex + 1}>
            {time}
          </option>
        );
      })}
    </select>
  );
};
