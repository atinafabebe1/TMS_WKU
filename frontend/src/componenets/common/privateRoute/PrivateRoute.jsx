import { Navigate, Route } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
const PrivateRoute = ({ role, element: Component, ...rest }) => {
  const {user} =useAuth()

  if (!user) {
      console.log("no user ")
      return <Navigate to="/login" />;
    }
  if (user.role !== role) {
    return <Navigate to="/unauthorized" />;
  }

  return <Component/>;
};
export default PrivateRoute;

