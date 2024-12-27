import React from "react";

const MailCell = ({ sender, content }) => {
  const isRemoteUpload = sender === "RemoteUpload";

  return (
    <div
      className={`flex w-full cursor-pointer overflow-hidden truncate border-b-[1.5px] px-4 py-2 text-lg transition-all ease-in-out ${
        isRemoteUpload
          ? "border-accent/20 bg-accent/20 text-accent hover:bg-accent/30"
          : "border-background/10 bg-accent/10 hover:bg-accent/20"
      }`}
    >
      <span
        className={`h-fit w-1/2 truncate text-lg font-semibold ${isRemoteUpload ? "text-background" : "text-background"}`}
      >
        {sender}
      </span>
      <span
        className={`h-fit w-1/2 truncate text-lg ${isRemoteUpload ? "text-background/90" : "text-background/50"}`}
      >
        {content}
      </span>
    </div>
  );
};

const Inbox = () => {
  const mails = [
    {
      sender: "RemoteUpload",
      content:
        "Your files have been successfully uploaded: project_final.zip (25MB)",
    },
    {
      sender: "GitHub",
      content:
        "Security alert: Dependabot detected 2 vulnerabilities in your repository",
    },
    {
      sender: "Slack",
      content:
        "New message from Sarah Parker: Can you review the latest design changes?",
    },
    {
      sender: "AWS Billing",
      content: "Your AWS Cloud Services invoice for November 2024 is ready",
    },
    {
      sender: "Jira",
      content: "Task DEV-423: API Integration assigned to you by Mark Thompson",
    },
    {
      sender: "CircleCI",
      content: "Build failed: main branch - Error in deployment pipeline",
    },
    {
      sender: "DocuSign",
      content: "Please sign: Contract for New Project Development Q1 2025",
    },
  ];

  return (
    <div className="flex h-fit w-full flex-col gap-1">
      <span className="px-2 text-sm font-semibold text-background">
        Important
      </span>
      <div className="rounded-lg border border-background/10">
        {mails.map((mail, index) => (
          <MailCell key={index} sender={mail.sender} content={mail.content} />
        ))}
      </div>
    </div>
  );
};

export default Inbox;
