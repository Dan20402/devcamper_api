const express = require('express');
const dotenv = require('dotenv');
const bootcamps = require('./routes/bootcamps');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

dotenv.config({ path: `./config/config.env` });
connectDB();

const app = express();

app.use(express.json());

//Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/bootcamps', bootcamps);
app.use(errorHandler);

const server = app.listen(
  process.env.PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
      .yellow.bold
  )
);

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`My custom Error: ${err.message}`.red);
  //Close server and exit process
  server.close(() => process.exit(1));
});
