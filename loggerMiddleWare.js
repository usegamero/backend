const logger = (request, response, next) => {
  console.log(request.method);
  console.log(request.path);
  console.log("==============");
  next();
};
module.exports = logger;
