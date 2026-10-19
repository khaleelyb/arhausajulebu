import { defineEventHandler, getRouterParam } from "h3";

export default defineEventHandler((event) => {
  const period = getRouterParam(event, "period") || "weekly";
  return {
    list: [
      { username: "Alex", count: 48 },
      { username: "Sophia", count: 36 },
      { username: "David", count: 29 },
      { username: "Emma", count: 22 },
      { username: "Lucas", count: 18 },
    ],
    self: {
      username: "Earthworm Learner",
      count: 12,
      rank: 6,
    },
    period,
  };
});
