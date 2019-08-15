import React from "react";

const SideBar = ({ navbarHeight }) => {
  return (
    <div
      style={{
        width: "300px",
        height: `calc(100vh - ${navbarHeight}`,
        background: "#eee"
      }}
    />
  );
};

export default SideBar;
