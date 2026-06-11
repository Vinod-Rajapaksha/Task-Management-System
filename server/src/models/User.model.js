import mongoose from "mongoose";
import { USER_ROLES } from "../utils/constants.js";

const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
      },

      password: {
        type: String,
        required: true,
      },

      role: {
        type: String,
        enum: Object.values(
          USER_ROLES
        ),
        default:
          USER_ROLES.USER,
      },

      lastLogin: {
        type: Date,
        default: null,
      },
    },
    {
      timestamps: true,
    }
);

const User = mongoose.model(
  "User",
  userSchema
);

export default User;