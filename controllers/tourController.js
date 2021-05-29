const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  console.log("🏛️ - Tour ID is : " + val);

  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "🚨 Invalid ID ",
    });
  }

  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;

  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    data: {
      tour,
    },
  });
};
