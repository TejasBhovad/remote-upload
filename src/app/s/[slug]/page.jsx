import React from "react";

const page = async ({ params }) => {
  // asynchronous access of `params.id`.
  const { slug } = await params;
  return <div>{slug}</div>;
};

export default page;

// https://localhost:3000/s/QMUN
