import React from "react";

const ColorSwatch = props => {
  const divStyle = {
    width: "180px",
    height: "60px",
    display: "grid",
    gridTemplateRows: "30px 30px",
    gridTemplateColumns: "repeat(6, 30px)",
    backgroundColor: "yellow"
  };

  return <div style={divStyle}></div>;
};

export default ColorSwatch;
