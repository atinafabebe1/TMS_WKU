import React from "react";
import { MDBFooter } from "mdb-react-ui-kit";

const Footer = () => {
  return (
    <MDBFooter
      bgColor="#4e7499"
      className="text-center text-lg-start text-muted"
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
    >
      <div className="text-center p-2" style={{ backgroundColor: "#4e7499" }}>
        <h6 style={{ color: "white" }}>
          © 2023 Wolkite University. All rights reserved.
        </h6>
      </div>
    </MDBFooter>
  );
};
export default Footer;
