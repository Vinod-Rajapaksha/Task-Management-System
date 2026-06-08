import User from "../../models/User.model.js";
import jwt from "jsonwebtoken";
import { USER_ROLES } from "../../utils/constants.js";

export const createUserAndToken = async (role = USER_ROLES.USER) => {
  const user = await User.create({
    name: "Test User",
    email: `${role.toLowerCase()}@test.com`,
    password: "hashedpassword",
    role,
  });

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET
  );

  return { user, token };
};