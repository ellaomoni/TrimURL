import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <section className="max-w-md text-center">
        <p className="text-sm font-semibold text-slate-500">404</p>
        <h1 className="mt-3 text-3xl font-bold text-slate-950">
          Page not found
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          The page you are looking for does not exist or has been moved.
        </p>

        <Link
          to="/dashboard"
          className="mt-6 inline-flex rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Go to dashboard
        </Link>
      </section>
    </main>
  );
}