import React, { useState } from "react";
import { Side1, Side2 } from "./SidebarData/Employee";
import UserTab from "../../Common/userTab";
const EmployeeSide = () => {
  const [toggle, setToggle] = useState(true);
  return (
    <div className="view">
      <div className="sidebar">
        <div class="d-grid">
          <button
            onClick={() => setToggle(!toggle)}
            class="btn btn btn-outline-secondary mb-5"
          >
            Menu
          </button>
        </div>
        <hr></hr>
        {toggle && <Side1 />}
        {!toggle && <Side2 />}
      </div>
      <div className="page">
        <div className="App">
          <UserTab />
        </div>
      </div>
    </div>
  );
};
export default EmployeeSide;
