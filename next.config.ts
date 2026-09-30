import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Webcam tools need camera access on our own origin only.
  { key: "Permissions-Policy", value: "camera=(self), microphone=(self), geolocation=(), interest-cohort=()" },
];

// Cursed Hamster is its own Next.js app (basePath "/cursed-hamster") on Vercel;
// ajtoolbox.com/cursed-hamster/* is proxied to it.
const CURSED_HAMSTER_ORIGIN = (
  process.env.CURSED_HAMSTER_ORIGIN ?? "https://hammy-hamster-webcam-public.vercel.app"
).replace(/\/$/, "");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // Inline the (small) Tailwind CSS into the HTML: removes a render-blocking request.
    inlineCss: true,
  },
  async rewrites() {
    return [
      { source: "/cursed-hamster", destination: `${CURSED_HAMSTER_ORIGIN}/cursed-hamster` },
      { source: "/cursed-hamster/:path*", destination: `${CURSED_HAMSTER_ORIGIN}/cursed-hamster/:path*` },
    ];
  },
  async redirects() {
    // The old placeholder page.
    return [{ source: "/hamster", destination: "/cursed-hamster", permanent: true }];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
