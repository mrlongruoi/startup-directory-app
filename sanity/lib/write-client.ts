import "server-only";

import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";
// Import token directly or use environment variable

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});
if (!writeClient.config().token) {
  throw new Error("Write token not found.");
}

