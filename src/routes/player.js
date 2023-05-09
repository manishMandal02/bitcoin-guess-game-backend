const express = require('express');
const { dynamoClient, DB_NAME } = require('../config/db');
const { User } = require('../model/user.model');
const router = express.Router();

//@desc get player
//@route GET /api/player/
//@access public
router.get('/:username', async (req, res) => {
  const username = req.params.username;

  try {
    const user = await User.findOne({ username });

    if (Item) {
      res.status(200);
      res.json({ username: user.username, score: user.score, message: 'success' });
    }
  } catch (err) {
    res.status(500);
    console.log(err.message);
    res.json({ error: err.message });
  }
});

//@desc create player
//@route POST /api/player
//@access public
router.post('/', async (req, res) => {
  const username = req.body.username;

  try {
    await User.create({
      username,
      score: 0,
    });

    res.status(200);
    res.json({ username, message: 'success' });
  } catch (err) {
    res.status(500);
    console.log(err.message);
    res.json({ error: err.message });
  }
});

//@desc check for username availability
//@route POST /api/player/usernameAvailability
//@access public
router.post('/usernameAvailability', async (req, res) => {
  const username = req.body.username;
  let isUserNameAvailable = false;

  try {
    const user = await User.findOne({ username });
    if (user) {
      isUserNameAvailable = false;
    } else {
      isUserNameAvailable = true;
    }
    res.status(200);
    res.json({ isUserNameAvailable });
  } catch (err) {
    res.status(500);
    console.log(err.message);
    res.json({ error: err.message });
  }
});

//@desc update score
//@route POST /api/player
//@access public
router.put('/', async (req, res) => {
  const username = req.body.username;
  const score = req.body.score;
  const params = {
    TableName: DB_NAME,
    Item: {
      username,
      score,
    },
  };
  try {
    const user = await User.findOne({ username });
    user.score = score;
    await user.save();

    res.status(200);
    res.json({ score, message: 'success' });
  } catch (err) {
    res.status(500);
    console.log(err.message);
    res.json({ error: err.message });
  }
});

module.exports = router;
