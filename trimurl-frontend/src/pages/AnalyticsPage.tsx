import { Link } from "react-router-dom";

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/dashboard"
          className="mb-6 inline-block text-sm font-medium text-slate-700 hover:text-slate-900"
        >
          ← Back to dashboard
        </Link>

        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <h1 className="text-xl font-semibold text-slate-900">
            Analytics page
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Next, we’ll connect this page to your analytics endpoint.
          </p>
        </div>
      </div>
    </div>
  );
}