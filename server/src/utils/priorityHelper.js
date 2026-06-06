import { TASK_PRIORITY } from "./constants.js";

export const calculatePriority = (
  dueDate
) => {
  if (!dueDate)
    return TASK_PRIORITY.LOW;

  const today = new Date();

  const due =
    new Date(dueDate);

  const daysRemaining =
    Math.ceil(
      (due - today) / (1000 * 60 * 60 * 24)
    );

  if (daysRemaining <= 2)
    return TASK_PRIORITY.HIGH;

  if (daysRemaining <= 7)
    return TASK_PRIORITY.MEDIUM;

  return TASK_PRIORITY.LOW;
};