import React from "react";
import { Button } from "../calendar/Button";

export const ConfirmModal = (props) => {
  const {
    setConfirmModalIsOpen,
    setCompleteModalIsOpen,
    inputData,
    selectedPageIndex,
    selectedDateTime,
  } = props;

  const closeModal = () => {
    setConfirmModalIsOpen(false);
  };

  const submit = (input, selectedData, pageIndex) => {
    const request = createRequest(input, selectedData, pageIndex);
    postReserve(request);
    setConfirmModalIsOpen(false);
    setCompleteModalIsOpen(true);
  };

  // 予約情報を送信
  const postReserve = (postData) => {
    fetch(
      "https://script.google.com/macros/s/AKfycbz9cFTqJbYladMzWd_hgh7SgNsctdp44jXW1s85rkvf1S6-oSA2_vNYvzAVmprFoS8XCg/exec",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      }
    );
  };

  /*
   ** ▼▼▼▼▼▼▼▼▼リクエストフォーマット生成▼▼▼▼▼▼▼▼▼
   */
  const createRequest = (inputData, selectedDateTime, pageIndex) => {
    const { useTime, name, Email, number } = inputData;
    const { date, dayIndex, timeIndex } = selectedDateTime;
    const reqUseTime = Number(useTime);
    const dateIndex = pageIndex * 7 + dayIndex;
    return {
      date: date,
      dateIndex,
      timeIndex: timeIndex,
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
  const convertTime = (index) => {
    const useTime = Number(index) / 2;
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
              <div>{selectedDateTime.date.toLocaleDateString()}</div>
              <div>
                <label>開始時刻：</label>
                {selectedDateTime.time}
              </div>
              <div>
                <label>終了時刻：</label>
                {displayEndTime(
                  convertStartTime(selectedDateTime.time),
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
          onClick={() => submit(inputData, selectedDateTime, selectedPageIndex)}
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
