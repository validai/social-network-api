const User = require('../models/User');

module.exports = {

  async getUsers(req, res) {
    try {
      const users = await User.find().populate('friends').populate('thoughts');
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },


  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.userId).populate('friends').populate('thoughts');
      if (!user) return res.status(404).json({ message: 'No user found with this ID' });
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },


  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },


  async updateUser(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true, runValidators: true });
      if (!updatedUser) return res.status(404).json({ message: 'No user found with this ID' });
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },


  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.userId);
      if (!deletedUser) return res.status(404).json({ message: 'No user found with this ID' });
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  },


  async addFriend(req, res) {
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
  },

  async removeFriend(req, res) {
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
  },
};
