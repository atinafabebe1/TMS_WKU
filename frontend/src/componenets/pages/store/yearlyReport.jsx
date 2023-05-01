import React, { useState, useEffect } from "react";

function YearlySpareParts() {
  const [spareParts, setSpareParts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const threeDaysAgo = new Date(
        Date.now() - 365 * 24 * 60 * 60 * 1000
      ).toISOString();
      const response = await fetch(
        `/Request/sparePart?createdAt_gte=${threeDaysAgo}&status=completed`
      );
      const data = await response.json();

      // group the spare parts by ID using an object
      const groupedSpareParts = data.reduce((acc, curr) => {
        if (!acc[curr.id]) {
          acc[curr.id] = { parts: [curr], quantity: curr.quantity };
        } else {
          acc[curr.id].parts.push(curr);
          acc[curr.id].quantity += curr.quantity;
        }
        return acc;
      }, {});

      setSpareParts(groupedSpareParts);
    };
    fetchData();
  }, []);

  return (
    <div>
      {Object.entries(spareParts).map(([id, { parts, quantity }]) => (
        <div key={id}>
          <h2>ID: {id}</h2>
          <p>Total quantity: {quantity}</p>
          {parts.map((part) => (
            <div key={part.id}>
              <p>{part.quantity}</p>
              <p>{part.createdAt}</p>
              <p>{part.status}</p>
              <p>Quantity: {part.quantity}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default YearlySpareParts;
