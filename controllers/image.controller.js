var cloudinary = require('cloudinary');

// Upload Image

exports.uploadImage = async (req, res, next) => {

  const file = req.file;
  if (!file) {
    const error = new Error('No File');
    error.httpStatusCode = 400;
    return next(error);
  }

  await cloudinary.v2.uploader.upload(file.path, {
    folder: 'meals',
    use_filename: true
  }, function (err, result) {
    res.json({
      imageURL: result.url
    });
  });

}