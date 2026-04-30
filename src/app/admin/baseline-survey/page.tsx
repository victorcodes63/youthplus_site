"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type SubmissionRow = {
  id: string;
  full_name: string;
  gender: string;
  age_group: string;
  county: string;
  business_name: string;
  sector: string;
  payload: Record<string, unknown>;
  created_at: string;
};

type SurveyApiResponse = {
  submissions: SubmissionRow[];
  total: number;
  page: number;
  pageSize: number;
  counties: string[];
  sectors: string[];
  error?: string;
};

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

const TOKEN_STORAGE_KEY = "baseline-admin-token";

function buildQueryString(params: {
  search: string;
  county: string;
  sector: string;
  from: string;
  to: string;
  page: number;
  pageSize: number;
}) {
  const searchParams = new URLSearchParams();
  if (params.search.trim()) searchParams.set("search", params.search.trim());
  if (params.county.trim()) searchParams.set("county", params.county.trim());
  if (params.sector.trim()) searchParams.set("sector", params.sector.trim());
  if (params.from.trim()) searchParams.set("from", params.from.trim());
  if (params.to.trim()) searchParams.set("to", params.to.trim());
  searchParams.set("page", String(params.page));
  searchParams.set("pageSize", String(params.pageSize));
  return searchParams.toString();
}

