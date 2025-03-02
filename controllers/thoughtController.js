const User = require('../models/User');
const Thought = require('../models/Thought');

module.exports = {
  
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error retrieving thoughts', error: err.message });
    }
  },


  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) return res.status(404).json({ message: 'No thought found with this ID' });
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error retrieving thought', error: err.message });
    }
  },


  async createThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);
      const updatedUser = await User.findByIdAndUpdate(
        req.body.userId,
        { $push: { thoughts: newThought._id } },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found, but thought was created' });
      }
      res.json(newThought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating thought', error: err.message });
    }
  },


  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId, 
        req.body, 
        { new: true, runValidators: true }
      );
      if (!updatedThought) return res.status(404).json({ message: 'No thought found with this ID' });
      res.json(updatedThought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating thought', error: err.message });
    }
  },

  async deleteThought(req, res) {
    try {
      const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (!deletedThought) return res.status(404).json({ message: 'No thought found with this ID' });


      await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      res.json({ message: 'Thought deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error deleting thought', error: err.message });
    }
  },


  async addReaction(req, res) {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: req.body } },
        { new: true, runValidators: true }
      );
      if (!updatedThought) return res.status(404).json({ message: 'No thought found with this ID' });
      res.json(updatedThought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error adding reaction', error: err.message });
    }
  },

  async removeReaction(req, res) {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      if (!updatedThought) return res.status(404).json({ message: 'No thought found with this ID' });
      res.json(updatedThought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error removing reaction', error: err.message });
    }
  },
};
