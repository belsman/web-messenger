const router = require("express").Router();
const { User, Conversation, Message } = require("../../db/models");
const { Op } = require("sequelize");
const onlineManager = require("../../onlineManager");

// get all conversations for a user, include latest message text for preview, and all messages
// include other user model so we have info on username/profile pic (don't include current user info)
// TODO: for scalability, implement lazy loading
router.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: {
          user1Id: userId,
          user2Id: userId,
        },
      },
      attributes: ["id"],
      order: [[Message, "createdAt",]],
      include: [
        { model: Message, order: ["createdAt"] },
        {
          model: User,
          as: "user1",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
        {
          model: User,
          as: "user2",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
      ],
    });

    for (let i = 0; i < conversations.length; i++) {
      const convo = conversations[i];
      const convoJSON = convo.toJSON();

      // set a property "otherUser" so that frontend will have easier access
      if (convoJSON.user1) {
        convoJSON.otherUser = convoJSON.user1;
        delete convoJSON.user1;
      } else if (convoJSON.user2) {
        convoJSON.otherUser = convoJSON.user2;
        delete convoJSON.user2;
      }

      // set property for online status of the other user
      if (onlineManager.isUserOnline(convoJSON.otherUser.id)) {
        convoJSON.otherUser.online = true;
      } else {
        convoJSON.otherUser.online = false;
      }

      // set properties for notification count and latest message and last ReadMessageId
      const lastMessageIndex = convoJSON.messages.length - 1;
      if (lastMessageIndex > -1) {
        convoJSON.latestMessageText = convoJSON.messages[lastMessageIndex].text;
        convoJSON.unReadMessagesIds = convo.messages.filter(
          message => ((message.senderId !== userId) && (message.readStatus === false))
        ).map(message => message.id);
        convoJSON.notificationCount = convoJSON.unReadMessagesIds.length;
        convoJSON.lastReadMessageId = convo.messages.reverse().find(
          message => (message.readStatus === true) && (message.senderId === userId))?.id;
      }
      conversations[i] = convoJSON;
    }

    res.json(conversations);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
