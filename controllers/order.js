const Model = require("../models/order.model");
const Product = require("../models/product.model");
var createError = require("http-errors");

class Controller {
  // callback functions used in author routes
  //get all the authors
  getAll(req, res, next) {
    Model.find({}, (err, response) => {
      if (err) return next(err);
      res.status(200).json({ success: true, response });
    });
  }

  //get an author by id
  get(req, res, next) {
    let { id } = req.params;
    Model.findOne({ _id: id })
      .then((response) => res.status(200).json({ success: true, response }))
      .catch((error) => res.status(500).json({ msg: error.message }));
  }

  // creating new author
  // shawerma is life
  post(req, res, next) {
    let body = req.body;
    let { product } = body;
    Product.findOne({ _id: product }, (err, response) => {
      if (err) return next(err);

      if (!response || response.quantity <= 0)
        return next(
          new Error(createError(404, "product quantity isn't enough"))
        );
      Product.updateOne(
        { _id: product },
        {
          $inc: { quantity: -1 },
        },
        (err, response) => {
          if (err) return next(err);
        }
      );
      let doc = new Model(body);
      doc
        .save()
        .then((response) => res.status(200).json({ success: true, response }))
        .catch((error) => res.status(500).json({ msg: error }));
    });
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
