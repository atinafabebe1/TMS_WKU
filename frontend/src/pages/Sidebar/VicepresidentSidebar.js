import React, { useState } from "react";
import { Side1, Side2 } from "./SidebarData/VP";

const VicePresidentSide = () => {
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
      <div className="field">
        <div className="App">
          <h4>VP </h4>
        </div>
      </div>
    </div>
  );
};
export default VicePresidentSide;
