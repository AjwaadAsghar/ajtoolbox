"use client";

import { useState } from "react";
import { services } from "@/data/work";

const BUDGETS = ["Under $1k", "$1k to $5k", "$5k to $15k", "$15k+", "Not sure yet"];

/** No backend: composes an email in the visitor's mail app. */
export function BriefForm({ email }: { email: string }) {
  const [picked, setPicked] = useState<string[]>([]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = [
      `Name: ${f.get("name")}`,
      `Company: ${f.get("company") || "-"}`,
      `Interested in: ${picked.join(", ") || "-"}`,
      `Budget: ${f.get("budget") || "-"}`,
      "",
      String(f.get("message") ?? ""),
    ].join("\n");
    const subject = `New project enquiry from ${f.get("name")}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  const field =
    "mt-2 w-full rounded-lg border border-line bg-ink px-4 py-3 text-fg placeholder:text-dim focus:border-fg/40 focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="space-y-7">
      <div className="grid gap-7 sm:grid-cols-2">
        <label className="block text-sm">
          Name
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="block text-sm">
          Company <span className="text-dim">(optional)</span>
          <input name="company" autoComplete="organization" className={field} />
        </label>
      </div>
      <fieldset>
        <legend className="text-sm">What do you need?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {services
            .filter((s) => s.id !== "products")
            .map((s) => {
              const on = picked.includes(s.title);
              return (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setPicked(on ? picked.filter((p) => p !== s.title) : [...picked, s.title])}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    on ? "border-accent bg-accent text-accent-ink" : "border-line text-muted hover:text-fg"
                  }`}
                >
                  {s.title}
                </button>
              );
            })}
        </div>
      </fieldset>
      <label className="block text-sm">
        Budget
        <select name="budget" defaultValue="" className={field}>
          <option value="" disabled>
            Select a range
          </option>
          {BUDGETS.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </label>
      <label className="block text-sm">
        About the project
        <textarea
          name="message"
          required
          rows={6}
          placeholder="What are you building, and what does success look like?"
          className={field}
        />
      </label>
      <button
        type="submit"
        className="inline-flex h-12 items-center rounded-full bg-accent px-7 font-medium text-accent-ink transition-opacity hover:opacity-90"
      >
        Send enquiry
      </button>
      <p className="text-xs text-dim">This opens your email app with the details filled in.</p>
    </form>
  );
}
