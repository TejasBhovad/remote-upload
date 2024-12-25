import React from "react";
import { Mail } from "@/components/icons/mail";
import { File, FileArchive, Image } from "lucide-react";
import { animate, spring } from "motion";
import { useEffect, useRef } from "react";
const Hero = () => {
  const mailRef = useRef(null);
  const icon1Ref = useRef(null);
  const icon2Ref = useRef(null);
  const icon3Ref = useRef(null);

  useEffect(() => {
    // Only animate if the refs are available
    if (mailRef.current) {
      animate(
        mailRef.current,
        {
          opacity: [0.5, 1],
          scale: [0.5, 1],
          rotate: [0, 15],
          translateX: [0, 10],
          translateY: [0, 10],
        },
        {
          duration: 0.35,
          easing: spring(),
        },
      );
    }

    if (icon1Ref.current) {
      animate(
        icon1Ref.current,
        {
          opacity: [0, 1],
          scale: [0, 1],
          rotate: [0, -30],
          translateX: [0, 10],
          translateY: [0, -10],
        },
        {
          duration: 0.35,
        },
      );
    }

    if (icon2Ref.current) {
      animate(
        icon2Ref.current,
        {
          opacity: [0, 1],
          scale: [0, 1],
          rotate: [30, 45],
          translateX: [0, -10],
          translateY: [0, -10],
        },
        {
          duration: 0.35,
        },
      );
    }

    if (icon3Ref.current) {
      animate(
        icon3Ref.current,
        {
          opacity: [0, 1],
          scale: [0, 1],
          rotate: [0, -30],
          translateX: [0, -10],
          translateY: [0, 10],
        },
        {
          duration: 0.35,
        },
      );
    }
  }, []);

  return (
    <div className="flex h-auto items-center justify-center bg-green-400/0 py-20 sm:w-1/2">
      <File
        ref={icon1Ref}
        className="icon1 relative -left-2 -top-12 transition-transform hover:rotate-12 hover:scale-110"
        width={48}
        height={48}
      />
      <Mail
        ref={mailRef}
        className="mail transition-transform hover:rotate-12 hover:scale-110"
      />
      <FileArchive
        ref={icon2Ref}
        className="icon2 relative -right-6 -top-12 transition-transform hover:rotate-12 hover:scale-110"
        width={54}
        height={54}
      />
      <Image
        ref={icon3Ref}
        className="icon3 relative -left-20 top-32 transition-transform hover:rotate-12 hover:scale-110"
        width={64}
        height={64}
      />
    </div>
  );
};

export default Hero;
