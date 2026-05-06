import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <header className="border-b border-slate-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <h1 className="text-xl font-bold">TrimUrl</h1>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-medium text-slate-700 hover:text-slate-950"
            >
              Log in
            </Link>

            <Link
              to="/register"
              className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
            URL Shortener + Analytics
          </p>

          <h2 className="text-5xl font-bold tracking-tight text-slate-950">
            Short links. Clear insights.
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Create clean short links, share them anywhere, and track every click
            from one simple dashboard.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/register"
              className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Create free account
            </Link>

            <Link
              to="/login"
              className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Log in
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-950">
                  trimurl.app/r/launch
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  https://example.com/product-launch
                </p>
              </div>

              <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
                Live
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs text-slate-500">Total clicks</p>
                <p className="mt-2 text-2xl font-bold">1,284</p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs text-slate-500">Today</p>
                <p className="mt-2 text-2xl font-bold">87</p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs text-slate-500">Links</p>
                <p className="mt-2 text-2xl font-bold">24</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-6 pb-20 md:grid-cols-3">
        {[
          ["Shorten URLs", "Create simple, clean links in seconds."],
          ["Track clicks", "See how many people open each link."],
          ["Manage links", "View, copy, delete, and monitor your links."],
        ].map(([title, text]) => (
          <div
            key={title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h3 className="font-semibold text-slate-950">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
          </div>
        ))}
      </section>
    </main>
  );
}