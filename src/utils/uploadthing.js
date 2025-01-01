import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";
import { generateReactHelpers } from "@uploadthing/react";

export const UploadButton = generateUploadButton();
export const UploadDropzone = generateUploadDropzone();
export const { useUploadThing } = generateReactHelpers();
