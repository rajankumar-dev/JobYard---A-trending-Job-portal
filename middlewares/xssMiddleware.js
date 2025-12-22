import xss from "xss";

const xssClean = (req, _, next) => {
  if (req.body) {
    for (let key in req.body) {
      if (typeof req.body[key] === "string") {
        req.body[key] = xss(req.body[key]);
      }
    }
  }

  if (req.query) {
    for (let key in req.query) {
      if (typeof req.query[key] === "string") {
        req.query[key] = xss(req.query[key]);
      }
    }
  }

  if (req.params) {
    for (let key in req.params) {
      if (typeof req.params[key] === "string") {
        req.params[key] = xss(req.params[key]);
      }
    }
  }
  // if (req.headers) {
  //   for (let key in req.headers) {
  //     if (typeof req.headers[key] === "string") {
  //       req.headers[key] = xss(req.headers[key]);
  //     }
  //   }
  // }

  next();
};

export default xssClean;
