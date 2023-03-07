import React from "react";
import { MDBFooter } from "mdb-react-ui-kit";

export const Footer = () => {
  return (
    <MDBFooter
      bgColor="#4e7499"
      className="text-center text-lg-start text-muted"
    >
      <hr color="white" />
      <div className="text-center p-2" style={{ backgroundColor: "#4e7499" }}>
        <h6 style={{ color: "white" }}>© 2023 Copyright Wolkite University</h6>
      </div>
    </MDBFooter>
  );
};
