import React, { useState } from "react";

function EditProfile() {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // make API
    fetch("/user/update", {
      method: "POST",
      body: JSON.stringify({
        userName,
        firstName,
        lastName,
        phoneNumber,
        email,
        address,
        bio,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        // handle successful change
        alert("Profile updated successfully!");
        setFirstName("");
        setLastName("");
        setUserName("");
        setPhoneNumber("");
        setEmail("");
        setAddress("");
        setBio("");
        setError("");
      })
      .catch((error) => {
        // handle change error
        setError("Failed to Update");
      });
  };

  return (
    <form className="change-password-form" onSubmit={handleSubmit}>
      <div>
        <label>User Name</label>
        <input type="name" />
      </div>
      <div>
        <label>First Name</label>
        <input type="name" />
      </div>
      <div>
        <label>Last Name</label>
        <input type="name" />
      </div>
      <div>
        <label>Email</label>
        <input type="email" />
      </div>
      <div>
        <label>Phone Number</label>
        <input type="number" />
      </div>
      <div>
        <label>Address</label>
        <input type="name" />
      </div>
      <div>
        <label>Bio</label>
        <input type="name" />
      </div>
      {error && <div className="error">{error}</div>}
      <button type="submit">Update</button>
    </form>
  );
}

export default EditProfile;
