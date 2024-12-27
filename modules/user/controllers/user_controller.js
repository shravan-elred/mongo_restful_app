const User = require("../models/user");
const { validateUser, validateId } = require("../models/user_validator");

async function handleGetAllUsers(req, res) {
  try {
    const result = await User.find({});
    return res.status(200).json(result);
  } catch (e) {
    return res.status(400).json(e);
  }
}

async function handleGetUserById(req, res) {
  try {
    if (!validateId(req.params)) {
      return res.status(400).json({
        result: validateId.errors,
      });
    }
    const id = req.params.id;
    const result = await User.findById(id);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(400).json(e);
  }
}
async function handleCreateUser(req, res) {
  try {
    if (!validateUser(req.body)) {
      return res.status(400).json({
        result: validateUser.errors,
      });
    }
    const body = req.body;
    const result = await User.create({
      firstName: body.first_name,
      lastName: body.last_name,
      email: body.email,
      gender: body.gender,
      address: body.address,
    });
    return res.status(201).json(result);
  } catch (e) {
    return res.status(400).json(e);
  }
}

async function handleUpdateUserById(req, res) {
  try {
    if (!validateId(req.params)) {
      return res.status(400).json({
        result: validateId.errors,
      });
    }
    const id = req.params.id;
    const body = req.body;
    const result = await User.findByIdAndUpdate(
      id,
      {
        firstName: body.first_name,
        lastName: body.last_name,
        gender: body.gender,
        address: body.address,
        email: body.email,
      },
      { returnDocument: "after" }
    );
    return res.status(200).json(result);
  } catch (e) {
    return res.status(400).json(e);
  }
}

async function handleDeleteUserById(req, res) {
  try {
    const id = req.params.id;
    if (!validateId(req.params)) {
      return res.status(400).json({
        result: validateId.errors,
      });
    }
    const result = await User.findByIdAndDelete(id);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(400).json(e);
  }
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleCreateUser,
  handleUpdateUserById,
  handleDeleteUserById,
};
