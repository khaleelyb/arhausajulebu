import { defineEventHandler, getMethod, readBody } from "h3";
import { addLearningActivity, getLearningActivities } from "../utils/courseData";

export default defineEventHandler(async (event) => {
  const method = getMethod(event);
  if (method === "GET") {
    return getLearningActivities();
  }
  if (method === "POST") {
    const body = await readBody(event);
    return addLearningActivity(body?.duration || 0, body?.date);
  }
  return [];
});
