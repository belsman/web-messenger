import React from "react";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Box,
  Typography,
  Button,
  Paper,
  Hidden,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/styles';
import bgImage from './bg-img.png';
import logo from './bubble.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  main: {
    overflow: 'hidden',
  },
  image: {
    background: '#3A8DFF',
    margin: theme.spacing(0),
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
    marginTop: theme.spacing(0),
    paddingLeft: '2rem',
    paddingRight: '2rem',
  },
  submit: {
    padding: '0.8rem 3.3rem',
    backgroundColor: '#3A8DFF',
    color: '#fff',
    marginTop: '0.5rem',
  },
  accountType: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  accountBtn: {
    backgroundColor: '#fff',
    color: '#3A8DFF',
    textTransform: 'capitalize',
    boxShadow: '0 5px 8px 0 rgba(0, 0, 0, 0.3)',
    marginLeft: '1rem',
    width:  150,
    height: 50,
  },
  heroText: {
    fontSize: '1.5rem',
    width: '75%',
    margin: 'auto',
    color: '#fff',
  },
  imgLogo: {
    display: 'flex',
    justifyContent: 'center',
  },
  
  smallLogo: {
    backgroundColor: '#3A8DFF',
    borderRadius: '50%'
  },
}));

const AuthPage = (props) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={5} className={classes.image}>
        <Hidden only="xs">
          <Typography align="center" variant="h2" className={classes.heroText}>
            <img src={logo} alt="Logo" /><br/><br />
             Converse with anyone with any language
          </Typography>
        </Hidden>
      </Grid>
      <Grid item xs={12} sm={7} component={Paper} elevation={6} square>
        <Box p={5} className={classes.accountType}>
          <Typography color="textSecondary" variant="body1">
            {props.promptText}
          </Typography>
          <Button onClick={() => history.push(`${props.alternateUrl}`)} className={classes.accountBtn}>
            {props.promptButtonText}
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
          <form onSubmit={props.onSubmitHandler} className={classes.form} noValidate>
            <Box>
              <Typography align="left" variant="h6">{props.formHeader}</Typography>
            </Box>
            {props.children}
            <Box align="center">
              <Button
                type="submit"
                variant="contained"
                className={classes.submit}
              >
                {props.submitText}
              </Button>
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default AuthPage;
