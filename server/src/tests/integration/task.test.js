import { api } from "./helper.js";
import { createUserAndToken } from "./auth.helper.js";
import { TASK_STATUS } from "../../utils/constants.js";

describe("Task API", () => {
  let token;
  let taskId;

  beforeEach(async () => {
    const data = await createUserAndToken();
    token = data.token;
  });

  test("create task", async () => {
    const res = await api()
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Task",
        dueDate: "2030-01-01",
      });

    expect(res.status).toBe(201);
    taskId = res.body.task._id;
  });

  test("get tasks", async () => {
    const res = await api()
      .get("/api/tasks")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.tasks)).toBe(true);
  });

  test("update task status", async () => {
    const createRes = await api()
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Task",
        dueDate: "2030-01-01",
      });

    const id = createRes.body.task._id;

    const res = await api()
      .patch(`/api/tasks/${id}/status`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        status: TASK_STATUS.COMPLETED,
      });

    expect(res.status).toBe(200);
    expect(res.body.task.status).toBe(TASK_STATUS.COMPLETED);
  });

  test("delete task", async () => {
    const createRes = await api()
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Task",
        dueDate: "2030-01-01",
      });

    const id = createRes.body.task._id;

    const res = await api()
      .delete(`/api/tasks/${id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});