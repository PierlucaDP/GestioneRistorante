const mongoose = require("mongoose");
const UUID = mongoose.SchemaType.UUID();

const User = mongoose.Schema(
  {
    uuid: {
      type: mongoose.Schema.Types.UUID,
      default: () => uuidv4(),
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
      maxlength: [50, "Name can not be more than 50 characters"],
    },
    surname: {
      type: String,
      required: [true, "Please add a surname"],
      trim: true,
      maxlength: [50, "Name can not be more than 50 characters"],
    },
    email: {
      type: String,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Enter a valid email",
      ],
      require: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "Please add a password"],
    },
    role: {
      enum: ["Admin", "WarehouseWorker", "Waiter"],
      require: [true, "Please add a role"],
    },
  },
  {}
);

exports = mongoose.model(User, User);
