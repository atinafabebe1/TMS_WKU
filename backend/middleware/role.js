const {
  ROLE_DIRECTOR,
  ROLE_DRIVER,
  ROLE_EMPLOYEE,
  ROLE_FUELDISTRUBTOR,
  ROLE_GARAGEDIRECTOR,
  ROLE_HEADOFDEPLOYMENT,
  ROLE_MECHANIC,
  ROLE_VICEPRESIDENT,
} = require("../constants/index");
const ROLES = {
  director: ROLE_DIRECTOR,
  driver: ROLE_DRIVER,
  employee: ROLE_EMPLOYEE,
  fuelDistrubtor: ROLE_FUELDISTRUBTOR,
  garageDirector: ROLE_GARAGEDIRECTOR,
  headOfDeployment: ROLE_HEADOFDEPLOYMENT,
  mechanic: ROLE_MECHANIC,
  vicePresident: ROLE_VICEPRESIDENT,
};

//Grant access to specific roles
const checkRole =
  (...roles) =>
  (req, res, next) => {
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }

    const hasRole = roles.find((role) => req.user.role === role);
    if (!hasRole) {
      return res.status(403).send("You can't request.");
    }

    return next();
  };

const role = { ROLES, checkRole };

module.exports = role;
