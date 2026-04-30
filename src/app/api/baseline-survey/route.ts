import { NextResponse } from "next/server";
import { getNeonPool } from "@/lib/neon";
import { buildWhereClause, readFilters, requireAdminToken } from "@/lib/baselineSurveyAdmin";

type BaselineSurveyPayload = {
  fullName: string;
  gender: string;
  ageGroup: string;
  county: string;
  educationLevel?: string;
  businessName: string;
  sector: string;
  yearsInOperation?: string;
  employees?: number;
  businessStage?: string;
  costPressure: string[];
  easeRating?: string;
  growthChallenge?: string;
  policyAwareness?: string;
  policySupports: string[];
  policyChanges?: string;
  governanceParticipation?: string;
  youthSpaces: string[];
  influenceRating?: string;
  digitalTools: string[];
  digitalSkills?: string;
  digitalSupport?: string;
};

function readOptionalString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

function normalizeArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parsePayload(body: unknown): BaselineSurveyPayload | null {
  if (!body || typeof body !== "object") return null;

  const payload = body as Record<string, unknown>;
  const fullName = readOptionalString(payload.fullName);
  const gender = readOptionalString(payload.gender);
  const ageGroup = readOptionalString(payload.ageGroup);
  const county = readOptionalString(payload.county);
  const businessName = readOptionalString(payload.businessName);
  const sector = readOptionalString(payload.sector);

  if (!fullName || !gender || !ageGroup || !county || !businessName || !sector) {
    return null;
  }

  let employees: number | undefined;
  if (typeof payload.employees === "number" && Number.isFinite(payload.employees) && payload.employees >= 0) {
    employees = payload.employees;
  }

  return {
    fullName,
    gender,
    ageGroup,
    county,
    educationLevel: readOptionalString(payload.educationLevel),
    businessName,
    sector,
    yearsInOperation: readOptionalString(payload.yearsInOperation),
    employees,
    businessStage: readOptionalString(payload.businessStage),
    costPressure: normalizeArray(payload.costPressure),
    easeRating: readOptionalString(payload.easeRating),
    growthChallenge: readOptionalString(payload.growthChallenge),
    policyAwareness: readOptionalString(payload.policyAwareness),
    policySupports: normalizeArray(payload.policySupports),
    policyChanges: readOptionalString(payload.policyChanges),
    governanceParticipation: readOptionalString(payload.governanceParticipation),
    youthSpaces: normalizeArray(payload.youthSpaces),
    influenceRating: readOptionalString(payload.influenceRating),
    digitalTools: normalizeArray(payload.digitalTools),
    digitalSkills: readOptionalString(payload.digitalSkills),
    digitalSupport: readOptionalString(payload.digitalSupport),
  };
}

export async function GET(request: Request) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "Submission backend is not configured. Add DATABASE_URL." }, { status: 500 });
  }

  const authError = requireAdminToken(request);
  if (authError) {
    return NextResponse.json({ error: authError }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const requestedPage = Number(searchParams.get("page") ?? "1");
    const requestedPageSize = Number(searchParams.get("pageSize") ?? "20");
    const page = Number.isFinite(requestedPage) ? Math.max(Math.trunc(requestedPage), 1) : 1;
    const pageSize = Number.isFinite(requestedPageSize)
      ? Math.min(Math.max(Math.trunc(requestedPageSize), 1), 100)
      : 20;
    const offset = (page - 1) * pageSize;
    const filters = readFilters(searchParams);
    const { whereSql, values } = buildWhereClause(filters);

    const pool = getNeonPool();
    const { rows } = await pool.query(
      `
      SELECT
        id,
        full_name,
        gender,
        age_group,
        county,
        business_name,
        sector,
        payload,
        created_at
      FROM baseline_survey_submissions
      ${whereSql}
      ORDER BY created_at DESC
      LIMIT $${values.length + 1}
      OFFSET $${values.length + 2}
      `,
      [...values, pageSize, offset],
    );

    const countResult = await pool.query<{ count: string }>(
      `
      SELECT COUNT(*)::text AS count
      FROM baseline_survey_submissions
      ${whereSql}
      `,
      values,
    );

    const countyResult = await pool.query<{ county: string }>(
      `
      SELECT DISTINCT county
      FROM baseline_survey_submissions
      WHERE county IS NOT NULL AND county <> ''
      ORDER BY county ASC
      `,
    );

    const sectorResult = await pool.query<{ sector: string }>(
      `
      SELECT DISTINCT sector
      FROM baseline_survey_submissions
      WHERE sector IS NOT NULL AND sector <> ''
      ORDER BY sector ASC
      `,
    );

    return NextResponse.json({
      submissions: rows,
      total: Number(countResult.rows[0]?.count ?? 0),
      page,
      pageSize,
      counties: countyResult.rows.map((row: { county: string }) => row.county),
      sectors: sectorResult.rows.map((row: { sector: string }) => row.sector),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown database error.";
    return NextResponse.json({ error: "Failed to fetch survey responses.", details: message }, { status: 502 });
  }
}

export async function POST(request: Request) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "Submission backend is not configured. Add DATABASE_URL." }, { status: 500 });
  }

  const body = await request.json().catch(() => null);
  const payload = parsePayload(body);

  if (!payload) {
    return NextResponse.json({ error: "Invalid submission payload." }, { status: 400 });
  }

  try {
    const pool = getNeonPool();
    await pool.query(
      `
      INSERT INTO baseline_survey_submissions (
        full_name,
        gender,
        age_group,
        county,
        business_name,
        sector,
        payload
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb)
      `,
      [
        payload.fullName,
        payload.gender,
        payload.ageGroup,
        payload.county,
        payload.businessName,
        payload.sector,
        JSON.stringify(payload),
      ],
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown database error.";
    return NextResponse.json({ error: "Failed to save survey response.", details: message }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
