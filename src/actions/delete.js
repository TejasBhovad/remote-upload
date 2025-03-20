"use server";

export const getFilesToDelete = async () => {
  try {
    const response = await fetch('https://api.uploadthing.com/v6/listFiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Uploadthing-Api-Key': process.env.UPLOADTHING_KEY
      },
      body: JSON.stringify({})
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Error listing files:", error);
      throw new Error(`Failed to list files: ${error.message || response.status}`);
    }

    const data = await response.json();
    return data.files || [];
  } catch (error) {
    console.error("Error in getFilesToDelete:", error);
    throw error;
  }
};

export const deleteFiles = async (filesToDelete) => {
  if (!filesToDelete || filesToDelete.length === 0) {
    console.log("No files to delete");
    return { success: true, message: "No files to delete" };
  }

  try {
    console.log("Attempting to delete files:", filesToDelete);
    
    const response = await fetch('https://api.uploadthing.com/v6/deleteFiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Uploadthing-Api-Key': process.env.UPLOADTHING_KEY
      },
      body: JSON.stringify({
        fileKeys: filesToDelete,
        files: [],
        customIds: []
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Error deleting files:", error);
      throw new Error(`Failed to delete files: ${error.message || response.status}`);
    }

    const result = await response.json();
    // console.log("Files deleted successfully:", result);
    return result;
  } catch (error) {
    console.error("Error in deleteFiles:", error);
    throw error;
  }
};