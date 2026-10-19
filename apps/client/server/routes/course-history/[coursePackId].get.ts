import { defineEventHandler, getRouterParam } from "h3";
import { getCourseHistory } from "../../utils/courseData";

export default defineEventHandler((event) => {
  const coursePackId = getRouterParam(event, "coursePackId") || "xingrong-01";
  return getCourseHistory(coursePackId);
});
