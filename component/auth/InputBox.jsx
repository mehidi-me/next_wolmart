import React from "react";

export default function InputBox({ type, name, label, error }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={type}
        className="form-control"
        name={name}
        id={name}
        style={
          error ? (error.type == name ? { borderColor: "red" } : null) : null
        }
      />
      {error ? (
        error.type == name ? (
          <p style={{ color: "red" }}>{error.msg}</p>
        ) : null
      ) : null}
    </div>
  );
}
