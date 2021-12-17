const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  console.log(req.body);
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Welcome ${name}`);
  } else {
    return res.status(200).send(`Please provide valid credentials.`);
  }
});

module.exports = router;
