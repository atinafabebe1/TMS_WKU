import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
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
import GarageDirectorPage from "./componenets/pages/garageDirector/GarageDirectorPage";
import VicePresidentPage from "./componenets/pages/vicePresident/VicePresidentPage";
import HeadOfDeploymentPage from "./componenets/pages/headOfDeploymnet/HeadOfDeploymentPage";
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
} from "./constants";
import UserProfile from "./componenets/common/profile/profile";

function App() {
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutButton />} />
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
            path="/fd"
            element={
              <PrivateRoute
                role={ROLE_FUELDISTRUBTOR}
                element={FuelDistrubtorPage}
              />
            }
          />
          <Route
            path="/driver"
            element={<PrivateRoute role={ROLE_DRIVER} element={DriverPage} />}
          />
          <Route
            path="/employee/*"
            element={
              <PrivateRoute role={ROLE_EMPLOYEE} element={EmployeePage} />
            }
          />
          <Route
            path="/director"
            element={
              <PrivateRoute role={ROLE_DIRECTOR} element={DirectorPage} />
            }
          />
          <Route
            path="/gd"
            element={
              <PrivateRoute
                role={ROLE_GARAGEDIRECTOR}
                element={<GarageDirectorPage />}
              />
            }
          />
          <Route
            path="/mechanic"
            element={
              <PrivateRoute role={ROLE_MECHANIC} element={MechanicPage} />
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
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
