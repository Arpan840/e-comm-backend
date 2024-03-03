import mongoose from "mongoose";
import { Schema } from "mongoose";
const userSchema = new Schema(
  {
    userName: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    contactNumber: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    isVerified:{
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);
// const User = mongoose.model("user", userSchema);
const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;
