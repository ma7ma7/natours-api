const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Tour = require('../models/toursModel');

dotenv.config({
  path: `${__dirname}/../config.env`,
});

const DB = process.env.DATABASE_URL.replace('<PASSWORD>', process.env.PASSWORD);

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => console.log('🗃  Database connection success ✓ '));

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/data/tours-simple.json`)
);

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Tours are imported 👍🏻');
  } catch (err) {
    console.log(err);
  }

  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Tours are deleted 👍🏻');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

mongoose.connection.once('open', () => {
  if (process.argv[2] === '--import') {
    importData();
  } else if (process.argv[2] === '--delete') {
    deleteData();
  }
});

// console.log(tours);
