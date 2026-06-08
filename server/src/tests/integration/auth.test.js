import { api } from "./helper.js";

describe("Auth API", () => {
  const email = "john@test.com";

  test("register user", async () => {
    const res = await api()
      .post("/api/auth/register")
      .send({
        name: "John",
        email,
        password: "123456",
      });

    expect(res.status).toBe(201);
    expect(res.body.user.email).toBe(email);
  });

  test("login user", async () => {
    await api()
      .post("/api/auth/register")
      .send({
        name: "John",
        email,
        password: "123456",
      });

    const res = await api()
      .post("/api/auth/login")
      .send({
        email,
        password: "123456",
      });

    expect(res.status).toBe(200);
    expect(res.body.accessToken).toBeDefined();
  });
});