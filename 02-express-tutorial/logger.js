const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().getFullYear();
  console.log(`Logger middleware: ${method} ${url} ${time}`);
  next(); //or res.send("Directly call res.send();");
};

module.exports = logger;
