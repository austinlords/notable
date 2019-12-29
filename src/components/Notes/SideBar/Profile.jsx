import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import AppContext from "../../../context/AppContext";

const Profile = () => {
  // to get User data
  const _APP = useContext(AppContext);

  let profileDivStyle = {
    background: "black",
    height: "100%",
    width: "100%",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px"
  };

  let profileContentStyle = {
    display: "grid",
    gridTemplateColumns: "20% auto",
    width: "100%",
    cursor: "pointer"
  };

  return (
    <div id="profile-preview" style={profileDivStyle}>
      <div style={profileContentStyle}>
        <div style={{ display: "flex", margin: "auto" }}>
          <FontAwesomeIcon icon={faUserCircle} />
        </div>
        <div style={{ fontSize: "11px" }}>
          {(_APP.user && _APP.user.email) || "DEMO MODE"}
        </div>
      </div>
    </div>
  );
};

export default Profile;
