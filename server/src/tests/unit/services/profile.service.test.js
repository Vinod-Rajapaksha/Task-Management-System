import mongoose from "mongoose";
import User from "../../../models/User.model.js";
import * as profileService from "../../../services/profile.service.js";
import { hashPassword } from "../../../utils/password.js";
import {
  connectTestDB,
  clearTestDB,
  disconnectTestDB,
} from "../../setup/testDB.js";

describe("Profile Service", () => {
  let user;

  beforeAll(async () => {
    await connectTestDB();
  });

  afterAll(async () => {
    await disconnectTestDB();
  });

  beforeEach(async () => {
    await clearTestDB();

    const hashedPassword = await hashPassword("old");

    user = await User.create({
      name: "Test",
      email: "test@test.com",
      password: hashedPassword,
    });
  });

  test("update profile", async () => {
    const result = await profileService.updateProfile(user._id, {
      name: "New Name",
    });

    expect(result.name).toBe("New Name");
  });

  test("should throw if user not found in updateProfile", async () => {
    await expect(
      profileService.updateProfile(
        new mongoose.Types.ObjectId(),
        { name: "New Name" }
      )
    ).rejects.toThrow("User not found");
  });

  test("change password", async () => {
    const result = await profileService.changePassword(
      user._id,
      "old",
      "new"
    );

    expect(result).toBe(true);
  });

  test("should throw if old password is incorrect", async () => {
    await expect(
      profileService.changePassword(
        user._id,
        "wrong-password",
        "new"
      )
    ).rejects.toThrow("Old password is incorrect");
  });

  test("should throw if user not found in changePassword", async () => {
    await expect(
      profileService.changePassword(
        new mongoose.Types.ObjectId(),
        "old",
        "new"
      )
    ).rejects.toThrow("User not found");
  });
});