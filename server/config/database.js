const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;

module.exports = {
  start: function() {
    mongoose
      .connect(uri, { useNewUrlParser: true, useFindAndModify: true, useCreateIndex: true, useUnifiedTopology: true })
      .then(console.log("MongoDB connected successfully"))
      .catch(err => console.log(err));
  },
  connection: mongoose.connection
};
