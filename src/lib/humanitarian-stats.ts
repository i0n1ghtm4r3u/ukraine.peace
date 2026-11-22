/**
 * Verified humanitarian statistics for Ukraine. Every figure below was read
 * from the named source document — never estimated. When updating a figure,
 * replace it only with a number the source itself states, and update the
 * publication date, reporting period and link in the same edit.
 */
export type HumanitarianStat = {
  id: string;
  value: string;
  label: string;
  /** What the figure counts and how it differs from the other categories. */
  note: string;
  source: string;
  published: string;
  period: string;
  url: string;
};

export const humanitarianStats: HumanitarianStat[] = [
  {
    id: "refugees-abroad",
    value: "6.8 million",
    label: "Refugees from Ukraine recorded abroad",
    note: "People who were forced to leave the country and are recorded under temporary protection or similar status in host countries. Counts people currently recorded, not every crossing since 2022.",
    source: "UNHCR Operational Data Portal — Ukraine Refugee Situation",
    published: "January 2025",
    period: "As of the end of December 2024",
    url: "https://data.unhcr.org/en/situations/ukraine",
  },
  {
    id: "idps-inside-ukraine",
    value: "3.86 million",
    label: "Internally displaced people inside Ukraine",
    note: "People who fled their homes but stayed within Ukraine, based on a nationwide representative survey. A different group from refugees — the two figures must never be added together.",
    source: "IOM Displacement Tracking Matrix — Ukraine Internal Displacement Report, Round 23",
    published: "March 2026",
    period: "Round 23 estimate, early 2026",
    url: "https://data.humdata.org/dataset/ukraine-idp-estimates",
  },
  {
    id: "people-in-need",
    value: "12.7 million",
    label: "People in need of humanitarian assistance in 2025",
    note: "People the UN and its partners assessed as needing humanitarian aid — because of destroyed homes, services and infrastructure. Measures need, not displacement: many are not displaced at all.",
    source: "OCHA — Ukraine Humanitarian Needs and Response Plan 2025",
    published: "January 2025",
    period: "Covers the year 2025",
    url: "https://reliefweb.int/report/ukraine/ukraine-summary-humanitarian-needs-and-response-plan-and-regional-refugee-response-plan-january-2025-enuk",
  },
];
