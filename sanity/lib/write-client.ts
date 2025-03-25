import "server-only";

import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";
// Import token directly or use environment variable
const token = process.env.SANITY_TOKEN;

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});
if (!writeClient.config().token) {
  throw new Error("Write token not found.");
}

