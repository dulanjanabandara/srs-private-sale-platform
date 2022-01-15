const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const projectRouter = require('./routes/projectRoutes');
const userRouter = require('./routes/userRoutes');
const userProjectRouter = require('./routes/userProjectRoutes');

const app = express();

app.use(cors());

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Development login
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit request from same API
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body-parser, reading data from body into req.body
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

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

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);

  next();
});

app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/user-projects', userProjectRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
