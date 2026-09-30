import { PageHeader } from "@/components/layout/PageHeader";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How AJ Toolbox handles your data, in plain language: tools run locally in your browser, no accounts, and how Google AdSense uses cookies.",
  path: "/privacy",
});

const lastUpdated = new Date(site.privacyLastUpdated).toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal, but readable"
        title="Privacy Policy"
        intro="The short version: your stuff stays on your device, there are no accounts, and ads use cookies. Here's the longer version."
      />

      <div className="container-x mt-12">
        <div className="prose-aj max-w-3xl">
          <p>
            <strong>Last updated:</strong> <time dateTime={site.privacyLastUpdated}>{lastUpdated}</time>
          </p>
          <p>
            This policy explains what information AJ Toolbox ({site.url.replace(/^https?:\/\//, "")}) collects and why. AJ
            Toolbox is run by {site.author.name} (AJ Studios).
          </p>

          <h2>1. Tools run in your browser</h2>
          <p>
            Our tools are built to work locally, on your device. That means files you open and anything you create with
            a tool are processed by your own browser, not sent to our servers.
          </p>
          <p>
            <strong>Webcam tools</strong> (like the Cursed Hamster Cam) process your video locally in your browser. Your
            camera feed is <strong>never uploaded, recorded or stored</strong> by us. Camera access is only requested
            when you press the start button, and you can revoke it at any time in your browser settings. The camera
            stops when you leave the page.
          </p>

          <h2>2. No accounts</h2>
          <p>
            There are no sign-ups, logins or user profiles on AJ Toolbox. We don&apos;t ask for your name, email or
            payment details to use any tool.
          </p>

          <h2>3. Analytics</h2>
          <p>
            {/* TODO: replace with your real setup, e.g. "We use Vercel Web Analytics, which is cookie-free and collects anonymous, aggregated page-view data." */}
            [ANALYTICS PROVIDER PLACEHOLDER] We may use privacy-friendly analytics to understand which pages and tools
            are popular (for example: page views, referring website, country, device type). This data is aggregated and
            is not used to identify you personally.
          </p>

          <h2>4. Advertising and cookies (Google AdSense)</h2>
          <p>
            AJ Toolbox is free because it shows ads. We use Google AdSense to serve them. Google and its partners use
            cookies to serve ads based on your previous visits to this and other websites.
          </p>
          <ul>
            <li>
              Google&apos;s use of advertising cookies enables it and its partners to serve ads to you based on your
              visits to this site and/or other sites on the internet.
            </li>
            <li>
              You can learn how Google uses information from sites that use its services at{" "}
              <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener">
                policies.google.com/technologies/ads
              </a>
              .
            </li>
            <li>
              You can opt out of personalized advertising by visiting{" "}
              <a href="https://adssettings.google.com" target="_blank" rel="noopener">
                Google Ads Settings
              </a>
              . You can also opt out of some third-party vendors&apos; use of cookies for personalized advertising at{" "}
              <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener">
                aboutads.info
              </a>
              .
            </li>
            <li>
              If you&apos;re in the EEA, UK or Switzerland, you&apos;ll be asked for consent before personalized ads or
              non-essential cookies are used, and you can change your choice at any time.
            </li>
          </ul>

          <h2>5. Other cookies and local storage</h2>
          <p>
            Some tools may save small preferences (like a chosen setting) in your browser&apos;s local storage so they
            remember you next time. This stays on your device and you can clear it any time from your browser settings.
          </p>

          <h2>6. Children</h2>
          <p>
            AJ Toolbox is not directed at children under 13, and we do not knowingly collect personal information from
            them.
          </p>

          <h2>7. Changes to this policy</h2>
          <p>
            If this policy changes, we&apos;ll update it on this page and change the &ldquo;last updated&rdquo; date
            above.
          </p>

          <h2>8. Contact</h2>
          <p>
            Questions about privacy? Email <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      </div>
    </>
  );
}
