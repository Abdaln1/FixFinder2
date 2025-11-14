const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get public profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-passwordHash');
    if (!user) return res.status(404).json({ message: 'Not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update my profile
router.put('/me', auth, async (req, res) => {
  try {
    const updates = (({ name, bio, avatarUrl, services }) => ({ name, bio, avatarUrl, services }))(req.body);
    const user = await User.findByIdAndUpdate(req.userId, { $set: updates }, { new: true }).select('-passwordHash');
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Rate a helper
router.post('/:id/rate', auth, async (req, res) => {
  try {
    const targetId = req.params.id;
    const { rating, comment } = req.body;
    if (!rating || rating < 1 || rating > 5) return res.status(400).json({ message: 'Rating must be 1-5' });
    const user = await User.findById(targetId);
    if (!user) return res.status(404).json({ message: 'Not found' });
    const prevTotal = (user.rating || 0) * (user.ratingsCount || 0);
    const newCount = (user.ratingsCount || 0) + 1;
    const newAvg = (prevTotal + Number(rating)) / newCount;
    user.rating = newAvg;
    user.ratingsCount = newCount;
    // TODO: store comments in separate collection if needed
    await user.save();
    res.json({ rating: user.rating, ratingsCount: user.ratingsCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
