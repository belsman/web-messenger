import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: 'center',
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    letterSpacing: -0.17,
    color: ({count}) => count > 0 ? "#000" : "#9CADC8",
  },
  notification: {
    height: 20,
    width: ({count}) => count < 10 ? 20 : 30,
    backgroundColor: "#3F92FF",
    marginRight: 10,
    color: "white",
    fontSize: 10,
    letterSpacing: -0.5,
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
}));

const ChatContent = (props) => {
  const { conversation, activeConversation } = props;
  const { latestMessageText, otherUser } = conversation;

  const unReadCount = conversation.notificationCount;
  const isActiveConversation = otherUser.username === activeConversation;

  const styleProps = {
    count: unReadCount,
  }
  const classes = useStyles(styleProps);

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={classes.previewText}>
          {latestMessageText}
        </Typography>
      </Box>
      {(unReadCount > 0 && !isActiveConversation) && <Box className={classes.notification}>{unReadCount}</Box>}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    activeConversation: state.activeConversation,
  };
};

export default connect(mapStateToProps)(ChatContent);
