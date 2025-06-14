
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// FileRouter for  app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    // This code runs on server after upload
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete. File URL:", file.url);
      // Whatever is returned here is sent to the client-side `onClientUploadComplete` callback
      return { fileUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;