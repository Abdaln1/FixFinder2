const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const auth = require('../middleware/auth');
const User = require('../models/User');

// Create job (authenticated)
router.post('/', auth, async (req, res) => {
  try {
    const body = req.body;
    body.createdBy = req.userId;
    const job = new Job(body);
    await job.save();
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// List jobs (simple). Supports optional ?service= and price filtering
router.get('/', async (req, res) => {
  try {
    const q = {};
    if (req.query.service) q['$or'] = [{ title: new RegExp(req.query.service, 'i') }, { description: new RegExp(req.query.service, 'i') }];
    if (req.query.minPrice) q.price = { $gte: Number(req.query.minPrice) };
    if (req.query.maxPrice) q.price = Object.assign(q.price || {}, { $lte: Number(req.query.maxPrice) });
    const jobs = await Job.find(q).sort({ createdAt: -1 }).limit(200).populate('createdBy assignedTo', '-passwordHash');
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get job
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('createdBy assignedTo', '-passwordHash');
    if (!job) return res.status(404).json({ message: 'Not found' });
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Assign the job to the authenticated helper
router.post('/:id/assign', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Not found' });
    if (job.status !== 'open') return res.status(400).json({ message: 'Job not open' });
    job.assignedTo = req.userId;
    job.status = 'assigned';
    await job.save();
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark job as done (only assigned user)
router.post('/:id/complete', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Not found' });
    if (!job.assignedTo || job.assignedTo.toString() !== req.userId) return res.status(403).json({ message: 'Not allowed' });
    job.status = 'done';
    await job.save();
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Rate the helper for this job (only job creator can rate, only once, job must be done)
router.post('/:id/rate', auth, async (req, res) => {
  try {
    const { rating } = req.body;
    if (!rating || typeof rating !== 'number' || rating < 1 || rating > 5) return res.status(400).json({ message: 'Rating must be a number between 1 and 5' });
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Not found' });
    if (job.status !== 'done') return res.status(400).json({ message: 'Job must be completed before rating' });
    if (!job.assignedTo) return res.status(400).json({ message: 'Job has no assigned helper' });
    if (job.rated) return res.status(400).json({ message: 'Job already rated' });
    if (job.createdBy.toString() !== req.userId) return res.status(403).json({ message: 'Only the job creator can rate the helper' });

    // Update job
    job.rating = rating;
    job.rated = true;
    job.ratedBy = req.userId;
    await job.save();

    // Update user aggregate rating for the assigned helper
    const helper = await User.findById(job.assignedTo);
    if (helper) {
      const prevTotal = (helper.rating || 0) * (helper.ratingsCount || 0);
      const newCount = (helper.ratingsCount || 0) + 1;
      const newAvg = (prevTotal + rating) / newCount;
      helper.rating = Number(newAvg.toFixed(2));
      helper.ratingsCount = newCount;
      await helper.save();
    }

    res.json({ message: 'Rating saved', job });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
