import Thought from "../models/Thought.js";

export const getReactions = async (req, res) => {
  return res.status(400).json({ error: "Reactions are nested inside Thoughts. Use GET /api/thoughts/:thoughtId" });
};

export const addReaction = async (req, res) => {
  try {
    const { thoughtId } = req.params;
    const reaction = req.body;

    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $push: { reactions: reaction } },
      { new: true, runValidators: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ error: "Thought not found" });
    }

    res.json(updatedThought);
  } catch (error) {
    res.status(500).json({ error: "Error adding reaction", details: error.message });
  }
};

export const deleteReaction = async (req, res) => {
    try {
      const { thoughtId, reactionId } = req.params;
  
      console.log(`Deleting reaction: ${reactionId} from thought: ${thoughtId}`);
  
      const updatedThought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $pull: { reactions: { reactionId: reactionId } } },
        { new: true }
      );
  
      if (!updatedThought) {
        console.log("Thought not found");
        return res.status(404).json({ error: "Thought not found" });
      }
  
      console.log("Updated thought after deletion:", updatedThought);
  
      res.json({
        message: "Reaction deleted successfully",
        updatedThought
      });
    } catch (error) {
      console.error("Error deleting reaction:", error);
      res.status(500).json({ error: "Error deleting reaction", details: error.message });
    }
  };
  