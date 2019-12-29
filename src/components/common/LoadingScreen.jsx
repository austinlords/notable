import React from "react";

const LoadingScreen = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#eee",
        display: "flex"
      }}
    >
      <div
        style={{
          margin: "auto",
          alignContent: "center",
          justifyItems: "center"
        }}
      >
        <div className="loader"></div>
        <div style={{ textAlign: "center", margin: "10px auto" }}>
          loading...{" "}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
