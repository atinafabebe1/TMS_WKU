require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss_clean = require("xss-clean");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");
const fs = require("fs");
const socket = require("socket.io");
const errorHandler = require("./middleware/error");
const cron = require("node-cron");
const compression = require("compression");
const redis = require("redis");

//Route files
const UserRouter = require("./routes/user");
const VehiclesRecord = require("./routes/RegisterVehicle");
const VehicleRequest = require("./routes/vehicleRequest");
const VehicleTransfer = require("./routes/vehicleTransfer");
const FuelRequest = require("./routes/fuelRequest");
const Admin = require("./routes/admin");
const MaintenanceRequest = require("./routes/maintenanceRequest");
const EmergencyReport = require("./routes/emergencyReport");
const SparePartRequest = require("./routes/sparePartRequest");
const MaintenanceOrder = require("./routes/maintenanceOrder");
const MaintenanceReport = require("./routes/maintenanceReport");
const monthlyReport = require("./routes/monthlyReport");
const Complain = require("./routes/complains");
const DailyFuelCost = require("./routes/dailyFuelCost");
const WorkdayScehdule = require("./routes/serviceSchedule");
const FuelResource = require("./routes/fuelResource");
const { generateMonthlyReport } = require("./controllers/monthlyReport");

const mongoose = require("mongoose");
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(compression());

// log HTTP requests using Morgan
app.use(morgan("combined"));

// Serve static files from the "public" directory
app.use(express.static("public"));

// const API_KEY = process.env.API_KEY;

//Sanitize mongoose
app.use(mongoSanitize());

//Set security headers
app.use(helmet());

//prevent XSS attack
app.use(xss_clean());

//Rate limit
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, //10 mintues
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
});

//prevent http param pollution
app.use(hpp());

app.use(limiter);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//Mount files
app.use("/user", UserRouter, Admin);
app.use("/VehicleRecord", VehiclesRecord);
app.use(
  "/Request/",
  VehicleRequest,
  VehicleTransfer,
  MaintenanceRequest,
  FuelRequest,
  SparePartRequest
);
app.use("/EmergencyReport", EmergencyReport);
app.use("/MaintenanceOrder", MaintenanceOrder);
app.use("/MaintenanceReport", MaintenanceReport);
app.use("/Report", monthlyReport, DailyFuelCost);
app.use("/Complain", Complain);
app.use("/Schedule", WorkdayScehdule);
app.use("/Resources", FuelResource);

app.use(errorHandler);

// connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");

    // find admin user with ROLE_ADMIN role
    const db = mongoose.connection;
    db.collection("users").findOne(
      { role: "ROLE_ADMIN" },
      function (err, adminUser) {
        if (err) {
          console.error(err);
          return;
        }

        if (adminUser) {
          console.log("Admin user found:", adminUser.email);

          // start the server
          app.listen(process.env.PORT, () => {
            console.log(`Server started on port ${process.env.PORT}`);

            cron.schedule("* */14 * * *", async () => {
              await generateMonthlyReport();
            });
          });
        } else {
          console.error("No admin user found!");
        }
      }
    );
  })
  .catch((error) => {
    console.log(error);
  });
