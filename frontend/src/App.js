import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import PrivateRoute from "./componenets/common/privateRoute/PrivateRoute";
import LoginPage from "./componenets/pages/login/Login";
import LogoutButton from "./componenets/pages/logout/Logout";
import Unauthorized from "./componenets/pages/unauthorized/Unauthorized";
import AdminPage from "./componenets/pages/admin/AdminPage";
import DirectorPage from "./componenets/pages/director/DirectorPage";
import EmployeePage from "./componenets/pages/employee/EmployeePage";
import DriverPage from "./componenets/pages/driver/DriverPage";
import MechanicPage from "./componenets/pages/mechanic/MechanicPage";
import FuelDistrubtorPage from "./componenets/pages/fuelDistrubtor/FuelDistrubtorPage";
import GarageDirectorPag from "./componenets/pages/garageDirector/GarageDirectorPage";
import VicePresidentPage from "./componenets/pages/vicePresident/VicePresidentPage";
import HeadOfDeploymentPage from "./componenets/pages/headOfDeploymnet/HeadOfDeploymentPage";
import StorePage from "./componenets/pages/store/StorePage";
import GuardPage from "./componenets/pages/guard/GuardPage";
import PublicScheduleTable from "./componenets/common/schedule/viewSchedule";
import Footer from "./componenets/common/header/Footer";
import {
  ROLE_ADMIN,
  ROLE_DIRECTOR,
  ROLE_DRIVER,
  ROLE_EMPLOYEE,
  ROLE_FUELDISTRUBTOR,
  ROLE_GARAGEDIRECTOR,
  ROLE_HEADOFDEPLOYMENT,
  ROLE_MECHANIC,
  ROLE_VICEPRESIDENT,
  ROLE_STORE,
  ROLE_GUARD,
} from "./constants";
import LandingPage from "./componenets/pages/home/Home";

function App() {
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutButton />} />
          <Route path="/publschedule" element={<PublicScheduleTable />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route
            path="/admin/*"
            element={<PrivateRoute role={ROLE_ADMIN} element={AdminPage} />}
          />
          <Route
            path="/hd/*"
            element={
              <PrivateRoute
                role={ROLE_HEADOFDEPLOYMENT}
                element={HeadOfDeploymentPage}
              />
            }
          />
          <Route
            path="/fd/*"
            element={
              <PrivateRoute
                role={ROLE_FUELDISTRUBTOR}
                element={FuelDistrubtorPage}
              />
            }
          />
          <Route
            path="/driver/*"
            element={<PrivateRoute role={ROLE_DRIVER} element={DriverPage} />}
          />
          <Route
            path="/employee/*"
            element={
              <PrivateRoute role={ROLE_EMPLOYEE} element={EmployeePage} />
            }
          />
          <Route
            path="/director/*"
            element={
              <PrivateRoute role={ROLE_DIRECTOR} element={DirectorPage} />
            }
          />

          <Route
            path="/mechanic/*"
            element={
              <PrivateRoute role={ROLE_MECHANIC} element={MechanicPage} />
            }
          />
          <Route
            path="/gd/*"
            element={
              <PrivateRoute
                role={ROLE_GARAGEDIRECTOR}
                element={GarageDirectorPag}
              />
            }
          />
          <Route
            path="/vp/*"
            element={
              <PrivateRoute
                role={ROLE_VICEPRESIDENT}
                element={VicePresidentPage}
              />
            }
          />
          <Route
            path="/store/*"
            element={<PrivateRoute role={ROLE_STORE} element={StorePage} />}
          />
          <Route
            path="/guard/*"
            element={<PrivateRoute role={ROLE_GUARD} element={GuardPage} />}
          />
        </Routes>
      </>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
