"use client";

/**
 * ============================================================
 *  DROP YOUR HAMSTER TOOL IN HERE
 * ============================================================
 *  This file is the only thing you need to replace. It's loaded client-side only
 *  (no SSR) via tools/hamster/index.tsx, inside a full-width frame on /hamster.
 *
 *  Rules of the road:
 *   - Default-export one React component. It fills the frame (width 100%).
 *   - Static assets (hamster images/GIFs/sounds, .task / .tflite models, wasm)
 *     go in /public/tools/hamster/… and are referenced as "/tools/hamster/…".
 *   - Stop the webcam on unmount (track.stop()) so the camera light turns off
 *     when people navigate away. See the cleanup below.
 *   - Don't add ads inside this component.
 *
 *  Full integration guide: README.md → "Integrating the hamster tool".
 * ============================================================
 */

import { useEffect, useRef, useState } from "react";

export default function HamsterTool() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [state, setState] = useState<"idle" | "starting" | "running" | "error">("idle");

  const start = async () => {
    setState("starting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setState("running");
    } catch {
      setState("error");
    }
  };

  // Always release the camera on unmount
  useEffect(() => () => streamRef.current?.getTracks().forEach((t) => t.stop()), []);

  return (
    <div className="relative grid min-h-[26rem] w-full place-items-center overflow-hidden rounded-2xl bg-ink sm:aspect-video sm:min-h-0">
      <video
        ref={videoRef}
        playsInline
        muted
        className={`absolute inset-0 size-full -scale-x-100 object-cover ${state === "running" ? "opacity-100" : "opacity-0"}`}
      />
      {state !== "running" && (
        <div className="relative z-10 flex max-w-md flex-col items-center gap-4 p-6 text-center">
          <span className="text-5xl" aria-hidden="true">
            🐹
          </span>
          <p className="font-display text-2xl font-bold">Placeholder: your hamster tool goes here</p>
          <p className="text-sm text-muted">
            Replace <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs">tools/hamster/HamsterTool.tsx</code>{" "}
            with your build. This preview just proves the camera frame works.
          </p>
          <button
            type="button"
            onClick={start}
            disabled={state === "starting"}
            className="mt-2 rounded-full bg-accent px-6 py-3 font-semibold text-accent-ink transition-transform active:scale-95 disabled:opacity-60"
          >
            {state === "starting" ? "Starting…" : state === "error" ? "Camera blocked, try again" : "Start camera"}
          </button>
        </div>
      )}
    </div>
  );
}
