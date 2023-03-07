import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { Footer } from "./Components/Footer";
import Home from "./pages/Home";
import Unauthorized from "./Components/Unauthorized";
//import RequireAuth from "./Components/RequireAuth";
import "./App.css";

//import Login from './constants/Login';
import Login from "./pages/Login";
import DirectorSide from "./pages/Sidebar/DIRECTORsidebar";
import DriverSide from "./pages/Sidebar/DRIVERsidebar";
import RegisterUser from "./View/Director/registerUser";
import ManageUser from "./View/Director/ManageUser";
import ApprovePurchesingRequest from "./View/Director/ApprovePurchesingRequest";
import GenerateMonthlyReport from "./View/Director/GenerateMonthlyReport";
import FuelRequest from "./View/Driver/FuelRequest";
import HODside from "./pages/Sidebar/HODsidebar";
import RegisterVehicle from "./View/HOD/registerVehicle";
import TransferVehicle from "./View/HOD/transferVehicle";
import MaintenanceRequest from "./View/Driver/MaintenanceRequest";
import EmployeeSide from "./pages/Sidebar/Employeesidebar";
import Complain from "./View/Employee/Complain";
import DrTransferVehicle from "./View/Driver/transferVehicle";
import VehicleRequest from "./View/Employee/VehicleRequest";
import EmergencyReport from "./View/Driver/EmergencyReport";
import DrReceiveVehicle from "./View/Driver/ReceiveVehicle";
import MechanicSide from "./pages/Sidebar/MechanicSide";
import SparePartRequest from "./View/Mechanic/SparepartRequest";
import MaintenanceReport from "./View/Mechanic/MaintenanceReport";
import DrComplain from "./View/Driver/makeComplain";
import AssignVehicle from "./View/HOD/vehicleAssignment";
import RequestPermission from "./View/Employee/requestPermission";
import ReceiveResponse from "./View/Employee/receiveResponse";
import EmpSchedule from "./View/Employee/schedule";
import ReceiveVehicle from "./View/Employee/receiveVehicle";
import VicePresident from "./pages/Sidebar/VicepresidentSidebar";
import StoreSide from "./pages/Sidebar/Store";
import VPComplain from "./View/VicePresident/Complain";
import VPReceiveVehicle from "./View/VicePresident/receiveVehicle";
import VPSchedule from "./View/VicePresident/schedule";
import VPRequestVehicle from "./View/VicePresident/VehicleRequest";
import VPReceiveResponse from "./View/VicePresident/receiveResponse";
import RegisterUserCSV from "./View/Director/RegisterFromcsv";
import ApproveFuelRequest from "./View/HOD/ApprovefuelRequest";
import PrepareSchedule from "./View/HOD/PrepareSchedule";
import ReceiveComplain from "./View/HOD/ReceiveComplain";
import VehicleTracking from "./View/HOD/VehicleTracking";
import MonthlyReport from "./View/HOD/GenerateMonthlyReport";
import ApproveVehicleRequest from "./View/VicePresident/ApproveVehicleRequest";
import VicePresidentSide from "./pages/Sidebar/VicepresidentSidebar";
import ForgetPassword from "./pages/PasswordRecovery";
import MyComponent from "./pages/UserProfile/ProfileHome";
import GDMaintenanceReports from "./View/Garagedirector/MaintenanceReport";
import GDApproveMaintenance from "./View/Garagedirector/ApproveMaintenance";
import AccessoryRequest from "./View/Garagedirector/AccesoryRequest";
import GDMaintenanceOrder from "./View/Garagedirector/MaintenanceOrder";
import GarageDirector from "./pages/Sidebar/GarageDirector";
import FuelDistributerSide from "./pages/Sidebar/FuelDistributer";
import FDApproveFuelRequest from "./View/FuelDistributer/ApproveFuelRequest";
import RegisterDailyFuel from "./View/FuelDistributer/RegisterDailyFuelandOil";
import GuardSide from "./pages/Sidebar/Guard";
import GuardApprovePermission from "./View/Guard/ApprovePermission";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/*public Routes */}
        <Route path="/guard" element={<GuardSide />}></Route>
        <Route
          path="/guard/approvePermission"
          element={<GuardApprovePermission />}
        ></Route>

        <Route path="/fd" element={<FuelDistributerSide />}></Route>
        <Route
          path="/fd/approveFuelRequest"
          element={<FDApproveFuelRequest />}
        ></Route>
        <Route
          path="/fd/registerDailyFuel"
          element={<RegisterDailyFuel />}
        ></Route>

        <Route path="/" element={<Home />}></Route>
        <Route path="/profile" element={<MyComponent />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/forgotpassword" element={<ForgetPassword />}></Route>
        <Route path="/unauthorized" element={<Unauthorized />}></Route>
        <Route path="/director/registerUser" element={<RegisterUser />}></Route>
        <Route
          path="/director/registerUsercsv"
          element={<RegisterUserCSV />}
        ></Route>
        <Route path="/driver/fuelRequest" element={<FuelRequest />}></Route>
        <Route
          path="/driver/transferVehicle"
          element={<DrTransferVehicle />}
        ></Route>
        <Route
          path="/driver/receiveVehicle"
          element={<DrReceiveVehicle />}
        ></Route>
        <Route
          path="/driver/maintenanceRequest"
          element={<MaintenanceRequest />}
        ></Route>

        <Route path="/director/manageUser" element={<ManageUser />}></Route>
        <Route
          path="/director/approvePurchesingRequest"
          element={<ApprovePurchesingRequest />}
        ></Route>
        <Route
          path="/director/generateMonthlyReport"
          element={<GenerateMonthlyReport />}
        ></Route>
        <Route
          path="/hod/registerVehicle"
          element={<RegisterVehicle />}
        ></Route>
        <Route
          path="/hod/transferVehicle"
          element={<TransferVehicle />}
        ></Route>
        <Route path="/hod/scheduling" element={<PrepareSchedule />}></Route>
        <Route
          path="/hod/ApproveFuelRequest"
          element={<ApproveFuelRequest />}
        ></Route>
        <Route path="/hod/complain" element={<ReceiveComplain />}></Route>
        <Route path="/hod/generateReport" element={<MonthlyReport />}></Route>
        <Route path="/hod/vehicleTraking" element={<VehicleTracking />}></Route>
        <Route path="/hod/assignVehicle" element={<AssignVehicle />}></Route>
        <Route path="/employee/makeCoplain" element={<Complain />}></Route>
        <Route
          path="/employee/RequestPermission"
          element={<RequestPermission />}
        ></Route>
        <Route
          path="/employee/receiveResponse"
          element={<ReceiveResponse />}
        ></Route>
        <Route
          path="/employee/receiveVehicle"
          element={<ReceiveVehicle />}
        ></Route>
        <Route path="/employee/viewSchedule" element={<EmpSchedule />}></Route>
        <Route
          path="/employee/requestVehicle"
          element={<VehicleRequest />}
        ></Route>
        <Route
          path="/driver/emergencyReport"
          element={<EmergencyReport />}
        ></Route>
        <Route
          path="/mechanic/sparePartRequest"
          element={<SparePartRequest />}
        ></Route>
        <Route
          path="/mechanic/sendMaintenanceReport"
          element={<MaintenanceReport />}
        ></Route>
        <Route path="/driver/complain" element={<DrComplain />}></Route>
        <Route path="/vp" element={<VicePresidentSide />}></Route>
        <Route path="/vp/complain" element={<VPComplain />}></Route>
        <Route path="/vp/receiveVehicle" element={<VPReceiveVehicle />}></Route>
        <Route path="/vp/schedule" element={<VPSchedule />}></Route>
        <Route path="/vp/requestVehicle" element={<VPRequestVehicle />}></Route>
        <Route
          path="/gd/maintenancereport"
          element={<GDMaintenanceReports />}
        ></Route>
        <Route
          path="/gd/approvemaintenance"
          element={<GDApproveMaintenance />}
        ></Route>
        <Route
          path="/gd/accessoryrequest"
          element={<AccessoryRequest />}
        ></Route>
        <Route
          path="/gd/maintenanceorder"
          element={<GDMaintenanceOrder />}
        ></Route>

        <Route
          path="/vp/approveVehicleRequest"
          element={<ApproveVehicleRequest />}
        ></Route>
        <Route
          path="/vp/receiveResponse"
          element={<VPReceiveResponse />}
        ></Route>

        {/*Protected Routes */}
        {/* <Route element={<RequireAuth allowedRoles={[ROLES.director]}/>}>*/}
        <Route path={"/director"} element={<DirectorSide />} />
        {/*</Route>*/}
        {/* <Route element={<RequireAuth allowedRoles={[ROLES.headOfDeployment]}/>}> */}
        <Route path={"/hod"} element={<HODside />} />
        {/* </Route> */}
        {/* <Route element={<RequireAuth allowedRoles={[ROLES.driver]}/>}> */}
        <Route path={"/driver"} element={<DriverSide />} />
        {/* </Route> */}
        {/* <Route element={<RequireAuth allowedRoles={[ROLES.driver]}/>}> */}
        <Route path={"/employee"} element={<EmployeeSide />} />
        {/* </Route> */}
        {/* <Route element={<RequireAuth allowedRoles={[ROLES.driver]}/>}> */}
        <Route path={"/mechanic"} element={<MechanicSide />} />
        {/* </Route> */}
        {/* <Route element={<RequireAuth allowedRoles={[ROLES.driver]}/>}> */}
        <Route path={"/vicepresident"} element={<VicePresident />} />
        {/* </Route> */}
        {/* <Route element={<RequireAuth allowedRoles={[ROLES.Store]}/>}> */}
        <Route path={"/store"} element={<StoreSide />} />
        {/* </Route> */}
        {/* <Route element={<RequireAuth allowedRoles={[ROLES.Garage Director]}/>}> */}
        <Route path={"/garagedirector"} element={<GarageDirector />} />
      </Routes>

      <Footer />
    </Router>
  );
}
export default App;
