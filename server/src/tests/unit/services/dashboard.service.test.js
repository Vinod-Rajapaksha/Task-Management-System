import mongoose from "mongoose";
import Task from "../../../models/Task.model.js";
import * as dashboardService from "../../../services/dashboard.service.js";
import {
  connectTestDB,
  clearTestDB,
  disconnectTestDB,
} from "../../setup/testDB.js";
import { TASK_STATUS } from "../../../utils/constants.js";

describe("Dashboard Service", () => {
  let userId;

  beforeAll(async () => {
    await connectTestDB();
  });

  afterAll(async () => {
    await disconnectTestDB();
  });

  beforeEach(async () => {
    await clearTestDB();
    userId = new mongoose.Types.ObjectId();
  });

  test("should return dashboard data", async () => {
    await Task.create([
      {
        title: "T1",
        status: TASK_STATUS.COMPLETED,
        user: userId,
      },
      {
        title: "T2",
        status: TASK_STATUS.PENDING,
        user: userId,
      },
    ]);

    const result = await dashboardService.getDashboardData(userId);

    expect(result.totalTasks).toBe(2);
    expect(result.completedTasks).toBe(1);
    expect(result.pendingTasks).toBe(1);
  });
});