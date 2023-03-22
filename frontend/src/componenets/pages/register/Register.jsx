import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Form from "../../common/form/Form";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
}));

const SignUpPage = () => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    // Perform SignUp logic here
    console.log("Email: ", email);
    console.log("Password: ", password);
  };

  const fields = [
    {
      type: "text",
      label: "Username",
      name: "username",
      value: userName,
      onChange: handleUsernameChange,
      required: true,
    },
    {
      type: "email",
      label: "Email",
      name: "email",
      value: email,
      onChange: handleEmailChange,
      required: true,
    },
    {
      type: "password",
      label: "Password",
      name: "password",
      value: password,
      onChange: handlePasswordChange,
      required: true,
    },
  ];

  return (
    <div className={classes.container}>
      <div className={classes.formContainer}>
        <h2>SignUp</h2>
        <Form fields={fields} onSubmit={handleSubmit} submitText="Register" />
      </div>
    </div>
  );
};

export default SignUpPage;
