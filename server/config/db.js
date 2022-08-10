const mongoose = require("mongoose");
module.exports = async function connection() {
  try {
    const connectionParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(process.env.DB, connectionParams);
    console.log("connected to database.".toUpperCase());
  } catch (error) {
    console.log(error, "could not connect to database.".toUpperCase());
  }
};
