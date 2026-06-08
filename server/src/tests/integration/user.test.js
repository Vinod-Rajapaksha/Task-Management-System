import { api } from "./helper.js";
import { createUserAndToken } from "./auth.helper.js";
import User from "../../models/User.model.js";

describe("User API (Admin)", () => {
  let adminToken;
  let userId;

  beforeEach(async () => {
    const admin = await createUserAndToken("Admin");
    adminToken = admin.token;

    const user = await User.create({
      name: "Normal User",
      email: `user_${Date.now()}@test.com`,
      password: "hashed",
      role: "User",
    });

    userId = user._id;
  });

  test("should get all users", async () => {
    const res = await api()
      .get("/api/users")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.users)).toBe(true);
  });

  test("should get user by id", async () => {
    const res = await api()
      .get(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.user || res.body.data).toBeDefined();
  });

  test("should delete user", async () => {
    const res = await api()
      .delete(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});