export default function BaselineSurveyAdminPage() {
  const [tokenInput, setTokenInput] = useState(() => {
    if (typeof window === "undefined") return "";
    return window.localStorage.getItem(TOKEN_STORAGE_KEY) ?? "";
  });
  const [token, setToken] = useState(() => {
    if (typeof window === "undefined") return "";
    return window.localStorage.getItem(TOKEN_STORAGE_KEY) ?? "";
  });

  const [searchInput, setSearchInput] = useState("");
  const [countyInput, setCountyInput] = useState("");
  const [sectorInput, setSectorInput] = useState("");
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");
  const [pageSizeInput, setPageSizeInput] = useState(20);

  const [search, setSearch] = useState("");
  const [county, setCounty] = useState("");
  const [sector, setSector] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const [submissions, setSubmissions] = useState<SubmissionRow[]>([]);
  const [total, setTotal] = useState(0);
  const [counties, setCounties] = useState<string[]>([]);
  const [sectors, setSectors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / pageSize)), [pageSize, total]);
  const tableQuery = useMemo(
    () =>
      buildQueryString({
        search,
        county,
        sector,
        from,
        to,
        page,
        pageSize,
      }),
    [search, county, sector, from, to, page, pageSize],
  );

  useEffect(() => {
    if (!token) return;

    let isCancelled = false;

    const fetchSubmissions = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/baseline-survey?${tableQuery}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = (await response.json()) as SurveyApiResponse;
        if (!response.ok) {
          throw new Error(data.error || "Failed to load submissions.");
        }
        if (isCancelled) return;
        setSubmissions(data.submissions ?? []);
        setTotal(data.total ?? 0);
        setCounties(data.counties ?? []);
        setSectors(data.sectors ?? []);
      } catch (err) {
        if (isCancelled) return;
        const message = err instanceof Error ? err.message : "Failed to load submissions.";
        setError(message);
        setSubmissions([]);
        setTotal(0);
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchSubmissions();
    return () => {
      isCancelled = true;
    };
  }, [tableQuery, token]);

  function applyToken(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = tokenInput.trim();
    window.localStorage.setItem(TOKEN_STORAGE_KEY, trimmed);
    setToken(trimmed);
    setPage(1);
  }

  function applyFilters(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearch(searchInput);
    setCounty(countyInput);
    setSector(sectorInput);
    setFrom(fromInput);
    setTo(toInput);
    setPageSize(pageSizeInput);
    setPage(1);
  }

  function clearFilters() {
    setSearchInput("");
    setCountyInput("");
    setSectorInput("");
    setFromInput("");
    setToInput("");
    setPageSizeInput(20);
    setSearch("");
    setCounty("");
    setSector("");
    setFrom("");
    setTo("");
    setPageSize(20);
    setPage(1);
  }

  async function exportCsv() {
    if (!token) {
      setError("Provide an admin token before exporting.");
      return;
    }

    setExporting(true);
    setError(null);
    try {
      const query = buildQueryString({
        search,
        county,
        sector,
        from,
        to,
        page: 1,
        pageSize,
      });
      const response = await fetch(`/api/baseline-survey/export?${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Failed to export CSV.");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "baseline-survey-submissions.csv";
      anchor.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to export CSV.";
      setError(message);
    } finally {
      setExporting(false);
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:px-8">
      <h1 className="text-3xl font-black tracking-tight text-[#0A0A0A]">Baseline Survey Submissions</h1>
      <p className="mt-2 text-sm text-black/60">Token-protected CMS view with search, filters, pagination, and CSV export.</p>

      <form onSubmit={applyToken} className="mt-6 rounded-lg border border-black/10 bg-white p-4">
        <label className="block text-sm font-semibold text-black">Admin token</label>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <input
            type="password"
            value={tokenInput}
            onChange={(event) => setTokenInput(event.target.value)}
            placeholder="Paste BASELINE_ADMIN_TOKEN"
            className="w-full rounded-md border border-black/15 px-3 py-2 text-sm outline-none ring-offset-2 focus:border-black/30 focus:ring-2 focus:ring-black/10"
          />
          <button
            type="submit"
            className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-black/85"
          >
            Save token
          </button>
        </div>
      </form>

      <form onSubmit={applyFilters} className="mt-4 rounded-lg border border-black/10 bg-white p-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          <input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search name, business, county, sector"
            className="rounded-md border border-black/15 px-3 py-2 text-sm outline-none ring-offset-2 focus:border-black/30 focus:ring-2 focus:ring-black/10"
          />
          <select
            value={countyInput}
            onChange={(event) => setCountyInput(event.target.value)}
            className="rounded-md border border-black/15 px-3 py-2 text-sm outline-none ring-offset-2 focus:border-black/30 focus:ring-2 focus:ring-black/10"
          >
            <option value="">All counties</option>
            {counties.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            value={sectorInput}
            onChange={(event) => setSectorInput(event.target.value)}
            className="rounded-md border border-black/15 px-3 py-2 text-sm outline-none ring-offset-2 focus:border-black/30 focus:ring-2 focus:ring-black/10"
          >
            <option value="">All sectors</option>
            {sectors.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={fromInput}
            onChange={(event) => setFromInput(event.target.value)}
            className="rounded-md border border-black/15 px-3 py-2 text-sm outline-none ring-offset-2 focus:border-black/30 focus:ring-2 focus:ring-black/10"
          />
          <input
            type="date"
            value={toInput}
            onChange={(event) => setToInput(event.target.value)}
            className="rounded-md border border-black/15 px-3 py-2 text-sm outline-none ring-offset-2 focus:border-black/30 focus:ring-2 focus:ring-black/10"
          />
          <select
            value={pageSizeInput}
            onChange={(event) => setPageSizeInput(Number(event.target.value))}
            className="rounded-md border border-black/15 px-3 py-2 text-sm outline-none ring-offset-2 focus:border-black/30 focus:ring-2 focus:ring-black/10"
          >
            {[10, 20, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size} per page
              </option>
            ))}
          </select>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="submit" className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-black/85">
            Apply filters
          </button>
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-md border border-black/20 px-4 py-2 text-sm font-semibold text-black hover:bg-black/[0.03]"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={exportCsv}
            disabled={exporting || !token}
            className="rounded-md border border-black/20 px-4 py-2 text-sm font-semibold text-black hover:bg-black/[0.03] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {exporting ? "Exporting..." : "Export CSV"}
          </button>
        </div>
      </form>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm text-black/70">
        <p>
          {loading ? "Loading submissions..." : `Showing ${submissions.length} of ${total} total`}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={loading || page <= 1}
            className="rounded-md border border-black/20 px-3 py-1.5 font-semibold text-black hover:bg-black/[0.03] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((current) => (current < totalPages ? current + 1 : current))}
            disabled={loading || page >= totalPages}
            className="rounded-md border border-black/20 px-3 py-1.5 font-semibold text-black hover:bg-black/[0.03] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {error ? (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      ) : null}

      <div className="mt-4 overflow-x-auto rounded-lg border border-black/10">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-black/[0.03]">
            <tr>
              <th className="px-4 py-3 font-semibold">Submitted</th>
              <th className="px-4 py-3 font-semibold">Full Name</th>
              <th className="px-4 py-3 font-semibold">Business</th>
              <th className="px-4 py-3 font-semibold">County</th>
              <th className="px-4 py-3 font-semibold">Sector</th>
              <th className="px-4 py-3 font-semibold">Details</th>
            </tr>
          </thead>
          <tbody>
            {!loading && submissions.length === 0 ? (
              <tr className="border-t border-black/10">
                <td colSpan={6} className="px-4 py-8 text-center text-black/60">
                  {token ? "No submissions found for the selected filters." : "Enter and save admin token to load submissions."}
                </td>
              </tr>
            ) : (
              submissions.map((submission) => (
                <tr key={submission.id} className="border-t border-black/10 align-top">
                  <td className="px-4 py-3 whitespace-nowrap">{formatDate(submission.created_at)}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{submission.full_name}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{submission.business_name}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{submission.county}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{submission.sector}</td>
                  <td className="px-4 py-3">
                    <details>
                      <summary className="cursor-pointer font-medium text-blue-700">View payload</summary>
                      <pre className="mt-2 max-h-72 overflow-auto rounded-md bg-black/[0.03] p-3 text-xs leading-relaxed">
                        {JSON.stringify(submission.payload, null, 2)}
                      </pre>
                    </details>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
