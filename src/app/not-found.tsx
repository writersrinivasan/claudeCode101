import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container" style={{ padding: "80px 16px", textAlign: "center" }}>
      <h1 className="page-title">404 — not found</h1>
      <p className="page-lead" style={{ margin: "0 auto 24px" }}>
        That page doesn’t exist. Even agents get lost sometimes.
      </p>
      <Link className="btn primary" href="/">
        Back to home
      </Link>
    </main>
  );
}
