let { people } = require("../../data");

const getPeople = (req, res) => {
  res.status(200).json({ success: true, data: people });
};

const createPerson = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, data: "Please provide name value." });
  } else {
    return res.status(201).json({ success: true, data: [...people, name] });
  }
};

const updatePerson = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  console.log(id, name);
  const singlePerson = people.find((person) => person.id === Number(id));
  if (!singlePerson) {
    return res
      .status(400)
      .json({ success: false, data: "Please provide correct id." });
  } else {
    singlePerson.name = name;
    return res.status(200).json({ success: true, data: people });
  }
};

const deletePerson = (req, res) => {
  const { id } = req.params;
  console.log(id);
  const allPeople = people.filter((person) => person.id != Number(id));
  if (!allPeople) {
    return res
      .status(400)
      .json({ success: false, data: "Please provide correct id." });
  } else {
    return res.status(200).json({ success: true, data: allPeople });
  }
};

module.exports = { getPeople, createPerson, updatePerson, deletePerson };
