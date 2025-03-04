const User = require('../models/User');

const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('friends').populate('thoughts');
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('friends').populate('thoughts');
    if (!user) return res.status(404).json({ message: 'No user found with this ID' });
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true, runValidators: true });
    if (!updatedUser) return res.status(404).json({ message: 'No user found with this ID' });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (!deletedUser) return res.status(404).json({ message: 'No user found with this ID' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
};

const addFriend = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'No user found with this ID' });
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const removeFriend = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'No user found with this ID' });
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
};
