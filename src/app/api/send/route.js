import FilesEmail from "@/components/email-template";
import { Resend } from "resend";
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
const API_SECRET_KEY = process.env.API_SECRET_KEY;

export async function POST(req) {
  const apiKey = req.headers.get("x-api-key");
  if (apiKey !== API_SECRET_KEY) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }
  const { email, filenames, username, image } = await req.json();

  // console.log("Sending email to", email, username, image);
  // console.log("File URLs:", filenames);
  const resend = new Resend(RESEND_API_KEY);

  const attachments = await Promise.all(
    filenames.map(async ({ name, url }) => ({
      filename: name,
      content: await URLToBase64(url),
    })),
  );

  //   console.log("Attachments:", attachments);
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
