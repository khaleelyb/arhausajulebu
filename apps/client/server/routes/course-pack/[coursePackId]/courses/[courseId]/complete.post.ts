import { defineEventHandler, getRouterParam } from "h3";
import { completeCourse } from "../../../../../utils/courseData";

export default defineEventHandler((event) => {
  const coursePackId = getRouterParam(event, "coursePackId") || "xingrong-01";
  const courseId = getRouterParam(event, "courseId") || "1";
  return completeCourse(coursePackId, courseId);
});
