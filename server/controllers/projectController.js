const multer = require('multer');
const sharp = require('sharp');
const Project = require('../models/projectModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // cb - callback, cb is not coming from next, different from next()
//     cb(null, 'public/img/users');
//   },
//   filename: (req, file, cb) => {
//     // user-userId-currentTimestamp.jpeg -> user-hakrfh853jalr0-22082022.jpeg
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else if (file.mimetype.startsWith('application')) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        `Invalid file format found! Image file format must be .jpeg and pitch deck and documents format must be .pdfs`,
        400
      ),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadProjectFiles = upload.fields([
  { name: 'coverPhoto', maxCount: 1 },
  { name: 'pitchDeck', maxCount: 1 },
  { name: 'documents', maxCount: 3 },
]);

exports.resizeProjectPhoto = catchAsync(async (req, res, next) => {
  if (!req.files.coverPhoto) return next();

  // 1) Cover Photo
  req.body.coverPhoto = `project-${req.params.id}-${Date.now()}-cover.jpeg`;

  await sharp(req.files.coverPhoto[0].buffer)
    .resize(2000, 2000)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/projects/${req.body.coverPhoto}`);

  next();
});

exports.uploadPitchDeck = (req, res, next) => {
  if (!req.files.pitchDeck) return next();
  req.body.pitchDeck = `project-${req.params.id}-${Date.now()}-pitchdeck.pdf`;
  //   req.files.pitchDeck[0].buffer.toFile(
  //     `public/pitchDecks/${req.body.pitchDeck}`
  //   );
  next();
};

// exports.uploadPitchDeck = catchAsync(async (req, res, next) => {
//   if (!req.files.pitchDeck) return next();
//   req.body.pitchDeck = `project-${req.params.id}-${Date.now()}-pitchdeck.pdf`;
//   next();
// });

// exports.uploadDocuments = catchAsync(async (req, res, next) => {});

exports.getAllProjects = factory.getAll(Project);
// exports.getProject = factory.getOne(Project, { path: 'users' });
exports.getProject = factory.getOne(Project, { path: 'status' });
exports.createProject = factory.createOne(Project);
exports.updateProject = factory.updateOne(Project);
exports.deleteProject = factory.deleteOne(Project);
