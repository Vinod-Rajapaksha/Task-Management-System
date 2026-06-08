import { jest } from "@jest/globals";
import {
  connectTestDB,
  clearTestDB,
  disconnectTestDB,
} from "./testDB.js";

beforeAll(async () => {
  await connectTestDB();
});

afterEach(() => {
  jest.clearAllMocks();
});

beforeEach(async () => {
  await clearTestDB();
});

afterAll(async () => {
  await disconnectTestDB();
});