const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)


router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, sender } = req.body;

    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });
    res.status(201).json({ message, sender });
  } catch (error) {
    next(error);
  }
});

router.post("/update-message-readstatus", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }

    const { ids } = req.body;

    // TODO: UPDATE MESSAGES contained in the array!
    const messages = await Message.findAll({ where: { id: ids } });

    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      message.readStatus = true;
      await message.save();
    }

    res.json({ message: "updated successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
