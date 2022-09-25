const bcrypt = require("bcrypt");
const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");
const User = require("../models/").user;
const space = require("../models/").space;
const story = require("../models/").story;
const { SALT_ROUNDS } = require("../config/constants");

const router = new Router();


//login 
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Please provide both email and password" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).send({
        message: "User with that email not found or password incorrect",
      });
    }

    delete user.dataValues["password"]; // don't send back the password hash
    const token = toJWT({ userId: user.id });

    // Get the space and stories
    const userSpace = await space.findOne({
      where: {
        userId: user.id,
      },
      include: story,
      order: [
        [story, 'createdAt', 'DESC']
      ]
    })
    return res.status(200).send({ token, user: user.dataValues, space: userSpace });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});


//signup
router.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).send("Please provide an email, password and a name");
  }

  try {
    const newUser = await User.create({
      email,
      password: bcrypt.hashSync(password, SALT_ROUNDS),
      name,
    });

    // Creates a new space for a user when they first sign up
    const newSpace = await space.create({
      title: `${name}'s Space`,
      description: `This is your new space! Feel free to personalize it.`,
      userId: newUser.id
    })

    delete newUser.dataValues["password"]; // don't send back the password hash

    const token = toJWT({ userId: newUser.id });

    res.status(201).json({ token, user: newUser.dataValues });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .send({ message: "There is an existing account with this email" });
    }

    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

// The /me endpoint can be used to:
// - get the users email & name using only their token
// - checking if a token is (still) valid
router.get("/me", authMiddleware, async (req, res) => {
  // don't send back the password hash
  delete req.user.dataValues["password"];
  // Get the space and stories
  const userSpace = await space.findOne({
    where: {
      userId: req.user.dataValues["id"],
    },
    include: story,
    order: [
      [story, 'createdAt', 'DESC']
    ]
  })
  res.status(200).send({ user: req.user.dataValues, space: userSpace });
});

module.exports = router;