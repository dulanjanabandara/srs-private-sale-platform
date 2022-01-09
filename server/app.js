const express = require('express');
const morgan = require('morgan');

const projectRouter = require('./routes/projectRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  res
    .status(404)
    .json({
      status: 'fail',
      message: `Cant't find ${req.originalUrl} on this server!`,
    });
});

module.exports = app;
