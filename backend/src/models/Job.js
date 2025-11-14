const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] }
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['open','assigned','done','cancelled'], default: 'open' },
  // Rating given by the job creator to the assigned helper (1-5)
  rating: { type: Number, min: 1, max: 5 },
  rated: { type: Boolean, default: false },
  ratedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

JobSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Job', JobSchema);
