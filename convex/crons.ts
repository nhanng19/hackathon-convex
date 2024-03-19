import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "log users",
  { minutes: 10 }, // every hour
  internal.matches.pushMatches
);

export default crons;
