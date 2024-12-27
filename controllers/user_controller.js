const User = require("../models/user");
const { validateUser, validateId } = require("../models/user_validator");

async function handleGetAllUsers(req, res) {
  const users = await User.find({});
  return res.status(200).json(users);
}

async function handleGetUserById(req, res) {
  if (!validateId(req.params)) {
    return res.status(400).json({
      result: validateId.errors,
    });
  }
  const id = req.params.id;
  User.findById(id)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((e) => {
      return res.status(400).json(e);
    });
}
async function handleCreateUser(req, res) {
  if (!validateUser(req.body)) {
    return res.status(400).json({
      result: validateUser.errors,
    });
  }
  const body = req.body;
  result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    address: body.address,
  })
    .then((result) => {
      return res.status(201).json(result);
    })
    .catch((e) => {
      return res.status(400).json(e);
    });
}

async function handleUpdateUserById(req, res) {
  if (!validateId(req.params)) {
    return res.status(400).json({
      result: validateId.errors,
    });
  }
  const id = req.params.id;
  const body = req.body;
  User.findByIdAndUpdate(
    id,
    {
      firstName: body.first_name,
      lastName: body.last_name,
      gender: body.gender,
      address: body.address,
      email: body.email,
    },
    { returnDocument: "after" }
  )
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((e) => {
      return res.status(400).json(e);
    });
}

async function handleDeleteUserById(req, res) {
  const id = req.params.id;
  if (!validateId(req.params)) {
    return res.status(400).json({
      result: validateId.errors,
    });
  }
  User.findByIdAndDelete(id)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((e) => {
      return res.status(400).json(e);
    });
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleCreateUser,
  handleUpdateUserById,
  handleDeleteUserById,
};
