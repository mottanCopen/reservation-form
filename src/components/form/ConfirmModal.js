import React from "react";
import { Button } from "../calendar/Button";

export const ConfirmModal = (props) => {
  const {
    setConfirmModalIsOpen,
    setCompleteModalIsOpen,
    inputData,
    selectedTimeIndex,
  } = props;

  const closeModal = () => {
    setConfirmModalIsOpen(false);
  };

  const submit = (data) => {
    console.log(createRequest(data));
    setConfirmModalIsOpen(false);
    setCompleteModalIsOpen(true);
  };

  /*
   ** ▼▼▼▼▼▼▼▼▼リクエストフォーマット生成▼▼▼▼▼▼▼▼▼
   */
  const createRequest = (inputData) => {
    const { date, useTime, name, Email, number } = inputData;
    const reqUseTime = Number(useTime) + 1; // 最短利用時間をセレクトから除外した場合はIndexが変わる
    const reqDate = new Date(date);
    return {
      date: reqDate,
      selectedTimeIndex,
      useTime: reqUseTime,
      name,
      Email,
      number,
    };
  };

  /*
   ** ▼▼▼▼▼▼▼▼▼表示フォーマット生成▼▼▼▼▼▼▼▼▼
   */

  // 利用時間を数値に変換する
  // 最短利用時間をセレクトから除外した場合はIndexが変わる
  const convertTime = (index) => {
    const useTime = (Number(index) + 1) / 2;
    // 表示用の値を生成
    const hour = Math.floor(useTime);
    const minute = (useTime - hour) * 60;
    return { hour, minute };
  };

  // 終了時間を算出する
  const displayEndTime = (start, time) => {
    const { startHour, startMinute } = start;
    const { hour, minute } = time;
    // minuteが60以上の場合は+1
    const endHour =
      startMinute + minute > 59 ? startHour + hour + 1 : startHour + hour;
    // minuteが60以上の場合は切り上げて0
    const endMinute =
      startMinute + minute > 59
        ? startMinute + minute - 60
        : startMinute + minute;
    // minuteが9以下の場合は2桁に変換した文字列に変換
    const returnStr =
      endMinute < 10 ? endHour + ":0" + endMinute : endHour + ":" + endMinute;
    return returnStr;
  };

  // 開始時間を数値に変換する
  const convertStartTime = (string) => {
    const timeStr = string.split(":");
    const startHour = Number(timeStr[0]);
    const startMinute = Number(timeStr[1]);
    return { startHour, startMinute };
  };

  // 利用時間を表示用のフォーマットに変換する
  const useTime = (convertedTime) => {
    const { hour, minute } = convertedTime;
    return (hour > 0 ? hour + "時間" : "") + (minute > 0 ? minute + "分" : "");
  };

  return (
    <div className="confirm-modal-contents">
      <h3>予約内容の確認</h3>
      <table>
        <tbody>
          <tr>
            <th>お名前</th>
            <td>{inputData.name} 様</td>
          </tr>
          <tr>
            <th>メールアドレス</th>
            <td>{inputData.Email}</td>
          </tr>
          <tr>
            <th>電話番号</th>
            <td>{inputData.number}</td>
          </tr>
          <tr>
            <th>ご利用日時</th>
            <td>
              <div>{inputData.date}</div>
              <div>
                <label>開始時刻：</label>
                {inputData.startTime}
              </div>
              <div>
                <label>終了時刻：</label>
                {displayEndTime(
                  convertStartTime(inputData.startTime),
                  convertTime(inputData.useTime)
                )}
              </div>
              <div>
                <label>利用時間：</label>
                {useTime(convertTime(inputData.useTime))}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="confirm-modal-apply-button">
        <Button
          text="予約を確定する"
          className="cal-btn"
          onClick={() => submit(inputData)}
        />
      </div>
      <div className="confirm-modal-back-button">
        <Button
          text="入力画面に戻る"
          className="cal-btn"
          onClick={closeModal}
        />
      </div>
    </div>
  );
};
