import { getFilesToDelete,deleteFiles } from "@/actions/delete";
 
 export async function GET(request) {
   const authHeader = request.headers.get("authorization");
 
   if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
     return new Response("Unauthorized", {
       status: 401,
     });
   }
 
   const files = await getFilesToDelete();
   const keyArray = files.map((file) => file.key);
   await deleteFiles(keyArray);
 
   return new Response(`Deleted ${keyArray.length} files.`);
 }
 
 export const runtime = "nodejs";
 export const dynamic = "force-dynamic";