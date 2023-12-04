const express = require('express');
const router = express.Router();
const userService = require('../services/user');
const jwtservice = require('../middleware/jwt');

router.post('/', async (req, res) => {
  try {
    const { password, username } = req.body;
    if (!password) {
      res.status(400).json({ status: 'error', message: 'Missing password' });
      return;
    }
    if (!username) {
      res.status(400).json({ status: 'error', message: 'Missing username' });
      return;
    }

    const result = await userService.insertUser({ password, username });
    res.status(200).json({ status: 'success', message: 'User created successfully', data: result });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to create user', error });
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await userService.findAllUsers();
    res.status(200).json({ status: 'success', message: 'Users retrieved successfully', data: result });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to retrieve users', error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await userService.deleteUser(req.params.id);
    res.status(200).json({ status: 'success', message: 'User deleted successfully', data: result });
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: 'error', message: 'Failed to delete user', error });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { password, username } = req.body;
    if (!password) {
      res.status(400).json({ status: 'error', message: 'Missing password' });
      return;
    }
    if (!username) {
      res.status(400).json({ status: 'error', message: 'Missing username' });
      return;
    }

    const result = await userService.updateUser(userId, { password, username });
    res.status(200).json({ status: 'success', message: 'User updated successfully', data: result });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to update user', error });
  }
});

router.get('/:id', async (req, res) => {
  const result = await userService.findById(req.params.id);
  if (result) {
    res.status(200).json({ status: 'success', message: 'User retrieved successfully', data: result });
  } else {
    res.status(404).json({ status: 'error', message: 'User not found' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { password, username } = req.body;
    if (!password) {
      res.status(400).json({ status: 'error', message: 'Missing password' });
      return;
    }
    if (!username) {
      res.status(400).json({ status: 'error', message: 'Missing username' });
      return;
    }

    const result = await userService.registerUser({ password, username });
    const token = await jwtservice.generateAccessToken({ username: username}, 1800);
    res.status(200).json({ status: 'success', message: 'User registered successfully', data: token, username: username });
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: 'error', message: 'Failed to create user: ' + error.message, error });
  }
});

router.post('/login', async (req, res) => {
  const user = await userService.loginUser(req.body);
  if (user) {
    const token = await jwtservice.generateAccessToken({ user_id: user.id, username: user.username}, 1800);
    res.json({ status: 'success', message: 'User logged in successfully', data: token, username: user.username });
  } else {
    res.status(401).json({ status: 'error', message: 'Invalid username or password' });
  }
});

module.exports = router;
