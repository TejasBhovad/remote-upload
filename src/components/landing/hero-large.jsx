import React from "react";
import { Mail } from "@/components/icons/mail";
import { File, FileArchive, Image } from "lucide-react";
import { animate, spring } from "motion";
import { useEffect, useRef } from "react";
const HeroLarge = () => {
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
          opacity: [0.75, 1],
          scale: [0.5, 2.5],
          rotate: [0, 15],
          translateX: [10, 20],
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
          scale: [0, 2],
          rotate: [-10, -30],
          translateX: [0, 10],
          translateY: [0, -10],
        },
        {
          duration: 0.5,
        },
      );
    }

    if (icon2Ref.current) {
      animate(
        icon2Ref.current,
        {
          opacity: [0, 1],
          scale: [0, 2],
          rotate: [30, 45],
          translateX: [0, -10],
          translateY: [0, -10],
        },
        {
          duration: 0.5,
        },
      );
    }

    if (icon3Ref.current) {
      animate(
        icon3Ref.current,
        {
          opacity: [0, 1],
          scale: [0, 2],
          rotate: [0, -30],
          translateX: [0, -10],
          translateY: [0, 10],
        },
        {
          duration: 0.5,
        },
      );
    }
  }, []);

  return (
    <div className="flex h-auto items-center justify-center bg-green-400/0 py-20 sm:w-1/2">
      <File
        ref={icon1Ref}
        className="icon1 z-100 relative -left-10 -top-24 transition-all ease-linear lg:-left-20"
        width={48}
        height={48}
      />
      <Mail ref={mailRef} className="mail transition-transform" />
      <FileArchive
        ref={icon2Ref}
        className="icon2 relative -right-20 -top-16 transition-transform lg:-right-36"
        width={72}
        height={72}
      />
      <Image
        ref={icon3Ref}
        className="icon3 relative left-4 top-32 transition-transform lg:left-8 lg:top-48"
        width={64}
        height={64}
      />
    </div>
  );
};

export default HeroLarge;
