import { defineEventHandler, getRouterParam } from "h3";
import { removeMasteredElement } from "../../utils/courseData";

export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id") || "";
  return removeMasteredElement(id);
});
