"use client";

import { FadeUp } from "@/components/motion/FadeUp";
import { useState, type FormEvent, type ReactNode } from "react";
import { BrandButton } from "@/components/ui/BrandButton";

const ageGroups = ["18-24", "25-30", "31-35", "36+"];
const counties = ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Uasin Gishu", "Other"];

type SubmissionState = "idle" | "submitting" | "success" | "error";

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.1em] text-accent font-[800]">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-[24px] md:text-[30px] leading-[1.03] tracking-[-0.03em] font-[900] text-[#0A0A0A]">
        {title}
      </h2>
      <p className="mt-3 text-[14px] md:text-[15px] leading-[1.7] text-secondary max-w-[70ch]">
        {description}
      </p>
    </div>
  );
}

function FieldLabel({
  children,
  required = false,
}: {
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-black/45">
      {children}
      {required ? " *" : ""}
    </label>
  );
}

export default function WeLeadBaselineSurveyPage() {
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [submissionMessage, setSubmissionMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmissionState("submitting");
    setSubmissionMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const readString = (field: string) => {
      const value = formData.get(field);
      return typeof value === "string" ? value.trim() : "";
    };

    const readOptionalString = (field: string) => {
      const value = readString(field);
      return value.length > 0 ? value : undefined;
    };

    const readStringArray = (field: string) =>
      formData
        .getAll(field)
        .filter((value): value is string => typeof value === "string")
        .map((value) => value.trim())
        .filter(Boolean);

    const payload = {
      fullName: readString("fullName"),
      gender: readString("gender"),
      ageGroup: readString("ageGroup"),
      county: readString("county"),
      educationLevel: readOptionalString("educationLevel"),
      businessName: readString("businessName"),
      sector: readString("sector"),
      yearsInOperation: readOptionalString("yearsInOperation"),
      employees: readString("employees") ? Number(readString("employees")) : undefined,
      businessStage: readOptionalString("businessStage"),
      costPressure: readStringArray("costPressure"),
      easeRating: readOptionalString("easeRating"),
      growthChallenge: readOptionalString("growthChallenge"),
      policyAwareness: readOptionalString("policyAwareness"),
      policySupports: readStringArray("policySupports"),
      policyChanges: readOptionalString("policyChanges"),
      governanceParticipation: readOptionalString("governanceParticipation"),
      youthSpaces: readStringArray("youthSpaces"),
      influenceRating: readOptionalString("influenceRating"),
      digitalTools: readStringArray("digitalTools"),
      digitalSkills: readOptionalString("digitalSkills"),
      digitalSupport: readOptionalString("digitalSupport"),
    };

    try {
      const response = await fetch("/api/baseline-survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Unable to submit survey. Please try again.");
      }

      form.reset();
      setSubmissionState("success");
      setSubmissionMessage("Survey submitted successfully. Thank you for sharing your responses.");
    } catch (error) {
      setSubmissionState("error");
      setSubmissionMessage(
        error instanceof Error ? error.message : "Unable to submit survey. Please try again.",
      );
    }
  }

  return (
    <section className="bg-white pt-20 pb-14 text-black sm:pt-24 sm:pb-16 md:pt-32 md:pb-24">
      <div className="page mx-auto max-w-[1200px]">
        <FadeUp>
          <div className="inline-flex items-center rounded-md border border-accent px-3 py-1 text-[11px] font-[800] uppercase tracking-[0.1em] text-[#0A0A0A]">
            We Lead Baseline Survey
          </div>
          <h1 className="mt-5 text-[34px] md:text-[52px] leading-[0.95] tracking-[-0.04em] font-[900] text-[#0A0A0A] max-w-[18ch]">
            Youth Enterprise and Leadership Baseline
          </h1>
          <p className="mt-4 text-[15px] md:text-[17px] text-secondary max-w-[70ch] leading-[1.7]">
            This presentational survey captures baseline perspectives from young
            entrepreneurs and ecosystem actors. Please complete all sections below.
          </p>
        </FadeUp>

        <FadeUp delayMs={60}>
          <form
            onSubmit={handleSubmit}
            className="mt-10 rounded-md border border-borderLight bg-white p-4 sm:p-6 md:p-8 shadow-[0_10px_35px_rgba(10,10,10,0.05)] space-y-10"
          >
            <section className="space-y-5 border-b border-borderLight pb-8">
              <SectionTitle
                eyebrow="Section 1"
                title="Profile"
                description="Tell us about yourself and your location."
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <FieldLabel required>Full name</FieldLabel>
                  <input
                    name="fullName"
                    required
                    className="w-full rounded-md border border-black/10 px-3 py-2.5 text-sm text-black focus:outline-none focus:border-[#0A0A0A]"
                  />
                </div>
                <div>
                  <FieldLabel required>Gender</FieldLabel>
                  <select
                    name="gender"
                    required
                    className="w-full rounded-md border border-black/10 bg-white px-3 py-2.5 text-sm text-black focus:outline-none focus:border-[#0A0A0A]"
                  >
                    <option value="">Select gender</option>
                    <option>Female</option>
                    <option>Male</option>
                    <option>Non-binary</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <FieldLabel required>Age group</FieldLabel>
                  <select
                    name="ageGroup"
                    required
                    className="w-full rounded-md border border-black/10 bg-white px-3 py-2.5 text-sm text-black focus:outline-none focus:border-[#0A0A0A]"
                  >
                    <option value="">Select age group</option>
                    {ageGroups.map((ageGroup) => (
                      <option key={ageGroup}>{ageGroup}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <FieldLabel required>County</FieldLabel>
                  <select
                    name="county"
                    required
                    className="w-full rounded-md border border-black/10 bg-white px-3 py-2.5 text-sm text-black focus:outline-none focus:border-[#0A0A0A]"
                  >
                    <option value="">Select county</option>
                    {counties.map((county) => (
                      <option key={county}>{county}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <FieldLabel>Highest education level</FieldLabel>
                <div className="flex flex-wrap gap-3 text-[14px] text-[#0A0A0A]">
                  {["Secondary", "TVET", "Diploma", "Undergraduate", "Postgraduate"].map(
                    (level) => (
                      <label key={level} className="inline-flex items-center gap-2">
                        <input type="radio" name="educationLevel" value={level} />
                        <span>{level}</span>
                      </label>
                    )
                  )}
                </div>
              </div>
            </section>

            <section className="space-y-5 border-b border-borderLight pb-8">
              <SectionTitle
                eyebrow="Section 2"
                title="Business Profile"
                description="Share key information about your enterprise."
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <FieldLabel required>Business name</FieldLabel>
                  <input
                    name="businessName"
                    required
                    className="w-full rounded-md border border-black/10 px-3 py-2.5 text-sm text-black focus:outline-none focus:border-[#0A0A0A]"
                  />
                </div>
                <div>
                  <FieldLabel required>Business sector</FieldLabel>
                  <select
                    name="sector"
                    required
                    className="w-full rounded-md border border-black/10 bg-white px-3 py-2.5 text-sm text-black focus:outline-none focus:border-[#0A0A0A]"
                  >
                    <option value="">Select sector</option>
                    <option>Agribusiness</option>
                    <option>Manufacturing</option>
                    <option>Creative Economy</option>
                    <option>Retail/Trade</option>
                    <option>Technology</option>
                    <option>Services</option>
                  </select>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <FieldLabel>Years in operation</FieldLabel>
                  <select
                    name="yearsInOperation"
                    className="w-full rounded-md border border-black/10 bg-white px-3 py-2.5 text-sm text-black focus:outline-none focus:border-[#0A0A0A]"
                  >
                    <option value="">Select duration</option>
                    <option>Less than 1 year</option>
                    <option>1-2 years</option>
                    <option>3-5 years</option>
                    <option>More than 5 years</option>
                  </select>
                </div>
                <div>
                  <FieldLabel>Number of employees</FieldLabel>
                  <input
                    type="number"
                    min="0"
                    name="employees"
                    className="w-full rounded-md border border-black/10 px-3 py-2.5 text-sm text-black focus:outline-none focus:border-[#0A0A0A]"
                  />
                </div>
              </div>
              <div>
                <FieldLabel>Current business stage</FieldLabel>
                <div className="flex flex-wrap gap-3 text-[14px] text-[#0A0A0A]">
                  {["Idea", "Startup", "Growth", "Established"].map((stage) => (
                    <label key={stage} className="inline-flex items-center gap-2">
                      <input type="radio" name="businessStage" value={stage} />
                      <span>{stage}</span>
                    </label>
                  ))}
                </div>
              </div>
            </section>

            <section className="space-y-5 border-b border-borderLight pb-8">
              <SectionTitle
                eyebrow="Section 3"
                title="Cost & Ease of Doing Business"
                description="Indicate where costs and operational barriers affect your business."
              />
              <div>
                <FieldLabel>Major cost pressure areas (select all that apply)</FieldLabel>
                <div className="grid gap-2 sm:grid-cols-2 text-[14px] text-[#0A0A0A]">
                  {[
                    "Licensing and permits",
                    "Taxes and levies",
                    "Transport and logistics",
                    "Rent and utilities",
                    "Access to finance",
                    "Raw materials",
                  ].map((item) => (
                    <label key={item} className="inline-flex items-center gap-2">
                      <input type="checkbox" name="costPressure" value={item} />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <FieldLabel>How easy is it to run your business in your county?</FieldLabel>
                <div className="flex flex-wrap gap-3 text-[14px] text-[#0A0A0A]">
                  {["Very difficult", "Difficult", "Neutral", "Easy", "Very easy"].map((rate) => (
                    <label key={rate} className="inline-flex items-center gap-2">
                      <input type="radio" name="easeRating" value={rate} />
                      <span>{rate}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <FieldLabel>Main challenge to business growth</FieldLabel>
                <textarea
                  rows={4}
                  name="growthChallenge"
                  className="w-full resize-none rounded-md border border-black/10 px-3 py-2.5 text-sm text-black focus:outline-none focus:border-[#0A0A0A]"
                />
              </div>
            </section>

            <section className="space-y-5 border-b border-borderLight pb-8">
              <SectionTitle
                eyebrow="Section 4"
                title="Policy & Legal Framework"
                description="Capture awareness of youth-focused policies and legal support structures."
              />
              <div>
                <FieldLabel>Are you aware of youth enterprise support policies?</FieldLabel>
                <div className="flex flex-wrap gap-3 text-[14px] text-[#0A0A0A]">
                  {["Yes", "No", "Not sure"].map((answer) => (
                    <label key={answer} className="inline-flex items-center gap-2">
                      <input type="radio" name="policyAwareness" value={answer} />
                      <span>{answer}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <FieldLabel>Which legal or policy supports have you used?</FieldLabel>
                <div className="grid gap-2 sm:grid-cols-2 text-[14px] text-[#0A0A0A]">
                  {[
                    "Youth Fund/Grant program",
                    "Business registration support",
                    "County procurement opportunities",
                    "Tax incentives",
                    "Mentorship/incubation policy support",
                  ].map((item) => (
                    <label key={item} className="inline-flex items-center gap-2">
                      <input type="checkbox" name="policySupports" value={item} />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <FieldLabel>What policy changes would most help your business?</FieldLabel>
                <textarea
                  rows={4}
                  name="policyChanges"
                  className="w-full resize-none rounded-md border border-black/10 px-3 py-2.5 text-sm text-black focus:outline-none focus:border-[#0A0A0A]"
                />
              </div>
            </section>

            <section className="space-y-5 border-b border-borderLight pb-8">
              <SectionTitle
                eyebrow="Section 5"
                title="Youth Participation & Governance"
                description="Understand levels of youth representation in local and national decision-making spaces."
              />
              <div>
                <FieldLabel>Have you participated in governance forums in the last 12 months?</FieldLabel>
                <div className="flex flex-wrap gap-3 text-[14px] text-[#0A0A0A]">
                  {["Yes", "No"].map((answer) => (
                    <label key={answer} className="inline-flex items-center gap-2">
                      <input type="radio" name="governanceParticipation" value={answer} />
                      <span>{answer}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <FieldLabel>Spaces where youth voices are represented (select all that apply)</FieldLabel>
                <div className="grid gap-2 sm:grid-cols-2 text-[14px] text-[#0A0A0A]">
                  {[
                    "County public participation forums",
                    "Ward youth committees",
                    "National youth consultations",
                    "Private sector roundtables",
                    "Civil society forums",
                  ].map((item) => (
                    <label key={item} className="inline-flex items-center gap-2">
                      <input type="checkbox" name="youthSpaces" value={item} />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <FieldLabel>How would you rate youth influence in policy decisions?</FieldLabel>
                <select
                  name="influenceRating"
                  className="w-full rounded-md border border-black/10 bg-white px-3 py-2.5 text-sm text-black focus:outline-none focus:border-[#0A0A0A]"
                >
                  <option value="">Select rating</option>
                  <option>Very low</option>
                  <option>Low</option>
                  <option>Moderate</option>
                  <option>High</option>
                  <option>Very high</option>
                </select>
              </div>
            </section>

            <section className="space-y-5">
              <SectionTitle
                eyebrow="Section 6"
                title="Digitalization & Technology"
                description="Assess technology readiness and digital tools used by youth enterprises."
              />
              <div>
                <FieldLabel>Which digital tools do you currently use? (select all that apply)</FieldLabel>
                <div className="grid gap-2 sm:grid-cols-2 text-[14px] text-[#0A0A0A]">
                  {[
                    "Social media marketing",
                    "Digital payments",
                    "E-commerce platform",
                    "Accounting software",
                    "CRM/customer database",
                    "Cloud collaboration tools",
                  ].map((item) => (
                    <label key={item} className="inline-flex items-center gap-2">
                      <input type="checkbox" name="digitalTools" value={item} />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <FieldLabel>Current digital skills level</FieldLabel>
                <div className="flex flex-wrap gap-3 text-[14px] text-[#0A0A0A]">
                  {["Beginner", "Intermediate", "Advanced"].map((level) => (
                    <label key={level} className="inline-flex items-center gap-2">
                      <input type="radio" name="digitalSkills" value={level} />
                      <span>{level}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <FieldLabel>Priority digital support needed</FieldLabel>
                <textarea
                  rows={4}
                  name="digitalSupport"
                  placeholder="e.g., digital marketing training, e-commerce onboarding, cybersecurity awareness"
                  className="w-full resize-none rounded-md border border-black/10 px-3 py-2.5 text-sm text-black focus:outline-none focus:border-[#0A0A0A]"
                />
              </div>
            </section>

            <div className="border-t border-borderLight pt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[12px] leading-relaxed text-black/45 max-w-[60ch]">
                Survey responses are securely submitted for baseline data collection and review.
              </p>
              <BrandButton
                type="submit"
                disabled={submissionState === "submitting"}
                variant="gold"
                fullWidth
                className="sm:w-auto disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submissionState === "submitting" ? "Submitting..." : "Submit Baseline Survey"}
              </BrandButton>
            </div>
            {submissionMessage ? (
              <p
                className={`text-sm ${
                  submissionState === "success" ? "text-green-700" : "text-red-700"
                }`}
              >
                {submissionMessage}
              </p>
            ) : null}
          </form>
        </FadeUp>
      </div>
    </section>
  );
}
