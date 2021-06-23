// const fs = require('fs');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../data/data/tours-simple.json`)
// );

// exports.checkID = (req, res, next, val) => {
//   console.log("🏛️ - Tour ID is : " + val);

//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: "fail",
//       message: "🚨 Invalid ID ",
//     });
//   }

//   next();
// };

const Tour = require('../models/toursModel');

exports.getAllTours = async (req, res) => {
  try {
    // const tours = await Tour.find().where('duration').equals(7);
    // 1 - Exclude some fields
    const queryCopy = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((field) => delete queryCopy[field]);

    // Build query
    const query = Tour.find(queryCopy);
    console.log(queryCopy);

    // Execute query
    const tours = await query;

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'Error',
      message: error.message,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const id = req.params.id;
    const tour = await Tour.findById(id);

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'Error',
      message: error.message,
    });
  }
};

// Insert Document
exports.createTour = async (req, res) => {
  try {
    // const tour = new Tour(req.body);
    // tour.save();
    const tour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'Error',
      message: error.message,
    });
  }
};

// update a document
exports.updateTour = async (req, res) => {
  try {
    const id = req.params.id;
    const tour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(204).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'Error',
      message: error.message,
    });
  }
};

// Delete document
exports.deleteDocument = async (req, res) => {
  try {
    const id = req.params.id;
    await Tour.findByIdAndDelete(id);

    res.status(202).json({
      status: 'Succes',
      message: 'Document is deleted',
    });
  } catch (error) {
    res.status(404).json({
      status: 'Error',
      message: error.message,
    });
  }
};
