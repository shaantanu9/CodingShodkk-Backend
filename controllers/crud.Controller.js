// This File Handle All the Crud Operation that are neccessary to perform CRUD Opertion

const get = (model) => async (req, res) => {
  try {
    const user = await model.find().lean();
    // get length of the array
    const total = user.length;
    res.send({ total, user });
  } catch (err) {
    console.log(err.message);
  }
};

const getById = (model) => async (req, res) => {
  try {
    const user = await model.findById(req.params.id).lean();
    res.send(user);
  } catch (err) {
    console.log(err.message);
  }
};

const patch = (model) => async (req, res) => {
  const user = await model
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .lean();
  res.send(user);
};

const post = (model) => async (req, res) => {
  try {
    const newUser = await model.create(req.body);
    res.send(newUser);
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
};

const deleteOne = (model) => async (req, res) => {
  const user = await model.findByIdAndDelete(req.params.id).lean();
  res.send(user);
};

const deleteAll = (model) => async (req, res) => {
  const user = await model.deleteMany().lean();
  res.send(user);
};

// Module: Can
module.exports = (model) => ({
  get: get(model),
  getById: getById(model),
  patch: patch(model),
  post: post(model),
  deleteOne: deleteOne(model),
  deleteAll: deleteAll(model),
});
