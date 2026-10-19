import { defineEventHandler } from "h3";
import { getLearningActivities } from "../../utils/courseData";

export default defineEventHandler(() => {
  const activities = getLearningActivities();
  const total = activities.reduce((sum, item) => sum + (item.duration || 0), 0);
  return total;
});
