import React, { useEffect, useState } from "react";

export default function CountDown({ eventTime }) {
  const [currentTime, setCurrentTime] = useState(Date.now());

  const timeBetween = eventTime * 1000 - currentTime;
  //console.log(eventTime);
  const seconds = Math.floor((timeBetween / 1000) % 60);
  const minutes = Math.floor((timeBetween / 1000 / 60) % 60);
  const hours = Math.floor((timeBetween / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeBetween / (1000 * 60 * 60 * 24));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="special-offers-wrapper">
      <div
        className="product-countdown-container text-white align-items-center"
        style={{ textAlign: "center" }}
      >
        <label className="d-block text-default">Hurry Up! Offer End In:</label>
        <div
          className="product-countdown countdown-compact font-weight-bold text-dark is-countdown"
          data-until="+10d"
          data-relative="true"
          data-compact="false"
          data-labels-short="true"
        >
          <span className="countdown-row countdown-show4">
            <span className="countdown-section">
              <span className="countdown-amount">{days}</span>
              <span className="countdown-period">Days</span>
            </span>
            <span className="countdown-section">
              <span className="countdown-amount">{hours}</span>
              <span className="countdown-period">Hrs</span>
            </span>
            <span className="countdown-section">
              <span className="countdown-amount">{minutes}</span>
              <span className="countdown-period">Mins</span>
            </span>
            <span className="countdown-section">
              <span className="countdown-amount">{seconds}</span>
              <span className="countdown-period">Secs</span>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
