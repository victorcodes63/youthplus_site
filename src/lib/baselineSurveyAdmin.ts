type QueryValue = string | number | Date;

export type BaselineSurveyFilters = {
  search?: string;
  county?: string;
  sector?: string;
  from?: string;
  to?: string;
};

export type SqlWhere = {
  whereSql: string;
  values: QueryValue[];
};

function optionalText(value: string | null): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function parseDate(value?: string): Date | null {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function parseEndDate(value?: string): Date | null {
  if (!value) return null;
  if (value.includes("T")) return parseDate(value);
  const parsed = parseDate(`${value}T23:59:59.999Z`);
  return parsed;
}

export function requireAdminToken(request: Request): string | null {
  const expectedToken = process.env.BASELINE_ADMIN_TOKEN;
  if (!expectedToken) {
    return "BASELINE_ADMIN_TOKEN is not configured.";
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return "Missing or invalid Authorization header.";
  }

  const provided = authHeader.slice("Bearer ".length).trim();
  if (!provided || provided !== expectedToken) {
    return "Invalid admin token.";
  }

  return null;
}

export function readFilters(searchParams: URLSearchParams): BaselineSurveyFilters {
  return {
    search: optionalText(searchParams.get("search")),
    county: optionalText(searchParams.get("county")),
    sector: optionalText(searchParams.get("sector")),
    from: optionalText(searchParams.get("from")),
    to: optionalText(searchParams.get("to")),
  };
}

export function buildWhereClause(filters: BaselineSurveyFilters): SqlWhere {
  const conditions: string[] = [];
  const values: QueryValue[] = [];

  if (filters.search) {
    values.push(`%${filters.search}%`);
    const index = values.length;
    conditions.push(
      `(full_name ILIKE $${index} OR business_name ILIKE $${index} OR county ILIKE $${index} OR sector ILIKE $${index})`,
    );
  }

  if (filters.county) {
    values.push(filters.county);
    conditions.push(`county = $${values.length}`);
  }

  if (filters.sector) {
    values.push(filters.sector);
    conditions.push(`sector = $${values.length}`);
  }

  const fromDate = parseDate(filters.from);
  if (fromDate) {
    values.push(fromDate);
    conditions.push(`created_at >= $${values.length}`);
  }

  const toDate = parseEndDate(filters.to);
  if (toDate) {
    values.push(toDate);
    conditions.push(`created_at <= $${values.length}`);
  }

  if (conditions.length === 0) {
    return { whereSql: "", values };
  }

  return {
    whereSql: `WHERE ${conditions.join(" AND ")}`,
    values,
  };
}

function csvEscape(value: unknown): string {
  if (value === null || value === undefined) return "";
  const text = String(value);
  if (text.includes('"') || text.includes(",") || text.includes("\n")) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

export function toCsv(rows: Array<Record<string, unknown>>, columns: string[]): string {
  const header = columns.map(csvEscape).join(",");
  const lines = rows.map((row) => columns.map((column) => csvEscape(row[column])).join(","));
  return [header, ...lines].join("\n");
}
