import { api } from "./helper.js";
import { createUserAndToken } from "./auth.helper.js";

describe("Notification API", () => {
  let token;

  beforeEach(async () => {
    const data = await createUserAndToken();
    token = data.token;
  });

  test("get notifications", async () => {
    const res = await api()
      .get("/api/notifications")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.notifications)).toBe(true);
  });
});