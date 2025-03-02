const { Schema, Types } = require('mongoose');

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(), // Generates a unique ObjectId by default
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280, // Limit reaction length
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => new Date(timestamp).toLocaleString(), // Format date when retrieved
    },
  },
  {
    toJSON: {
      getters: true, // Enables date formatting
    },
    id: false, // Prevents Mongoose from creating an `id` field
  }
);

module.exports = ReactionSchema;
