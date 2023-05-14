# TMS_WKU
WKU-TMS is a Transport Management System for College that is built with MongoDB, Express, React and Node.js. It is designed to provide an efficient and reliable way of managing transportation services for students and staff at a college.
## Features
- Scheduling of trips, 
- Monitoring of driver performance and vehicles, 
- Generating reports on usage and expenses, 
- And more. 

## Installation
To run this app locally, you need to have Node.js and MongoDB installed on your machine. Then follow these steps:

- Clone this repository: git clone https://github.com/atinafabebe1/TMS_WKU.git
- Navigate to the project folder: cd TMS_WkU
- Navigate to the backend folder: cd backend
- Install the dependencies: npm install
- Start the server: nodemon server.js or node server.js
- Open another terminal and navigate to the frontend folder: cd frontend
- Install the dependencies: npm install
- Start the client: npm start
- Open your browser and go to http://localhost:3000

## Environment Variables
This app requires some environment variables to run properly. These variables are stored in a file called .env in the TMS_WKU/backend folder of the project. The .env file is not included in this repository for security reasons. If you want to run this app locally, you need to create your own .env file and fill it with the following variables:

- PORT= The port number on which the server will run
- JWT_SECRET= Secret key used to sign JSON Web Tokens for authentication
- REFERESH_JWT_SECRET= Secret key used to sign refresh tokens for authentication
- JWT_EXPIRE= Expiration time for JSON Web Tokens
- REFRESH_JWT_EXPIRE= Expiration time for refresh tokens
- JWT_COOKIE_EXPIRE= Expiration time for JSON Web Token cookies
- MONGO_URI= The connection string to your MongoDB database
- SMTP_HOST= The hostname of the SMTP server for sending emails
- SMTP_PORT= The port number of the SMTP server for sending emails
- FROM_EMAIL= The email address from which emails will be sent
- FROM_NAME= The display name associated with the email address
- EMAIL_PASSWORD= The password for the email address used to send emails

If you don’t have a .env file, please contact me at https://t.me/Oliyadm and I will send you one.

## Demo Credentials
To test the app with different roles, you can use the following credentials to log in: A password for all demo account is asdASD123!@#

Administrator: atinafabebe1@gmail.com
HeadofDeployment: abrehamhod@gmail.com
FuelDistrubtor: fueld123@gmail.com
Driver: driver1@gmail.com
Employee: employe@gmail.com

Please note that these credentials are for demo purposes only and should not be used in production.
