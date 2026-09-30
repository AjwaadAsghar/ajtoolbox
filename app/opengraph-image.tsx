import { ogSize, renderOg } from "@/lib/og";

export const alt = "AJ Toolbox: free web tools, built different";
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOg({
    eyebrow: "ajtoolbox.com",
    title: "Free tools. Built different.",
    subtitle: "Fast, fun, slightly unhinged web tools that run right in your browser.",
  });
}
