exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);

  // if (req.params.id * 1 > projects.length) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'Invalid ID',
  //   });
  // }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

exports.getAllProjects = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.getProject = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.createProject = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.updateProject = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.deleteProject = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
