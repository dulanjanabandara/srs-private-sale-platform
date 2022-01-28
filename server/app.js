/* eslint-disable prefer-arrow-callback */
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const projectRouter = require('./routes/projectRoutes');
const userRouter = require('./routes/userRoutes');
const userProjectRouter = require('./routes/userProjectRoutes');
const statusRouter = require('./routes/statusRoutes');

const app = express();

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

// 1) GLOBAL MIDDLEWARES
// =========================

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// // Set security HTTP headers
app.use(helmet());

// // Development login
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// // Limit request from same API
const limiter = rateLimit({
  max: 250,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body-parser, reading data from body into req.body
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));
app.use(cookieParser());

// Data sanitization agains NoSQL query injection
app.use(mongoSanitize());

// Data sanitizationagainst XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: ['blockchain', 'allocation', 'fee', 'status'],
  })
);

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);

  next();
});

// app.use('/', (req, res, next) => {
//   res.json({ message: 'Hello' });
// });
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/user-projects', userProjectRouter);
app.use('/api/v1/statuses', statusRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
