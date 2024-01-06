import FilesEmail from "@/app/components/Email";
import { Resend } from "resend";
import fs from "fs";
import path from "path";
import https from "https";

function URLToBase64(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = [];
      response.on("data", (chunk) => data.push(chunk));
      response.on("end", () => resolve(Buffer.concat(data).toString("base64")));
      response.on("error", reject);
    });
  });
}

const RESEND_API_KEY = process.env.NEXT_PUBLIC_RESEND_API_KEY;

function fileToBase64(filename) {
  const filePath = path.join(process.cwd(), "files", filename);
  const file = fs.readFileSync(filePath);
  return Buffer.from(file).toString("base64");
}

export async function POST(req) {
  const { email, filenames, username, image } = await req.json();
  const resend = new Resend(RESEND_API_KEY);

  const attachments = await Promise.all(
    filenames.map(async (filename) => ({
      filename,
      content: await URLToBase64(filename), // Convert each file to base64
    }))
  );

  const { data, error } = await resend.emails.send({
    from: "Tejas <remoteupload@updates.tejasbhovad.com>",
    to: email,
    subject: "RemoteUpload - New Files",
    react: <FilesEmail username={username} userImage={image} />,
    attachments,
  });

  if (error) {
    return new Response(JSON.stringify({ error }), { status: 400 });
  }

  return new Response(JSON.stringify({ data }), { status: 200 });
}
