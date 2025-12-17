const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  const defaultErrors = {
    statusCode: 500,
    message: err,
  };

  //missing fields error
  if (err.name === "validationError") {
    defaultErrors.statusCode = 400;
    defaultErrors.message = Object.values(err.errors)
      .map((el) => el.message)
      .join(",");
  }
  res.status(defaultErrors.statusCode).json({
    success: false,
    message: defaultErrors.message,
  });

  //duplicate error
  if (err.code && err.code === 11000) {
    defaultErrors.statusCode = 400;
    defaultErrors.message = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
  }
};

export default errorMiddleware;
