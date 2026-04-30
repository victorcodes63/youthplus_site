import { NextResponse } from "next/server";
import { buildWhereClause, readFilters, requireAdminToken, toCsv } from "@/lib/baselineSurveyAdmin";
import { getNeonPool } from "@/lib/neon";

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
    const filters = readFilters(searchParams);
    const { whereSql, values } = buildWhereClause(filters);
    const pool = getNeonPool();
    const { rows } = await pool.query<Record<string, unknown>>(
      `
      SELECT
        id,
        full_name,
        gender,
        age_group,
        county,
        business_name,
        sector,
        created_at
      FROM baseline_survey_submissions
      ${whereSql}
      ORDER BY created_at DESC
      `,
      values,
    );

    const csv = toCsv(rows, [
      "id",
      "full_name",
      "gender",
      "age_group",
      "county",
      "business_name",
      "sector",
      "created_at",
    ]);

    return new Response(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="baseline-survey-submissions.csv"',
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown database error.";
    return NextResponse.json({ error: "Failed to export survey responses.", details: message }, { status: 502 });
  }
}
