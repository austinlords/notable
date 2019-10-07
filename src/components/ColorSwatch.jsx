import React, { useState, useEffect } from "react";

const ColorSwatch = props => {
  const [colors, setColor] = useState([
    "#BCAAA4",
    "#EF9A9A",
    "#C5E1A5",
    "#FFCC80",
    "#CE93D8",
    "#4FC3F7"
  ]);
  const [activeColor, setActiveColor] = useState(props.color);

  const componentStyle = {
    width: "180px",
    height: "60px",
    display: "grid",
    gridTemplateRows: "30px 30px",
    gridTemplateColumns: "auto"
  };

  const divStyle = {
    width: "180px",
    height: "30px",
    display: "grid",
    gridTemplateColumns: "repeat(6, 30px)"
  };

  const swatchStyle = {
    width: "100%",
    height: "100%",
    padding: "2px"
  };

  return (
    <div style={componentStyle}>
      <div style={divStyle}>
        {colors.map(c => (
          <div style={swatchStyle}>
            <div
              style={{ backgroundColor: c }}
              className="w100 h100 hover-grow-10 clickable"
              data={c}
              onClick={() => setActiveColor()}
            ></div>
          </div>
        ))}
      </div>
      <div></div>
    </div>
  );
};

export default ColorSwatch;
