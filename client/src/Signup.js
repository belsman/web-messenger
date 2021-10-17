import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { TextField, FormHelperText } from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import AuthPage from "./AuthPage";

const Signup = (props) => {
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  const FormFields = () => (
    <>
      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        autoFocus
      />

      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
      />

      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />

      <TextField
        label="Confirm Password"
        aria-label="confirm password"
        type="password"
        inputProps={{ minLength: 6 }}
        name="confirmPassword"
        fullWidth
        required
      />

      <FormHelperText>
        {formErrorMessage.confirmPassword}
      </FormHelperText>
    </>
  );

  return (
    <AuthPage
      promptText="Already have an account?"
      promptButtonText="Login"
      alternateUrl="/login"
      formHeader="Create an account."
      submitText="Create"
      onSubmitHandler={handleRegister}
    >
      <FormFields />
    </AuthPage>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
