import { defineEventHandler, getRouterParam } from "h3";
import { getCoursePack } from "../../utils/courseData";

export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id") || "xingrong-01";
  return getCoursePack(id);
});
