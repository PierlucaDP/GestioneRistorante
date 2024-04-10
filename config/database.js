const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('Successfully connected to database!'.green.bold);
  } catch (err) {
    console.log(
      'Error during the connection to database: '.red.bold + `${err}`.red
    );
  }
};

module.exports = connectDatabase;
