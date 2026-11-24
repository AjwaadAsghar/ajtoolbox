import { ogSize, renderOg } from "@/lib/og";

export const alt = "AJ Toolbox: free web tools, built different";
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOg({
    eyebrow: "ajtoolbox.com",
    title: "Websites, software and AI automation.",
    subtitle: "An independent studio designing and building for the web.",
  });
}
