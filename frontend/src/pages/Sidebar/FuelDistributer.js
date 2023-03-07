import React, { useState } from "react";
import { Side1, Side2 } from "./SidebarData/FD";
const FuelDistributerSide = () => {
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
        <p>Fuel Distributer</p>
      </div>
    </div>
  );
};
export default FuelDistributerSide;
