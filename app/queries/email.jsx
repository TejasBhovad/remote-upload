const sendEmail = async (email, attachmentPaths, name, image) => {
  console.log(email);
  const attachmentNames = attachmentPaths.map((path) =>
    path.replace("public/", "")
  );

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
