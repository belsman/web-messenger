import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  Paper,
  Hidden,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { login } from "./store/utils/thunkCreators";
import bgImage from './bg-img.png';
import logo from './bubble.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    background: '#3A8DFF',
    backgroundImage: `url(${bgImage})`,
    backgroundImage: `linear-gradient(to bottom, rgba(58,141,255, 0.85), rgba(134, 185, 255)), url(${bgImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    padding: '2rem',
  },
  submit: {
    padding: '0.8rem 3.5rem',
    backgroundColor: '#3A8DFF',
    color: '#fff',
  },
  accountType: {
    display: 'flex',
    justifyContent: 'right',
    alignItems: 'center',
  },
  accountBtn: {
    backgroundColor: '#fff',
    color: '#3A8DFF',
    textTransform: 'capitalize',
    boxShadow: '0 5px 8px 0 rgba(0, 0, 0, 0.3)',
    marginLeft: '1rem',
  },
  heroText: {
    fontSize: '2rem',
    width: '75%',
    margin: 'auto',
    color: '#fff',
  },
  imgLogo: {
    marginBottom: '2rem',
  },
  smallLogo: {
    backgroundColor: '#3A8DFF',
    borderRadius: '50%'
  }
}));

const Login = (props) => {
  const classes = useStyles();

  const history = useHistory();
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

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={5} className={classes.image}>
        <Hidden only="xs">
          <Typography align="center" variant="h2" className={classes.heroText}>
            <img src={logo} alt="Logo" /><br/><br />
            Converse with anyone with any language
          </Typography>
        </Hidden>
      </Grid>
      <Grid item xs={12} sm={7} component={Paper} elevation={6} square>
        <Box p={3} className={classes.accountType}>
          <Typography color="textSecondary" variant="body1">
            Don’t have an account?
          </Typography>
          <Button className={classes.accountBtn}>
            Create account
          </Button>
        </Box>
        <div className={classes.paper}>
          <Hidden smUp>
            <Box p={1} className={classes.smallLogo}>
              <img src={logo} alt="Logo" width="50" height="50" />
            </Box>
            <Typography align="center" color="primary" variant="h5">
              Converse with anyone with any language
            </Typography>
          </Hidden>
          <form className={classes.form} noValidate>
            <Box>
              <Typography align="left" variant="h6">Welcome back!</Typography>
            </Box>

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
            <Box mt={3} align="center">
              <Button
                type="submit"
                variant="contained"
                className={classes.submit}
              >
                Login
              </Button>
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
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
