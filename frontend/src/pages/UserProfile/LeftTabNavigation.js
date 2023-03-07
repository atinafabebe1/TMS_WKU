import React, { useState } from "react";

function LeftTabNavigation({ tabs, activeTab, onTabClick }) {
  return (
    <div className="left-tab-navigation">
      <ul>
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className={tab.id === activeTab ? "active" : ""}
            onClick={() => onTabClick(tab.id)}
          >
            {tab.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LeftTabNavigation;
