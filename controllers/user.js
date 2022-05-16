const Model = require("../models/user.model");

class Controller {
  // callback functions used in author routes
  //get all the authors
  getAll(req, res, next) {
    Model.find({})
      .then((response) => res.status(200).json({ success: true, response }))
      .catch((error) => res.status(500).json({ msg: error }));
  }

  //get an author by id
  get(req, res, next) {
    let { id } = req.params;
    Model.findOne({ _id: id })
      .then((response) => res.status(200).json({ success: true, response }))
      .catch((error) => res.status(500).json({ msg: error.message }));
  }

  // creating new author
  post(req, res, next) {
    let body = req.body;
    let doc = new Model(body);
    doc
      .save()
      .then((response) => res.status(200).json({ success: true, response }))
      .catch((error) => res.status(500).json({ msg: error }));
  }

  //update an author by _id
  put(req, res, next) {
    let { id } = req.params;
    let body = req.body;
    Model.updateOne(
      { _id: id },
      {
        $set: body,
      }
    )
      .then((response) => res.status(200).json({ success: true, response }))
      .catch((error) => res.status(500).json({ msg: error }));
  }

  //delete an author by id
  delete(req, res, next) {
    let { id } = req.params;
    Model.findByIdAndDelete({ _id: id })
      .then((response) => res.status(200).json({ success: true, response }))
      .catch((error) => res.status(500).json({ msg: error }));
  }
}

const controller = new Controller();
module.exports = controller;
