import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return {
    avatar: body?.avatar || "/logo.png",
    username: body?.username || "Earthworm Learner",
  };
});
