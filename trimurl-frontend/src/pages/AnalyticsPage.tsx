import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DashboardLayout from "../layouts/dashboardLayout";
import { getAnalytics } from "../api/analyticsApi";

type AnalyticsData = {
  summary: {
    totalClicks: number;
  };
  link: {
    longUrl: string;
    shortUrl: string;
    shortCode: string;
    createdAt: string;
  };
  recentClicks: {
    id: string;
    ipAddress?: string | null;
    userAgent?: string | null;
    referrer?: string | null;
    clickedAt: string;
  }[];
  clicksOverTime: {
    date: string;
    count: number;
  }[];
};

export default function AnalyticsPage() {
  const { linkId } = useParams();

  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!linkId) return;

      try {
        const response = await getAnalytics(linkId);
        setAnalytics(response.data);
      } catch {
        setMessage("Unable to fetch analytics.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [linkId]);

  return (
    <DashboardLayout>
      <Link
        to="/dashboard"
        className="mb-6 inline-block text-sm font-semibold text-slate-600 hover:text-slate-950"
      >
        ← Back to dashboard
      </Link>

      {isLoading ? (
        <p className="text-sm text-slate-500">Loading analytics...</p>
      ) : message ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {message}
        </p>
      ) : analytics ? (
        <div className="space-y-6">
          <section>
            <h2 className="text-3xl font-bold tracking-tight text-slate-950">
              Link analytics
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              See how your short link is performing.
            </p>
          </section>

          <section className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Total clicks
              </p>
              <p className="mt-3 text-4xl font-bold text-slate-950">
                {analytics.summary.totalClicks}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
              <p className="text-sm font-medium text-slate-500">Short URL</p>
              <a
                href={analytics.link.shortUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 block break-all text-sm font-semibold text-slate-950"
              >
                {analytics.link.shortUrl}
              </a>

              <p className="mt-4 text-sm font-medium text-slate-500">
                Destination
              </p>
              <p className="mt-2 break-all text-sm text-slate-700">
                {analytics.link.longUrl}
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-4">
              <h3 className="text-lg font-semibold text-slate-950">
                Clicks over time
              </h3>
            </div>

            {analytics.clicksOverTime.length === 0 ? (
              <p className="p-6 text-sm text-slate-500">
                No click trend data yet.
              </p>
            ) : (
              <div className="divide-y divide-slate-200">
                {analytics.clicksOverTime.map((item) => (
                  <div
                    key={item.date}
                    className="flex items-center justify-between px-6 py-4"
                  >
                    <p className="text-sm text-slate-700">{item.date}</p>
                    <p className="text-sm font-semibold text-slate-950">
                      {item.count} clicks
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-4">
              <h3 className="text-lg font-semibold text-slate-950">
                Recent clicks
              </h3>
            </div>

            {analytics.recentClicks.length === 0 ? (
              <p className="p-6 text-sm text-slate-500">
                No clicks recorded yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                    <tr>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">IP</th>
                      <th className="px-6 py-3">Referrer</th>
                      <th className="px-6 py-3">User agent</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200">
                    {analytics.recentClicks.map((click) => (
                      <tr key={click.id}>
                        <td className="px-6 py-4 text-slate-700">
                          {new Date(click.clickedAt).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-slate-700">
                          {click.ipAddress || "Unknown"}
                        </td>
                        <td className="px-6 py-4 text-slate-700">
                          {click.referrer || "Direct"}
                        </td>
                        <td className="max-w-xs truncate px-6 py-4 text-slate-700">
                          {click.userAgent || "Unknown"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      ) : null}
    </DashboardLayout>
  );
}