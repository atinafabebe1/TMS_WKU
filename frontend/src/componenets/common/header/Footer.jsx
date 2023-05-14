import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';

const Footer = () => {
  return (
    <div className="footer-container">
      <MDBFooter
        bgColor="#4e7499"
        className="text-center text-lg-start text-muted"
        style={{
          position: 'fixed',
          bottom: 0,
          width: '100%'
        }}
      >
        <div className="text-center p-2" style={{ backgroundColor: '#4e7499' }}>
          <h6 style={{ color: 'white' }}>© 2023 Wolkite University</h6>
        </div>
      </MDBFooter>
      <style>{`
        .footer-container {
          padding-bottom: 60px;
        }

        .footer {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          height: 40px;
          background-color: #4e7499;
          color: white;
          font-size: 16px;
          position: fixed;
          bottom: 0;
          width: 100%;
        }

        .footer h6 {
          margin: 0;
          padding: 0;
          font-size: 16px;
        }
      `}</style>
      <div className="footer">
        <h6>© 2023 Wolkite University</h6>
      </div>
    </div>
  );
};

export default Footer;
