"use client";

import HamsterTool from "./HamsterTool";

/**
 * Mount point for the hamster tool.
 *
 * The tool's idle "Start camera" screen is server-rendered, so it paints instantly and
 * counts toward a fast LCP. Heavy stuff (webcam, hand-tracking models) must only load
 * when the user presses Start, via `await import(...)` inside the click handler.
 *
 * If your tool genuinely can't render on the server at all, swap this for:
 *   const HamsterTool = dynamic(() => import("./HamsterTool"), {
 *     ssr: false,
 *     loading: () => <ToolLoading label="Waking up the hamster…" />,
 *   });
 * (import dynamic from "next/dynamic" and ToolLoading from "@/components/tool/ToolLoading").
 * It works, but LCP gets slower because the frame's content appears only after JS loads.
 */
export default function Hamster() {
  return <HamsterTool />;
}
