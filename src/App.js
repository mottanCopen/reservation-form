/* eslint react-hooks/exhaustive-deps:off*/
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ReactModal from "react-modal";
import "./App.css";

import { Button } from "./components/calendar/Button";
import { Calendar } from "./components/calendar/Calendar";
import { CalendarMonth } from "./components/calendar/CalendarMonth";
import { TimeSelector } from "./components/form/TimeSelector";
import { ErrorMessage } from "./components/form/ErrorMessage";
import { ConfirmModal } from "./components/form/ConfirmModal";
import { CompleteModal } from "./components/form/CompleteModal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minWidth: "40%",
  },
};

function App() {
  // 表示用定数を宣言
  const week = ["日", "月", "火", "水", "木", "金", "土"];
  const timeTable = [
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
  ];
  // 表示日数(基本7を設定する)
  const displayCount = 7;

  // 取得したカレンダー
  const [calendar, setCalendar] = useState([]);
  // 表示するカレンダー
  const [viewCalendar, setViewCalendar] = useState([]);
  // ページインデックス
  const [pageIndex, setPageIndex] = useState(0);
  // 利用時間リスト
  const [selectableTime, setSelectableTime] = useState([]);
  // 確認モーダル
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);
  // 完了ーダル
  const [completeModalIsOpen, setCompleteModalIsOpen] = useState(false);
  // 入力内容
  const [inputData, setInputData] = useState({});
  // 選択されたタイムインデックス
  const [selectedTimeIndex, setTimeIndex] = useState();
  // Modalの設定
  ReactModal.setAppElement("#root");

  // 入力フォーム
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // 確認ボタン
  const onSubmit = (data) => {
    setConfirmModalIsOpen(true);
    setInputData(data);
  };

  // 予約カレンダーを取得
  useEffect(() => {
    fetch(
      "https://script.google.com/macros/s/AKfycbzEEFjt3gWO2rJTaxXa_YJipt0zyED1uexzH3NYBKfXHmZ7k9SVRxtBLn_flRf7NIkwRw/exec",
      { method: "GET" }
    )
      .then((res) => res.json())
      .then((data) => {
        setCalendar(data);
      });
  }, []);

  // 表示リストを生成
  useEffect(() => {
    const viewList = [];
    for (
      let i = pageIndex * displayCount;
      i < pageIndex * displayCount + displayCount;
      i++
    ) {
      viewList.push(calendar[i]);
    }
    setViewCalendar(viewList);
    console.log(viewCalendar);
  }, [calendar, pageIndex]);

  // 週ボタンの表示非表示を保持
  const [preWeekDisable, setPreWeekDisable] = useState(true);
  const [nextWeekDisable, setNextWeekDisable] = useState(false);

  // 前週ボタン
  const onClickPreWeek = () => {
    if (pageIndex - 1 === 0) {
      // 最前週の場合は前週ボタンを非表示にする
      setPreWeekDisable(true);
    }
    nextWeekDisable && setNextWeekDisable(!nextWeekDisable);
    setPageIndex(pageIndex - 1);
  };

  // 次週ボタン
  const onClickNextWeek = () => {
    const nextIndex = calendar.length / displayCount;
    if (pageIndex + 2 === Math.floor(nextIndex)) {
      // 最後週の場合は次週ボタンを非表示にする
      setNextWeekDisable(true);
    }
    preWeekDisable && setPreWeekDisable(!preWeekDisable);
    setPageIndex(pageIndex + 1);
  };

  // 時間枠をクリックした時の動作
  const onClickSlot = (date, time, dayIndex, timeIndex) => {
    setValue("date", date.toLocaleDateString(), {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("startTime", time, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setTimeIndex(timeIndex);
    const timeTable = [...viewCalendar[dayIndex].timeSlots];
    // 予約可能最大時間数を取得
    let availableCnt = timeIndex;
    const selectableTimeList = [];
    while (availableCnt < timeTable.length) {
      if (timeTable[availableCnt] !== "0") {
        break;
      }
      availableCnt++;
      // 時間を取得
      const availableTime = (availableCnt - timeIndex) / 2;
      // 表示用の値を生成
      const availableTimeHour = Math.floor(availableTime);
      const availableTimeMinute = (availableTime - availableTimeHour) * 60;
      // 選択可能時間を配列に格納
      selectableTimeList.push(
        (availableTimeHour > 0 ? availableTimeHour + "時間" : "") +
          (availableTimeMinute > 0 ? availableTimeMinute + "分" : "")
      );
    }
    setSelectableTime([...selectableTimeList]);
  };

  // 表示リストがundefinedのときはローディング画面を表示
  if (viewCalendar[0] === undefined || viewCalendar[0] === null) {
    return (
      <div className="loading">
        <span className="circle"></span>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="calendar-btn-area">
        <div className="calendar-btn-left">
          <Button
            text="前週"
            className={"cal-btn" + (preWeekDisable ? " disable" : "")}
            onClick={onClickPreWeek}
          />
        </div>
        <div className="calender-center-title">
          <CalendarMonth viewCalendar={viewCalendar} />
        </div>
        <div className="calendar-btn-right">
          <Button
            text="次週"
            className={"cal-btn" + (nextWeekDisable ? " disable" : "")}
            onClick={onClickNextWeek}
          />
        </div>
      </div>
      <div className="calendar-table-area">
        <Calendar
          viewCalendar={viewCalendar}
          timeTable={timeTable}
          week={week}
          onClickSlot={onClickSlot}
        />
      </div>
      <div className="input-area">
        <form onSubmit={handleSubmit(onSubmit)}>
          <table>
            <tbody>
              <tr>
                <th>
                  ご利用日<span className="required">必須</span>
                </th>
                <td>
                  <div className="useDate">
                    <label>日付</label>
                    <input
                      id="date"
                      readOnly
                      className="input-date"
                      {...register("date", {
                        required: {
                          value: true,
                          message: "ご利用日をカレンダーから選択してください。",
                        },
                      })}
                    />
                    {errors.date && <ErrorMessage error={errors.date} />}
                  </div>
                  <div className="startTime">
                    <label>開始時刻</label>
                    <input
                      id="startTime"
                      readOnly
                      className="input-start-time"
                      {...register("startTime", {
                        required: {
                          value: true,
                          message:
                            "ご利用開始時刻をカレンダーから選択してください。",
                        },
                      })}
                    />
                    {errors.startTime && (
                      <ErrorMessage error={errors.startTime} />
                    )}
                  </div>
                  <div className="useTime">
                    <label>利用時間</label>
                    <TimeSelector
                      key="timeSelector"
                      readOnly
                      register={register}
                      selectableTime={selectableTime}
                    />
                    {errors.useTime && <ErrorMessage error={errors.useTime} />}
                  </div>
                </td>
              </tr>
              <tr>
                <th>
                  お名前<span className="required">必須</span>
                </th>
                <td>
                  <input
                    id="name"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "名前を入力してください。",
                      },
                    })}
                  />
                  {errors.name && <ErrorMessage error={errors.name} />}
                </td>
              </tr>
              <tr>
                <th>
                  メールアドレス<span className="required">必須</span>
                </th>
                <td>
                  <input
                    id="Email"
                    {...register("Email", {
                      required: {
                        value: true,
                        message: "メールアドレスを入力してください。",
                      },
                      pattern: {
                        value:
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: "メールアドレスの形式が不正です",
                      },
                    })}
                  />
                  {errors.Email && <ErrorMessage error={errors.Email} />}
                </td>
              </tr>
              <tr>
                <th>
                  電話番号<span className="required">必須</span>
                </th>
                <td>
                  <input
                    id="number"
                    {...register("number", {
                      required: {
                        value: true,
                        message: "電話番号をハイフンなしで入力してください。",
                      },
                      pattern: {
                        value: /^0\d{9,10}$/,
                        message:
                          "電話番号の形式が不正です。ハイフンなしで入力してください。",
                      },
                    })}
                  />
                  {errors.number && <ErrorMessage error={errors.number} />}
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit">確認</button>
        </form>
      </div>
      <ReactModal isOpen={confirmModalIsOpen} style={customStyles}>
        <ConfirmModal
          setConfirmModalIsOpen={setConfirmModalIsOpen}
          setCompleteModalIsOpen={setCompleteModalIsOpen}
          inputData={inputData}
          selectedTimeIndex={selectedTimeIndex}
        />
      </ReactModal>
      <ReactModal isOpen={completeModalIsOpen} style={customStyles}>
        <CompleteModal setCompleteModalIsOpen={setCompleteModalIsOpen} />
      </ReactModal>
    </div>
  );
}

export default App;
