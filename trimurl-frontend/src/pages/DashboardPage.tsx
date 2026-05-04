import { type FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../layouts/dashboardLayout";
import { createLink, deleteLink, getLinks } from "../api/linksApi";

type ShortLink = {
  id: string;
  longUrl: string;
  shortCode: string;
  shortUrl: string;
  customAlias?: string | null;
  expiresAt?: string | null;
  createdAt: string;
};

export default function DashboardPage() {
  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [links, setLinks] = useState<ShortLink[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState("");

  const fetchLinks = async () => {
    try {
      const response = await getLinks(1, 10);
      setLinks(response.data.items || []);
    } catch {
      setMessage("Unable to fetch links.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleCreateLink = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");
    setIsCreating(true);

    try {
      await createLink({
        longUrl,
        customAlias: customAlias || undefined,
      });

      setLongUrl("");
      setCustomAlias("");
      setMessage("Short link created successfully.");
      fetchLinks();
    } catch (error: any) {
      setMessage(error?.response?.data?.message || "Unable to create link.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleCopy = async (shortUrl: string) => {
    await navigator.clipboard.writeText(shortUrl);
    setMessage("Short link copied.");
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Delete this link?");
    if (!confirmed) return;

    try {
      await deleteLink(id);
      setLinks((prev) => prev.filter((link) => link.id !== id));
      setMessage("Link deleted successfully.");
    } catch {
      setMessage("Unable to delete link.");
    }
  };

  return (
    <DashboardLayout>
      <section className="mb-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">
            Your links
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            Create short links, share them anywhere, and track how they perform.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-600">Total links</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">
            {links.length}
          </p>
        </div>
      </section>

      <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-950">
          Create a short link
        </h3>

        <form onSubmit={handleCreateLink} className="mt-5 grid gap-4 lg:grid-cols-[1fr_220px_auto]">
          <input
            type="url"
            required
            placeholder="Paste long URL here"
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
          />

          <input
            type="text"
            placeholder="Custom alias optional"
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
            value={customAlias}
            onChange={(e) => setCustomAlias(e.target.value)}
          />

          <button
            type="submit"
            disabled={isCreating}
            className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
          >
            {isCreating ? "Creating..." : "Create"}
          </button>
        </form>

        {message && (
          <p className="mt-4 rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
            {message}
          </p>
        )}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4">
          <h3 className="text-lg font-semibold text-slate-950">Recent links</h3>
        </div>

        {isLoading ? (
          <p className="p-6 text-sm text-slate-500">Loading links...</p>
        ) : links.length === 0 ? (
          <div className="p-10 text-center">
            <h4 className="text-base font-semibold text-slate-900">
              No links yet
            </h4>
            <p className="mt-2 text-sm text-slate-500">
              Create your first short link above.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {links.map((link) => (
              <div
                key={link.id}
                className="grid gap-4 px-6 py-5 lg:grid-cols-[1fr_auto]"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-950">
                    {link.longUrl}
                  </p>

                  <a
                    href={link.shortUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 block text-sm font-medium text-slate-600 hover:text-slate-950"
                  >
                    {link.shortUrl}
                  </a>

                  <p className="mt-2 text-xs text-slate-400">
                    Created {new Date(link.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleCopy(link.shortUrl)}
                    className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                  >
                    Copy
                  </button>

                  <Link
                    to={`/analytics/${link.id}`}
                    className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                  >
                    Analytics
                  </Link>

                  <button
                    onClick={() => handleDelete(link.id)}
                    className="rounded-xl border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </DashboardLayout>
  );
}