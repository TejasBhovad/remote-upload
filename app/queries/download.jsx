"use server";
import { extname } from "path";
import { writeFileSync, mkdirSync, unlinkSync } from "fs";

const downloadFiles = async (url) => {
  console.log(url);
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const data = Buffer.from(buffer);

  const dir = "public";
  mkdirSync(dir, { recursive: true });

  const path = `${dir}/${getFileName(url)}.${getFileExtension(url)}`;
  console.log(path);
  writeFileSync(path, data);

  return path;
};

function getFileExtension(url) {
  return extname(url).slice(1);
}
function getFileName(url) {
  return url.split("/").pop().split(".")[0];
}

const deleteFiles = async (path) => {
  unlinkSync(path);
};

export { downloadFiles, deleteFiles };
