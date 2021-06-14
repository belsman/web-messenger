import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { TextField } from "@material-ui/core";
import AuthPage from "./AuthPage";
import { login } from "./store/utils/thunkCreators";

const Login = (props) => {
  const { user, login } = props;
  
  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    await login({ username, password });
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
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
    </>
  );

  return (
    <AuthPage
      promptText="Don’t have an account?"
      promptButtonText="Create account"
      alternateUrl="/register"
      formHeader="Welcome back!"
      submitText="Login"
      onSubmitHandler={handleLogin}
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
