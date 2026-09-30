import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { getAllTools, getLiveTools } from "@/data/tools";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "About",
  description: `AJ Toolbox is a collection of free, fun web tools built by ${site.author.name}. No sign-ups, no uploads, just tools that work in your browser.`,
  path: "/about",
});

export default function AboutPage() {
  const live = getLiveTools().length;
  const total = getAllTools().length;

  return (
    <>
      <PageHeader
        eyebrow="About"
        title={
          <>
            Hi, I&apos;m <span className="text-accent">AJ.</span>
          </>
        }
        intro={`AJ Toolbox is a collection of free, fun web tools built by ${site.author.name}.`}
      />

      <div className="container-x mt-16 grid gap-16 lg:grid-cols-[minmax(0,46rem)_1fr]">
        <div className="prose-aj">
          <p>
            I build little things for the internet. Some of them are genuinely useful, like compressing a PDF without
            handing it to a random server. Some of them are a cursed hamster that reacts to your hand gestures. Both
            felt worth making.
          </p>
          <h2>Why this exists</h2>
          <p>
            Every time I needed a simple tool online, I&apos;d find one buried under sign-up walls, upload limits,
            watermarks and &ldquo;upgrade to Pro&rdquo; pop-ups. So I started building my own and putting them here, for
            free, for everyone.
          </p>
          <h2>The rules I build by</h2>
          <ul>
            <li>
              <strong>Free, for real.</strong> No trials, no paywalls. Ads keep the site running.
            </li>
            <li>
              <strong>Private by default.</strong> Wherever possible, tools run entirely in your browser. Your webcam
              feed, files and images stay on your device.
            </li>
            <li>
              <strong>No accounts.</strong> You&apos;ll never need to sign up for anything here.
            </li>
            <li>
              <strong>Fast.</strong> Tools should load instantly and work on your phone too.
            </li>
          </ul>
          <h2>Got an idea?</h2>
          <p>
            If there&apos;s a tool you wish existed (or one of mine is broken), <Link href="/contact">tell me</Link>. The
            best ideas usually come from people who are annoyed at something.
          </p>
          <p>
            AJ Toolbox is part of{" "}
            <a href={site.author.url} target="_blank" rel="noopener">
              AJ Studios
            </a>
            .
          </p>
        </div>

        <aside className="h-fit rounded-3xl border border-line bg-surface/60 p-8 lg:sticky lg:top-28">
          <p className="eyebrow mb-6">By the numbers</p>
          <dl className="grid grid-cols-2 gap-6">
            <div>
              <dt className="text-sm text-muted">Live tools</dt>
              <dd className="font-display text-5xl font-extrabold text-accent">{live}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">In the workshop</dt>
              <dd className="font-display text-5xl font-extrabold">{total - live}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Sign-ups required</dt>
              <dd className="font-display text-5xl font-extrabold">0</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Price</dt>
              <dd className="font-display text-5xl font-extrabold">$0</dd>
            </div>
          </dl>
        </aside>
      </div>
    </>
  );
}
