const router = require("express").Router();
const { User } = require("../../db/models");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res, next) => {
  try {
    // expects {username, email, password} in req.body
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ error: "Username, password, and email required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }

    const user = await User.create(req.body);
    const expiryTime = 86400;
    const expiryDate = new Date(Date.now() + expiryTime * 1000).toUTCString();

    const token = jwt.sign(
      { id: user.dataValues.id },
      process.env.SESSION_SECRET,
      { expiresIn: expiryTime }
    );

    res.cookie('token', token, { httpOnly: true, maxAge: expiryTime, expires: expiryDate });

    res.json({
      ...user.dataValues,
      token,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(401).json({ error: "User already exists" });
    } else if (error.name === "SequelizeValidationError") {
      return res.status(401).json({ error: "Validation error" });
    } else next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    // expects username and password in req.body
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ error: "Username and password required" });

    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      console.log({ error: `No user found for username: ${username}` });
      res.status(401).json({ error: "Wrong username and/or password" });
    } else if (!user.correctPassword(password)) {
      console.log({ error: "Wrong username and/or password" });
      res.status(401).json({ error: "Wrong username and/or password" });
    } else {
      const expiryTime = 86400;
      const expiryDate = new Date(Date.now() + expiryTime * 1000).toUTCString();

      const token = jwt.sign(
        { id: user.dataValues.id },
        process.env.SESSION_SECRET,
        { expiresIn: expiryTime }
      );
      res.cookie('token', token, { httpOnly: true, maxAge: expiryTime, expires: expiryDate });
      res.json({
        ...user.dataValues,
        token,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/logout", (req, res, next) => {
  // Set token to none and expire after 5 seconds
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  });

  res.json({ message: 'User logged out successfully' })
});

router.get("/user", (req, res, next) => {
  if (req.user) {
    return res.json(req.user);
  } else {
    return res.json({});
  }
});

module.exports = router;
