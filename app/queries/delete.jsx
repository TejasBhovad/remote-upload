"use server";
const getFilesToDelete = async () => {
  const filesData = await (
    await fetch("https://uploadthing.com/api/listFiles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Uploadthing-Api-Key": process.env.UPLOADTHING_SECRET,
        "X-Uploadthing-Version": "6.1.1",
      },
      body: JSON.stringify({}),
    })
  ).json();

  return filesData.files;
};
const deleteFiles = async (filesToDelete) => {
  console.log(filesToDelete);
  // Implement deletion logic using filesToDelete list
  const response = await fetch("https://uploadthing.com/api/deleteFiles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Uploadthing-Api-Key": process.env.UPLOADTHING_SECRET,
      "X-Uploadthing-Version": "6.1.1",
    },
    body: JSON.stringify({
      fileKeys: filesToDelete,
      files: [],
      customIds: [],
    }),
  });

  //   if (!response.ok) {
  //     console.error("Error deleting files:", await response.json());
  //     return NextResponse.json(
  //       { error: "Failed to delete files" },
  //       { status: 500 }
  //     );
  //   }

  //   returnsnse.json({ message: "Files deleted successfully" });
};

export { getFilesToDelete, deleteFiles };
