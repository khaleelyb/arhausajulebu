import { defineEventHandler } from "h3";
import { getCoursePacks } from "../utils/courseData";

export default defineEventHandler(() => {
  return getCoursePacks();
});
