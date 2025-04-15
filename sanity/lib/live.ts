import "server-only";


// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from "next-sanity";
import { client } from "./client";
const serverToken = process.env.SANITY_SERVER_READ_TOKEN;
const browserToken = process.env.SANITY_BROWSER_READ_TOKEN;
export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    token: serverToken,
    apiVersion: "2025-04-15",
  }),
  serverToken,
  browserToken,
});
