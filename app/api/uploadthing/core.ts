import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// This one file router will handle all of your app's file uploads
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  
  // This is the route for your image thumbnails
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .onUploadComplete(async ({ file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Image upload complete! File URL:", file.url);
      return { fileUrl: file.url };
    }),

  // This is the new route for your podcast audio files
  audioUploader: f({ audio: { maxFileSize: "16MB", maxFileCount: 1 } })
    .onUploadComplete(async ({ file }) => {
      console.log("Audio upload complete! File URL:", file.url);
      return { fileUrl: file.url };
    }),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;