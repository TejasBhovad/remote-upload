"use server";

const API_SECRET_KEY = process.env.API_SECRET_KEY;

export async function sendEmail(formData) {
  const recipient = formData.get("recipient");
  const name = formData.get("name");
  const profileImage = formData.get("profileImage");
  const fileUrls = JSON.parse(formData.get("fileUrls"));

  try {
    // Use absolute URL instead of relative URL
    // If you're running this in development, you might use http://localhost:3000
    // For production, use your actual domain
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:3000";
    const apiUrl = new URL("/api/send", baseUrl).toString();

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_SECRET_KEY,
      },
      body: JSON.stringify({
        email: recipient,
        filenames: fileUrls,
        username: name,
        image: profileImage,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Error sending email:", result);
      return {
        success: false,
        message: result.error || "Failed to send email",
      };
    }

    return {
      success: true,
      message: "Email sent successfully",
      data: result.data,
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send email" };
  }
}
