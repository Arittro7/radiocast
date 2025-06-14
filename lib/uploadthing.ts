// lib/uploadthing.ts

import {
  generateUploadButton,
  generateUploadDropzone,
  generateUploader,
} from "@uploadthing/react";
import { createNextRouteHandler } from "uploadthing/next";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
export const Uploader = generateUploader<OurFileRouter>();

export const { useUploadThing } =
  generateUploadButton<OurFileRouter>();

export const { uploadFiles } =
  generateUploader<OurFileRouter>();