import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// crons.interval(
//   "log users",
//   { seconds: 10 }, // every minute
//   internal.matches.pushMatches
// );

export default crons;