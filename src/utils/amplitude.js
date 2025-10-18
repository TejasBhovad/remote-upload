"use client";

import * as amplitude from "@amplitude/analytics-browser";

function initAmplitude() {
  if (typeof window !== "undefined") {
    amplitude.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY, {
      autocapture: true,
    });
  }
}

initAmplitude();

export const Amplitude = () => null;
export default amplitude;
