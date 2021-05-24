import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export type SanityImage = any;

export const client = sanityClient({
  projectId: "4kvint4g",
  dataset: "production",
  useCdn: false, // `false` if you want to ensure fresh data
  apiVersion: "2021-03-25", // use a UTC date string
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImage) {
  return builder.image(source);
}
