import React, { useState } from "react";
import axios from "axios";

const UploadVehicleImage = () => {
  const [newVehicleImage, setNewVehicleImage] = useState({
    title: "",
    description: "",
    photo: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", newVehicleImage.photo);
    formData.append("description", newVehicleImage.description);
    formData.append("title", newVehicleImage.title);

    axios
      .put("/VehicleRecord/64010e38024295cea5045008/image", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setNewVehicleImage({ ...newVehicleImage, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    setNewVehicleImage({ ...newVehicleImage, photo: e.target.files[0] });
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input
        type="file"
        accept=".png, .jpg, .jpeg"
        name="photo"
        onChange={handlePhoto}
      />

      <input
        type="text"
        placeholder="title"
        name="title"
        value={newVehicleImage.title}
        onChange={handleChange}
      />

      <input
        type="text"
        placeholder="description"
        name="description"
        value={newVehicleImage.description}
        onChange={handleChange}
      />

      <input type="submit" />
    </form>
  );
};

export default UploadVehicleImage;
