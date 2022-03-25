const express = require('express');
const { dynamoClient, DB_NAME } = require('../config/db');
const router = express.Router();

//@desc get player
//@route GET /api/player/
//@access public
router.get('/:username', async (req, res) => {
  const username = req.params.username;
  const params = {
    TableName: DB_NAME,
    Key: {
      username,
    },
  };
  try {
    const { Item } = await dynamoClient.get(params).promise();
    if (Item) {
      res.status(200);
      res.json({ username: Item.username, score: Item.score, message: 'success' });
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
  const params = {
    TableName: DB_NAME,
    Item: {
      username,
      score: 0,
    },
  };
  try {
    await dynamoClient.put(params).promise();

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
  const params = {
    TableName: DB_NAME,
    Key: {
      username,
    },
  };
  try {
    const { Item } = await dynamoClient.get(params).promise();
    if (Item) {
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

  // TODO:

  res.status(200);
  res.json({ message: 'success' });
});

module.exports = router;
