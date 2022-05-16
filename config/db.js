const mongoose = require("mongoose");
//put your DB url by going to cluster -> connect

let dbConnection;

module.exports = {
  //A function that starts the connection to the DB
  connectToServer: function (callback) {
    mongoose
      .connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(
        () => {
          dbConnection = mongoose.connection;
          return callback;
        },
        (err) => {
          return callback(err);
        }
      );
  },
  // a function that return the DB connection
  getDb: function () {
    //once the DB is connected and returned, it should be used everywhere in the application
    return dbConnection;
  },
};
