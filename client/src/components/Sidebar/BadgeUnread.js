import React from 'react';
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    border: '1px solid green',
    marginRight: 17,
    width: 22,
    height: 22,
  }
}));

const BadgeUnread = ({ count }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>{count}</Box>
  );
};

export default BadgeUnread;
