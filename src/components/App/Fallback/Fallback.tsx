import React from "react";

const style = {
  background: "#333",
  height: "100vh",
  position: "fixed",
  width: "100vw",
  zIndex: 1000,
  top: 0,
  left: 0,
} as React.CSSProperties;

const innerStyle = {
  bottom: 0,
  height: "40px",
  left: 0,
  margin: "auto",
  position: "absolute",
  fontSize: "35px",
  right: 0,
  textAlign: "center",
  top: "140px",
  color: "#fff",
} as React.CSSProperties;

const loaderStyle = {
  width: "226px",
  height: "226px",
  background: "url(/assets/images/loading.gif)",
  position: "absolute",
  top: "-130px",
  bottom: 0,
  left: 0,
  right: 0,
  margin: "auto",
  borderRadius: "50%",
} as React.CSSProperties;

export default (): JSX.Element => (
  <div style={style}>
    <span style={loaderStyle} />
    <p style={innerStyle}>Loading...</p>
  </div>
);
