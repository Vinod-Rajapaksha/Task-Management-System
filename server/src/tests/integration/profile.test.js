import { api } from "./helper.js";
import { createUserAndToken } from "./auth.helper.js";

describe("Profile API", () => {
  let token;

  beforeEach(async () => {
    const data = await createUserAndToken();
    token = data.token;
  });

  test("get profile", async () => {
    const res = await api()
      .get("/api/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.user).toBeDefined();
    expect(res.body.user.email).toBeDefined();
  });

  test("update profile", async () => {
    const res = await api()
      .put("/api/profile")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Updated Name",
      });

    expect(res.status).toBe(200);
    expect(res.body.user.name).toBe("Updated Name");
  });
});