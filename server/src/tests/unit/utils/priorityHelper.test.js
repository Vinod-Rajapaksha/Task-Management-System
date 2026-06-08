import { calculatePriority } from "../../../utils/priorityHelper.js";

describe("Priority Helper", () => {
  it("should return HIGH priority for near due date", () => {
    const today = new Date();
    const nearDate = new Date(today);
    nearDate.setDate(today.getDate() + 1);

    expect(calculatePriority(nearDate)).toBe("High");
  });

  it("should return MEDIUM priority for mid-range due date", () => {
    const today = new Date();
    const midDate = new Date(today);
    midDate.setDate(today.getDate() + 5);

    expect(calculatePriority(midDate)).toBe("Medium");
  });

  it("should return LOW priority for far due date", () => {
    const today = new Date();
    const farDate = new Date(today);
    farDate.setDate(today.getDate() + 10);

    expect(calculatePriority(farDate)).toBe("Low");
  });

  it("should return LOW when no due date is provided", () => {
    expect(calculatePriority(null)).toBe("Low");
  });
});