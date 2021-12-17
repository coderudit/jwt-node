const authorize = (req, res, next) => {
  console.log("Authorization middleware");
  const { user } = req.query;
  if (user === "udit") {
    req.user = { name: "udit", id: 2 };
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

module.exports = authorize;
