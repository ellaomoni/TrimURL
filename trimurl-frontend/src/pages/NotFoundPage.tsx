import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-slate-900">Page not found</h1>
        <p className="mt-2 text-sm text-slate-500">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/login"
          className="mt-6 inline-block rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white"
        >
          Go to login
        </Link>
      </div>
    </div>
  );
}