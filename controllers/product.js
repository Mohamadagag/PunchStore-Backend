const upload = require("../middlewares/upload");
const Model = require("../models/product.model");
var createError = require("http-errors");
class Controller {
  // callback functions used in author routes
  //get all the authors
  getAll(req, res, next) {
    let { page = 1, limit = 20 } = req.query;
    console.log(req.query);
    Model.paginate({}, { page: page, limit: limit }, (err, response) => {
      if (err) return next(err);
      res.status(200).json({ success: true, response });
    });
  }

  //get an author by id
  get(req, res, next) {
    let { id } = req.params;
    Model.findOne({ _id: id }, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });
  }

  // creating new author
  post(req, res, next) {
    let body = req.body;
    if (!req.file)
      return next(new Error(createError(400, "image not uploaded")));
    let doc = new Model({ ...body, image: req.file.filename });
    doc.save((err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });
  }

  //update an author by _id
  put(req, res, next) {
    let { id } = req.params;
    //exclude the image from informations
    let body = req.body;
    Model.updateOne(
      { _id: id },
      {
        $set: body,
      },
      (err, response) => {
        if (err) return next(err);
        res.status(200).json({ success: true, response });
      }
    );
  }

  //delete an author by id
  delete(req, res, next) {
    let { id } = req.params;
    Model.findByIdAndDelete({ _id: id }, (err, response) => {
      if (err) return next(err);
      res.status(200).json({ success: true, response });
    });
  }
}

const controller = new Controller();
module.exports = controller;
