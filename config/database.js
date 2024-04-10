const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Successfully connected to database!".green.bold);
  } finally {
    await mongoose.disconnect();
  }
};

module.exports = connectDatabase;
