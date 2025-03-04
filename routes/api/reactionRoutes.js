const router = require('express').Router();
const {
  getReactions,
  addReaction,
  deleteReaction,
} = require('../../controllers/reactionController');

router.route('/')
  .get(getReactions)
  .post(addReaction);

router.route('/:reactionId')
  .delete(deleteReaction);

module.exports = router;
