import React from "react";

export default function ProgressBar({ visible }) {
  if (visible) {
    return (
      <div className="progressBar">
        <div className="slider">
          <div className="line"></div>
          <div className="subline inc"></div>
          <div className="subline dec"></div>
        </div>
      </div>
    );
  }
  return null;
}
