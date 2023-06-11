import React from "react";
import { Button } from "../calendar/Button";

export const CompleteModal = (props) => {
  const { setCompleteModalIsOpen } = props;

  const closeModal = () => {
    setCompleteModalIsOpen(false);
  };

  return (
    <div className="complete-modal-contents">
      <h2>予約が完了しました</h2>
      <p>予約完了メールを送信いたしましたので、ご確認ください。</p>
      <div className="complete-reservation-number">
        <h4>予約番号</h4>
        <p>{Math.floor(Math.random() * 10000)}</p>
      </div>
      <h4>入室方法について</h4>
      <p>
        ご予約日の前日に入退室方法のご案内をメールにて送信いたします。
        <br />
        くわしくは、ご利用方法をご確認ください。
      </p>
      <Button text="トップに戻る" className="cal-btn" onClick={closeModal} />
    </div>
  );
};
