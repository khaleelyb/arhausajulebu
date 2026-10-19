import { defineEventHandler, getMethod, readBody } from "h3";
import { addMasteredElement, getMasteredElements } from "../utils/courseData";

export default defineEventHandler(async (event) => {
  const method = getMethod(event);
  if (method === "GET") {
    return getMasteredElements();
  }
  if (method === "POST") {
    const body = await readBody(event);
    return addMasteredElement(body?.content || { english: "" });
  }
  return [];
});
