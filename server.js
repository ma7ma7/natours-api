const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({
  path: './config.env',
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

// Schema
const tourSchema = new mongoose.Schema({
  name: String,
  rating: {
    type: Number,
    required: true,
  },
});
// model
const Tour = new mongoose.model('Tour', tourSchema);

// prepare query
const example = new Tour({ name: 'mahmoud', rating: 4 });

// save query
example
  .save()
  .then((doc) => console.log(doc))
  .catch((err) => console.log(err.message));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('🚀 Start lestning on port : 👂 ' + port);
});
