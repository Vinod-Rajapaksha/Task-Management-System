import { api } from "./helper.js";
import { createUserAndToken } from "./auth.helper.js";

describe("Dashboard API", () => {
  let token;

  beforeEach(async () => {
    const data = await createUserAndToken();
    token = data.token;
  });

  test("should get dashboard data", async () => {
    const res = await api()
      .get("/api/dashboard")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);

    expect(res.body.dashboard).toHaveProperty("totalTasks");
    expect(res.body.dashboard).toHaveProperty("completedTasks");
    expect(res.body.dashboard).toHaveProperty("pendingTasks");
    expect(res.body.dashboard).toHaveProperty("highPriorityTasks");
  });
});