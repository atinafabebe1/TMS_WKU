import React from "react";

function DaysAgo({ createdAt }) {
  const oneDay = 24 * 60 * 60 * 1000; // in milliseconds
  const createdDate = new Date(createdAt);
  const today = new Date();
  const daysAgo = Math.round(Math.abs((today - createdDate) / oneDay));

  if (
    createdDate.getFullYear() === today.getFullYear() &&
    createdDate.getMonth() === today.getMonth() &&
    createdDate.getDate() === today.getDate()
  ) {
    return <span>Today</span>;
  }

  return (
    <span>
      {daysAgo} day{daysAgo === 1 ? "" : "s"} ago
    </span>
  );
}

export default DaysAgo;
