import { defineEventHandler } from "h3";

export default defineEventHandler(() => {
  return {
    membership: {
      isMember: true,
      details: {
        endDate: "2099-12-31",
        startDate: "2024-01-01",
        type: "founder",
      },
    },
  };
});
