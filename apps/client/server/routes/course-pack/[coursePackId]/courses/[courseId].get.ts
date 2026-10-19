import { defineEventHandler, getRouterParam } from "h3";
import { getCourse } from "../../../../utils/courseData";

export default defineEventHandler((event) => {
  const coursePackId = getRouterParam(event, "coursePackId") || "xingrong-01";
  const courseId = getRouterParam(event, "courseId") || "1";
  return getCourse(coursePackId, courseId);
});
