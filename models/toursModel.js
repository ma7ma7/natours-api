const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name 😊'],
    unique: true,
    trim: true,
    maxlength: [
      40,
      'A tour name must have less or equal than 40 characters 📏',
    ],
    minlength: [10, 'A tour name must have more or equal 10 characters 📏'],
  },
  slug: String,
  duration: {
    type: Number,
    required: [true,'A tour must have a duration ⏰']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size 👨‍👩‍👧‍👦'];
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty 🧗🏾‍♂️'],
    enum: {
      values: ['easy', 'medium', 'difficult'],
      message: 'Difficulty is either: easy, medium, difficult'
    }
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0']
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    requied: [true, 'A tour must be paid, define a price 💰'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a summary 💬']
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image 🌁']
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
  secretTour: {
    type: Boolean,
    default: false
  }
});

const Tour = new mongoose.model('Tour', tourSchema);

module.exports = Tour;
