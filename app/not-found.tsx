import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <span className="eyebrow">JPTECH / 404</span>
      <h1>This page drifted off-grid.</h1>
      <p>Let&apos;s get you back to the good stuff.</p>
      <Link className="button button--primary" href="/">
        Back home ↗
      </Link>
    </main>
  );
}
