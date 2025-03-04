import Reaction from "../models/Reaction.js";

export const getReactions = async (req, res) => {
    try {
        const reactions = await Reaction.find();
        res.json(reactions);
    } catch (error) {
        res.status(500).json({ error: "Error fetching reactions", details: error.message });
    }
};

export const addReaction = async (req, res) => {
    try {
        const newReaction = await Reaction.create(req.body);
        res.status(201).json(newReaction);
    } catch (error) {
        res.status(400).json({ error: "Error creating reaction", details: error.message });
    }
};

export const deleteReaction = async (req, res) => {
    try {
        const { reactionId } = req.params;
        const deletedReaction = await Reaction.findByIdAndDelete(reactionId);
        if (!deletedReaction) {
            return res.status(404).json({ error: "Reaction not found" });
        }
        res.json({ message: "Reaction deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting reaction", details: error.message });
    }
};
