// import { PieChart } from "react-minimal-pie-chart";
// import React, { useState, useEffect } from "react";
// import api from "../../../api/api";

function UserPieChart() {
  //   const [users, setUsers] = useState([]);
  //   const [driverCount, setDriverCount] = useState(0);
  //   const [employeeCount, setEmployeeCount] = useState(0);
  //   const [mechanicCount, setMechanicCount] = useState(0);

  //   const fetchUsersInformation = async () => {
  //     try {
  //       const driverResponse = await api.get("/user/getusers?role=ROLE_DRIVER");
  //       setDriverCount(driverResponse.data.count);

  //       const employeeResponse = await api.get(
  //         "/user/getusers?role=ROLE_EMPLOYEE"
  //       );
  //       setEmployeeCount(employeeResponse.data.count);

  //       const mechanicResponse = await api.get(
  //         "/user/getusers?role=ROLE_MECHANIC"
  //       );
  //       setMechanicCount(mechanicResponse.data.count);

  //       setUsers([
  //         ...driverResponse.data.data,
  //         ...employeeResponse.data.data,
  //         ...mechanicResponse.data.data,
  //       ]);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchUsersInformation();
  //   }, []);

  //   const labels = [
  //     { title: "Driver", value: driverCount },
  //     { title: "Mechanic", value: mechanicCount },
  //     { title: "Employee", value: employeeCount },
  //   ];

  return (
    //     <>
    //       <div style={{ display: "flex", paddingLeft: "100px" }}>
    //         <div>
    //           <PieChart
    //             style={{
    //               width: "400px",
    //               paddingLeft: "90px",
    //               padding: "50px",
    //             }}
    //             data={[
    //               { title: "Driver", value: driverCount, color: "#3B71CA" },
    //               { title: "Mechanic", value: mechanicCount, color: "#54B4D3" },
    //               { title: "Employee", value: employeeCount, color: "#DC4C64" },
    //             ]}
    //             label={({ dataEntry }) => `${dataEntry.title}`}
    //             labelStyle={{
    //               fontSize: "6px",
    //               color: "primary",
    //               fontWeight: "bold",
    //             }}
    //           />
    //         </div>
    //         <div style={{ paddingTop: "70px" }}>
    //           {labels.map((label, index) => (
    //             <div key={index}>
    //               <span
    //                 style={{
    //                   display: "inline-block",
    //                   width: "10px",
    //                   height: "10px",
    //                   backgroundColor: label.color,
    //                   marginRight: "5px",
    //                 }}
    //               ></span>
    //               <p
    //                 style={{
    //                   fontSize: "18px",
    //                   color: "purple",
    //                   fontWeight: "bold",
    //                 }}
    //               >
    //                 {label.title}: {label.value}
    //               </p>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     </>
    <div></div>
  );
}

export default UserPieChart;
