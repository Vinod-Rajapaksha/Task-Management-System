import User from "../../../models/User.model.js";
import * as authService from "../../../services/auth.service.js";
import {
  connectTestDB,
  disconnectTestDB,
  clearTestDB,
} from "../../setup/testDB.js";

describe("Auth Service", () => {
  beforeAll(async () => {
    await connectTestDB();
  });

  afterAll(async () => {
    await disconnectTestDB();
  });

  beforeEach(async () => {
    await clearTestDB();
  });

  describe("registerUser()", () => {
    it("should register a new user successfully", async () => {
      const result = await authService.registerUser(
        "Test User",
        "test@example.com",
        "Test@1234"
      );

      expect(result.email).toBe("test@example.com");
    });

    it("should throw if email already exists", async () => {
      await User.create({
        name: "Existing",
        email: "existing@example.com",
        telephone: "0771234567",
        password: "password123",
      });

      await expect(
        authService.registerUser(
          "Test User",
          "existing@example.com",
          "Test@1234"
        )
      ).rejects.toThrow("User already exists");
    });
  });

  describe("loginUser()", () => {
    it("should login successfully", async () => {
      await authService.registerUser(
        "Test User",
        "test@example.com",
        "Test@1234"
      );

      const result = await authService.loginUser(
        "test@example.com",
        "Test@1234"
      );

      expect(result).toHaveProperty("accessToken");
      expect(result).toHaveProperty("refreshToken");
    });
  });

  describe("Auth Service - Edge Cases", () => {
    it("should throw if user already exists", async () => {
      await User.create({
        name: "Test",
        email: "test@test.com",
        password: "hashed",
      });

      await expect(
        authService.registerUser("Test", "test@test.com", "1234")
      ).rejects.toThrow("User already exists");
    });

    it("should throw if email not found", async () => {
      await expect(
        authService.loginUser("wrong@test.com", "1234")
      ).rejects.toThrow("Invalid Email or Password");
    });
  });
});