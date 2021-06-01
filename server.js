const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({
  path: './config.env',
});

const app = require('./app');

const DB = process.env.DATABASE_URL.replace('<PASSWORD>', process.env.PASSWORD);

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => console.log('🗃  Database connection success ✓ '));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('🚀 Start lestning on port : 👂 ' + port);
});
