import React, { useState } from "react";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // validate form data
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // make API request to change password
    fetch("/user/changepassword", {
      method: "POST",
      body: JSON.stringify({ currentPassword, newPassword }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        // handle successful password change
        alert("Password changed successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setError("");
      })
      .catch((error) => {
        // handle password change error
        setError("Failed to change password");
      });
  };

  return (
    <form className="change-password-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="currentPassword">Current Password:</label>
        <input
          type="password"
          id="currentPassword"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
      </div>
      {error && <div className="error">{error}</div>}
      <button type="submit">Change Password</button>
    </form>
  );
}

export default ChangePassword;
