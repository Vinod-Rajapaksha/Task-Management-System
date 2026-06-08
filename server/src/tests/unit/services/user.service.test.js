import mongoose from "mongoose";
import User from "../../../models/User.model.js";
import * as userService from "../../../services/user.service.js";

describe("User Service", () => {
  let user;

  beforeEach(async () => {
    user = await User.create({
      name: "John",
      email: "john@test.com",
      password: "hashed",
    });
  });

  test("get user by id", async () => {
    const result = await userService.getUserById(user._id);

    expect(result.name).toBe("John");
  });

  test("delete user", async () => {
    const result = await userService.deleteUser(user._id);

    expect(result).toBe(true);
  });

  test("should throw if user not found", async () => {
    await expect(
      userService.deleteUser(new mongoose.Types.ObjectId())
    ).rejects.toThrow("User not found");
  });
});