import { defineEventHandler, readBody } from "h3";
import { updateCourseProgress } from "../utils/courseData";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return updateCourseProgress(
    body?.coursePackId || "xingrong-01",
    body?.courseId || "1",
    body?.statementIndex || 0,
  );
});
