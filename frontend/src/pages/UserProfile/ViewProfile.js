import React from "react";

const UserProfile = () => {
  return (
    <div className="user-profile">
      {/* <img alt="User Avatar" className="avatar" /> */}
      <div className="user-details">
        <h2 className="name">Keyeron Sisay</h2>
        <p className="email">ab1234@gmail.com</p>
        <p className="bio">Being Perfect</p>
        <ul className="social-links">
          <li>
            <i className="fa fa-twitter"> Twitter</i>
          </li>
          <li>
            <i className="fa fa-facebook">Face Book</i>
          </li>
          <li>
            <i className="fa fa-linkedin">Linkedin</i>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
