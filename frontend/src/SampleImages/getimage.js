import React, { useState, useEffect } from "react";

function VehicleImage({ vehicleId }) {
  vehicleId = "0adabf54-176e-417f-b5c1-28f42c732371-1678022904567.jpg";
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetch(`/vehiclerecord/${vehicleId}/image`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch vehicle image");
        }
        return response.blob();
      })
      .then((imageBlob) => {
        const url = URL.createObjectURL(imageBlob);
        setImageUrl(url);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [vehicleId]);

  return (
    <img
      style={{ width: 300, height: 300, borderRadius: 150, objectFit: "cover" }}
      src={imageUrl}
      alt="Vehicle"
    />
  );
}

export default VehicleImage;
