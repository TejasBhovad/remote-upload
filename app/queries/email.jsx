// "use server";
const sendEmail = async (email, attachmentPaths, name, image) => {
  console.log(email);

  // console.log("name: " + name);
  // console.log("image: " + image);
  const attachmentNames = attachmentPaths.map((path) =>
    path.replace("public/", "")
  );
  // console.log("path: " + attachmentNames);

  const response = await fetch("/api/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      filenames: attachmentNames,
      username: name,
      image: image,
    }),
  });
  if (response.ok) {
    const responseData = await response.json();
    console.log("Email sent successfully:", responseData);
  } else {
    console.error("Failed to send email:", response.statusText);
  }
  return;
};

export { sendEmail };
